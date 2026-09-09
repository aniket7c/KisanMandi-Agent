from pydantic import BaseModel, Field

class FarmerRequest(BaseModel):
    state: str
    district: str
    crop: str
    quantity_quintals: float = Field(gt=0)
    variety: str | None = None