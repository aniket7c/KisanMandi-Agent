import json
import os
import subprocess
from urllib.parse import urlencode
from dotenv import load_dotenv
from models.farmer import FarmerRequest
from models.mandi import MandiPrice
from services.location import normalize_district

load_dotenv()

API_URL = (
    "https://api.data.gov.in/resource/"
    "9ef84268-d588-465a-a308-a864a43d0070"
)

def fetch_mandi_prices(
    request: FarmerRequest,
    limit: int = 100,
) -> list[MandiPrice]:
    """
    Fetch current mandi prices from the Government of India's
    data.gov.in API based on the farmer's request.

    Returns validated MandiPrice objects.
    """

    api_key = os.getenv("DATA_GOV_API_KEY")

    if not api_key:
        raise RuntimeError("DATA_GOV_API_KEY is not configured")
    district = normalize_district(request.district)
    state = request.state
    commodity = request.crop
    params = {
        "api-key": api_key,
        "format": "json",
        "limit": limit,
        "filters[state]": state,
        "filters[district]": district,
        "filters[commodity]": commodity,
    }
    url = f"{API_URL}?{urlencode(params)}"
    result = subprocess.run(
        [
            "curl",
            "--globoff",
            "--silent",
            "--show-error",
            "--max-time",
            "30",
            url,
        ],
        capture_output=True,
        text=True,
        check=False,
    )

    if result.returncode != 0:
        raise RuntimeError(
            f"Agmarknet API request failed: {result.stderr.strip()}"
        )

    try:
        data = json.loads(result.stdout)
    except json.JSONDecodeError as exc:
        raise RuntimeError(
            "Agmarknet API returned invalid JSON"
        ) from exc

    if data.get("status") != "ok":
        raise RuntimeError(
            f"Agmarknet API returned unexpected response: {data}"
        )

    records = data.get("records", [])

    return [MandiPrice(**record) for record in records]

def filter_by_variety(
    records: list[MandiPrice],
    variety: str | None,
) -> list[MandiPrice]:
    """
    Filter mandi records to match the farmer's requested variety.

    If no variety is provided, return all records.
    """

    if not variety:
        return records

    normalized_variety = variety.strip().lower()

    return [
        record
        for record in records
        if record.variety.strip().lower() == normalized_variety
    ]