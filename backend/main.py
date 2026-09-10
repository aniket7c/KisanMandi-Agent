from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from agent.mandi_agent import mandi_agent
from models.farmer import FarmerRequest
from services.mandi_service import find_best_mandis
app = FastAPI(
    title="KisanMandi-Agent API",
    description="AI-powered mandi recommendation API for farmers.",
    version="1.0.0",
)
class ChatRequest(BaseModel):
    message: str = Field(
        ...,
        min_length=1,
        description="Farmer's natural-language request",
    )
class ChatResponse(BaseModel):
    response: str
    status: str
@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "KisanMandi-Agent",
    }
@app.post("/api/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    try:
        result = mandi_agent(request.message)
        return ChatResponse(
            response=str(result),
            status="success",
        )
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Agent execution failed: {exc}",
        ) from exc
@app.post("/api/recommend")
def recommend(farmer: FarmerRequest):
    try:
        best, ranked = find_best_mandis(
            farmer=farmer,
            limit=20,
        )

        if not ranked:
            return {
                "status": "success",
                "recommendation": None,
                "alternatives": [],
                "message": "No matching mandi options were found.",
            }

        def format_option(option):
            if option is None:
                return None

            return {
                "market": option.market,
                "variety": option.variety,
                "price_per_quintal": round(option.price_per_quintal, 2),
                "quantity_quintals": round(option.quantity_quintals, 2),
                "gross_revenue": round(option.gross_revenue, 2),
                "distance_km": round(option.distance_km, 2),
                "transport_cost": round(option.transport_cost, 2),
                "net_revenue": round(option.net_revenue, 2),
            }

        return {
            "status": "success",
            "recommendation": format_option(best),
            "alternatives": [
                format_option(option)
                for option in ranked
                if best is None or option.market != best.market
            ],
        }

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Mandi recommendation failed: {exc}",
        ) from exc