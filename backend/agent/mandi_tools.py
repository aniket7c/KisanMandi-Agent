from strands import tool
from models.farmer import FarmerRequest
from services.mandi_service import find_best_mandis

@tool
def find_best_mandi(
    state: str,
    district: str,
    crop: str,
    quantity_quintals: float,
    variety: str | None = None,
) -> str:
    """
    Find the best mandi for a farmer based on live mandi prices,
    transportation cost, and expected net revenue.

    Args:
        state: Farmer's state.
        district: Farmer's district.
        crop: Crop the farmer wants to sell.
        quantity_quintals: Quantity of produce in quintals.
        variety: Optional crop variety.

    Returns:
        A human-readable ranking of the best mandi options.
    """

    farmer = FarmerRequest(
        state=state,
        district=district,
        crop=crop,
        quantity_quintals=quantity_quintals,
        variety=variety,
    )

    best, ranked = find_best_mandis(
        farmer=farmer,
        limit=20,
    )

    if not ranked:
        return (
            "No matching mandi options were found "
            "for the farmer's request."
        )

    lines = [
        f"Found {len(ranked)} matching mandi options:"
    ]

    for index, option in enumerate(ranked, start=1):
        lines.append(
            f"{index}. {option.market} | "
            f"Variety: {option.variety} | "
            f"Price: ₹{option.price_per_quintal:.2f}/quintal | "
            f"Distance: {option.distance_km:.2f} km | "
            f"Transport: ₹{option.transport_cost:.2f} | "
            f"Gross: ₹{option.gross_revenue:.2f} | "
            f"Net: ₹{option.net_revenue:.2f}"
        )

    if best:
        lines.append(
            "\nBest mandi: "
            f"{best.market} | "
            f"Net revenue: ₹{best.net_revenue:.2f}"
        )

    return "\n".join(lines)