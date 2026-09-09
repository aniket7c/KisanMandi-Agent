LOCATION_MAP = {
    "kanpur nagar": "Kanpur",
}

def normalize_district(district: str) -> str:
    """
    Convert a farmer-facing district name into the district
    name used by the Agmarknet dataset.
    """

    normalized = district.strip().lower()

    if normalized in LOCATION_MAP:
        return LOCATION_MAP[normalized]

    return district.strip()