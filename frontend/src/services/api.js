const API_BASE_URL = "http://127.0.0.1:8000"

export async function getRecommendation(farmerData) {
  const response = await fetch(`${API_BASE_URL}/api/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      state: farmerData.state,
      district: farmerData.district,
      crop: farmerData.crop,
      quantity_quintals: Number(farmerData.quantity),
      variety: farmerData.variety,
    }),
  })

  if (!response.ok) {
    let errorMessage = "Failed to get mandi recommendation."

    try {
      const errorData = await response.json()

      if (errorData.detail) {
        errorMessage = errorData.detail
      }
    } catch {
      // Keep the default error message
    }

    throw new Error(errorMessage)
  }

  return response.json()
}