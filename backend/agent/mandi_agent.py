from strands import Agent
from strands.models.gemini import GeminiModel
from agent.mandi_tools import find_best_mandi
from agent.prompts import SYSTEM_PROMPT
from config import MODEL_ID, GEMINI_API_KEY

model = GeminiModel(
    client_args={
        "api_key": GEMINI_API_KEY,
    },
    model_id=MODEL_ID,
)
mandi_agent = Agent(
    model=model,
    system_prompt=SYSTEM_PROMPT,
    tools=[
        find_best_mandi,
    ],
)