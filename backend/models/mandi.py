from pydantic import BaseModel

class MandiPrice(BaseModel):
    state: str
    district: str
    market: str
    commodity: str
    variety: str
    grade: str
    arrival_date: str
    min_price: float
    max_price: float
    modal_price: float

class MandiOption(BaseModel):
    market: str
    variety: str
    price_per_quintal: float
    quantity_quintals: float
    gross_revenue: float
    distance_km: float
    transport_cost: float
    net_revenue: float