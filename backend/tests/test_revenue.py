from models.farmer import FarmerRequest
from services.agmarknet import fetch_mandi_prices, filter_by_variety
from services.revenue import build_mandi_options


farmer = FarmerRequest(
    state="Uttar Pradesh",
    district="Kanpur Nagar",
    crop="Wheat",
    quantity_quintals=50,
    variety="Dara",
)


# 1. Fetch live mandi data
records = fetch_mandi_prices(
    request=farmer,
    limit=20,
)


# 2. Keep only the farmer's requested variety
records = filter_by_variety(
    records,
    farmer.variety,
)


# 3. Calculate revenue + transport + net revenue
options = build_mandi_options(
    records,
    farmer,
)


print(f"Found {len(options)} matching mandi options\n")


for option in options:
    print(
        f"{option.market} | "
        f"{option.variety} | "
        f"₹{option.price_per_quintal:.2f}/q | "
        f"Distance: {option.distance_km:.2f} km | "
        f"Transport: ₹{option.transport_cost:.2f} | "
        f"Gross: ₹{option.gross_revenue:.2f} | "
        f"Net: ₹{option.net_revenue:.2f}"
    )