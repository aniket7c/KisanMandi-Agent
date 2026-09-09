import os
import time
import requests
DEFAULT_TRANSPORT_RATE = float(
    os.getenv("TRANSPORT_RATE_PER_KM_PER_QUINTAL", "2.0")
)

NOMINATIM_URL = "https://nominatim.openstreetmap.org/search"
OSRM_URL = "https://router.project-osrm.org/route/v1/driving"

USER_AGENT = os.getenv(
    "GEOCODING_USER_AGENT",
    "KisanMandi-Agent/1.0"
)

_geocode_cache: dict[str, tuple[float, float]] = {}

_last_geocode_time = 0.0


def calculate_transport_cost(
    distance_km: float,
    quantity_quintals: float,
    rate_per_km_per_quintal: float = DEFAULT_TRANSPORT_RATE,
) -> float:
    """
    Calculate estimated transportation cost.

    Cost:
        distance × quantity × transport rate

    The transport rate can be supplied dynamically.
    If no rate is supplied, DEFAULT_TRANSPORT_RATE is used.
    """

    if distance_km < 0:
        raise ValueError("Distance cannot be negative")

    if quantity_quintals <= 0:
        raise ValueError("Quantity must be greater than zero")

    if rate_per_km_per_quintal < 0:
        raise ValueError("Transport rate cannot be negative")

    return (
        distance_km
        * quantity_quintals
        * rate_per_km_per_quintal
    )


def _respect_nominatim_rate_limit() -> None:
    """
    Ensure we make no more than one Nominatim request per second.
    """

    global _last_geocode_time

    elapsed = time.monotonic() - _last_geocode_time

    if elapsed < 1.0:
        time.sleep(1.0 - elapsed)

    _last_geocode_time = time.monotonic()


def _geocode_query(query: str) -> tuple[float, float] | None:
    """
    Execute one Nominatim search query.

    Returns None when the location cannot be found.
    """

    _respect_nominatim_rate_limit()

    headers = {
        "User-Agent": USER_AGENT,
        "Accept-Language": "en",
    }

    params = {
        "q": query,
        "format": "jsonv2",
        "limit": 1,
    }

    try:
        response = requests.get(
            NOMINATIM_URL,
            params=params,
            headers=headers,
            timeout=(10, 20),
        )
        response.raise_for_status()
    except requests.RequestException as exc:
        raise RuntimeError(
            f"Geocoding request failed for '{query}': {exc}"
        ) from exc

    try:
        results = response.json()
    except ValueError as exc:
        raise RuntimeError(
            "Nominatim returned invalid JSON"
        ) from exc

    if not results:
        return None

    return (
        float(results[0]["lat"]),
        float(results[0]["lon"]),
    )


def geocode_location(
    location: str,
    fallback_locations: list[str] | None = None,
) -> tuple[float, float]:
    """
    Convert a human-readable location into coordinates.

    The primary location is tried first. If it cannot be found,
    fallback locations are tried in order.

    Coordinates are cached during the application run.
    """

    if not location.strip():
        raise ValueError("Location cannot be empty")

    queries = [location.strip()]

    if fallback_locations:
        queries.extend(
            fallback.strip()
            for fallback in fallback_locations
            if fallback.strip()
        )
    queries = list(dict.fromkeys(queries))

    cache_key = queries[0]

    if cache_key in _geocode_cache:
        return _geocode_cache[cache_key]

    for query in queries:
        coordinates = _geocode_query(query)

        if coordinates is not None:
            _geocode_cache[cache_key] = coordinates
            return coordinates

    raise ValueError(
        "Could not find location. Tried: "
        + " | ".join(queries)
    )


def estimate_distance(
    farmer_state: str,
    farmer_district: str,
    mandi_market: str,
    mandi_district: str,
) -> float:
    """
    Calculate road distance between farmer's district and mandi.

    The farmer location is geocoded from state + district.

    The mandi is first searched using its exact market name.
    If that fails, progressively broader locations are tried.
    """

    if not farmer_state.strip():
        raise ValueError("Farmer state cannot be empty")

    if not farmer_district.strip():
        raise ValueError("Farmer district cannot be empty")

    if not mandi_market.strip():
        raise ValueError("Mandi market cannot be empty")

    if not mandi_district.strip():
        raise ValueError("Mandi district cannot be empty")

    state = farmer_state.strip()
    farmer_district = farmer_district.strip()
    mandi_market = mandi_market.strip()
    mandi_district = mandi_district.strip()
    farmer_location = (
        f"{farmer_district}, {state}, India"
    )

    farmer_fallbacks = [
        f"{farmer_district}, Uttar Pradesh, India",
        f"{farmer_district}, India",
    ]

    farmer_lat, farmer_lon = geocode_location(
        farmer_location,
        fallback_locations=farmer_fallbacks,
    )
    mandi_location = (
        f"{mandi_market}, "
        f"{mandi_district}, "
        f"{state}, India"
    )

    market_without_apmc = mandi_market

    if market_without_apmc.lower().endswith(" apmc"):
        market_without_apmc = market_without_apmc[:-5].strip()

    mandi_fallbacks = [
        (
            f"{market_without_apmc}, "
            f"{mandi_district}, "
            f"{state}, India"
        ),
        (
            f"{mandi_district}, "
            f"{state}, India"
        ),
        (
            f"{mandi_district}, India"
        ),
    ]

    mandi_lat, mandi_lon = geocode_location(
        mandi_location,
        fallback_locations=mandi_fallbacks,
    )
    route_url = (
        f"{OSRM_URL}/"
        f"{farmer_lon},{farmer_lat};"
        f"{mandi_lon},{mandi_lat}"
    )

    params = {
        "overview": "false",
    }

    try:
        response = requests.get(
            route_url,
            params=params,
            timeout=(10, 30),
        )
        response.raise_for_status()
    except requests.RequestException as exc:
        raise RuntimeError(
            f"Routing request failed: {exc}"
        ) from exc

    try:
        data = response.json()
    except ValueError as exc:
        raise RuntimeError(
            "OSRM returned invalid JSON"
        ) from exc

    if data.get("code") != "Ok":
        raise RuntimeError(
            f"OSRM could not calculate route: "
            f"{data.get('code')}"
        )

    routes = data.get("routes", [])

    if not routes:
        raise RuntimeError(
            "OSRM returned no routes"
        )

    distance_meters = routes[0]["distance"]

    return distance_meters / 1000.0


def estimate_transport(
    farmer_state: str,
    farmer_district: str,
    mandi_market: str,
    mandi_district: str,
    quantity_quintals: float,
    rate_per_km_per_quintal: float = DEFAULT_TRANSPORT_RATE,
) -> tuple[float, float]:
    """
    Calculate road distance and estimated transportation cost.

    The transport rate can be supplied dynamically.
    """

    distance_km = estimate_distance(
        farmer_state=farmer_state,
        farmer_district=farmer_district,
        mandi_market=mandi_market,
        mandi_district=mandi_district,
    )

    transport_cost = calculate_transport_cost(
        distance_km=distance_km,
        quantity_quintals=quantity_quintals,
        rate_per_km_per_quintal=rate_per_km_per_quintal,
    )

    return distance_km, transport_cost