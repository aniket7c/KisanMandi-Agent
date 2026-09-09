from agent.mandi_agent import mandi_agent


print("\n🌾 KisanMandi Agent")
print("=" * 50)

response = mandi_agent(
    """
I am a farmer from Kanpur Nagar, Uttar Pradesh.

I have 50 quintals of Wheat, variety Dara.

Which mandi should I sell my wheat at?
Please compare the available options and recommend the
best one based on my expected net revenue.
"""
)

print("\nAgent response:")
print(response)