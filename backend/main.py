from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from agent.mandi_agent import mandi_agent

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