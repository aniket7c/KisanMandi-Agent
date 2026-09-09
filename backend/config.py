import os
from dotenv import load_dotenv

load_dotenv()

MODEL_ID = os.getenv(
    "MODEL_ID",
    "gemini-3.6-flash",
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

AWS_REGION = os.getenv(
    "AWS_REGION",
    "us-east-1",
)