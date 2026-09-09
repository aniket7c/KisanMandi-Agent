from models.farmer import FarmerRequest

from services.agmarknet import (
    fetch_mandi_prices,
    filter_by_variety,
)

from services.revenue import build_mandi_options

from services.recommendation import (
    rank_mandi_options,
    get_best_mandi,
)


# ---------------------------------------------------------
# Farmer request
# ---------------------------------------------------------

farmer = FarmerRequest(
    state="Uttar Pradesh",
    district="Kanpur Nagar",
    crop="Wheat",
    quantity_quintals=50,
    variety="Dara",
)


print("Farmer request:")
print(f"State: {farmer.state}")
print(f"District: {farmer.district}")
print(f"Crop: {farmer.crop}")
print(f"Quantity: {farmer.quantity_quintals} quintals")
print(f"Variety: {farmer.variety}")


# ---------------------------------------------------------
# 1. Fetch live mandi prices
# ---------------------------------------------------------

records = fetch_mandi_prices(
    request=farmer,
    limit=20,
)


# ---------------------------------------------------------
# 2. Filter by farmer's variety
# ---------------------------------------------------------

records = filter_by_variety(
    records,
    farmer.variety,
)


# ---------------------------------------------------------
# 3. Build complete mandi options
# ---------------------------------------------------------

options = build_mandi_options(
    records,
    farmer,
)


# ---------------------------------------------------------
# 4. Rank by NET revenue
# ---------------------------------------------------------

ranked = rank_mandi_options(options)


print("\nRanked mandi options:\n")


for index, option in enumerate(ranked, start=1):

    print(
        f"{index}. {option.market} | "
        f"{option.variety} | "
        f"₹{option.price_per_quintal:.2f}/q | "
        f"Distance: {option.distance_km:.2f} km | "
        f"Transport: ₹{option.transport_cost:.2f} | "
        f"Gross: ₹{option.gross_revenue:.2f} | "
        f"Net: ₹{option.net_revenue:.2f}"
    )


# ---------------------------------------------------------
# 5. Get best mandi
# ---------------------------------------------------------

best = get_best_mandi(ranked)


print("\nBest mandi:")


if best:

    print(
        f"{best.market} | "
        f"Price: ₹{best.price_per_quintal:.2f}/q | "
        f"Distance: {best.distance_km:.2f} km | "
        f"Transport: ₹{best.transport_cost:.2f} | "
        f"Gross: ₹{best.gross_revenue:.2f} | "
        f"Net: ₹{best.net_revenue:.2f}"
    )

else:

    print("No mandi options available.")