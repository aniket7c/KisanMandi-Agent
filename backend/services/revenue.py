from models.farmer import FarmerRequest
from models.mandi import MandiOption, MandiPrice
from services.transport import (
    estimate_distance,
    calculate_transport_cost,
)


def calculate_gross_revenue(
    price_per_quintal: float,
    quantity_quintals: float,
) -> float:
    """
    Calculate gross revenue from selling produce at a mandi.
    """

    if price_per_quintal < 0:
        raise ValueError("Price cannot be negative")

    if quantity_quintals <= 0:
        raise ValueError("Quantity must be greater than zero")

    return price_per_quintal * quantity_quintals


def calculate_net_revenue(
    gross_revenue: float,
    transport_cost: float,
) -> float:
    """
    Calculate revenue remaining after transportation costs.
    """

    if gross_revenue < 0:
        raise ValueError("Gross revenue cannot be negative")

    if transport_cost < 0:
        raise ValueError("Transport cost cannot be negative")

    return gross_revenue - transport_cost


def build_mandi_options(
    records: list[MandiPrice],
    farmer_request: FarmerRequest,
) -> list[MandiOption]:
    """
    Convert mandi price records into farmer-specific
    mandi options with revenue and transportation calculations.
    """

    if farmer_request.quantity_quintals <= 0:
        raise ValueError("Quantity must be greater than zero")

    options = []

    for record in records:
        gross_revenue = calculate_gross_revenue(
            price_per_quintal=record.modal_price,
            quantity_quintals=farmer_request.quantity_quintals,
        )
        distance_km = estimate_distance(
            farmer_state=farmer_request.state,
            farmer_district=farmer_request.district,
            mandi_market=record.market,
            mandi_district=record.district,
        )
        transport_cost = calculate_transport_cost(
            distance_km=distance_km,
            quantity_quintals=farmer_request.quantity_quintals,
        )
        net_revenue = calculate_net_revenue(
            gross_revenue=gross_revenue,
            transport_cost=transport_cost,
        )
        options.append(
            MandiOption(
                market=record.market,
                variety=record.variety,
                price_per_quintal=record.modal_price,
                quantity_quintals=farmer_request.quantity_quintals,
                gross_revenue=gross_revenue,
                distance_km=distance_km,
                transport_cost=transport_cost,
                net_revenue=net_revenue,
            )
        )

    return options