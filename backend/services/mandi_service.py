from models.farmer import FarmerRequest
from models.mandi import MandiOption

from services.agmarknet import (
    fetch_mandi_prices,
    filter_by_variety,
)

from services.revenue import build_mandi_options

from services.recommendation import (
    rank_mandi_options,
    get_best_mandi,
)


def find_best_mandis(
    farmer: FarmerRequest,
    limit: int = 20,
) -> tuple[MandiOption | None, list[MandiOption]]:
    """
    Run the complete mandi recommendation workflow.

    Workflow:

        FarmerRequest
            ↓
        Fetch mandi prices
            ↓
        Filter by variety
            ↓
        Calculate gross revenue
            ↓
        Calculate road distance
            ↓
        Calculate transport cost
            ↓
        Calculate net revenue
            ↓
        Rank mandis
            ↓
        Return best mandi + alternatives
    """

    records = fetch_mandi_prices(
        request=farmer,
        limit=limit,
    )
    records = filter_by_variety(
        records,
        farmer.variety,
    )
    options = build_mandi_options(
        records=records,
        farmer_request=farmer,
    )
    ranked_options = rank_mandi_options(options)
    best_mandi = get_best_mandi(ranked_options)

    return best_mandi, ranked_options