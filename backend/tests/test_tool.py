from agent.mandi_tools import find_best_mandi


result = find_best_mandi(
    state="Uttar Pradesh",
    district="Kanpur Nagar",
    crop="Wheat",
    quantity_quintals=50,
    variety="Dara",
)

print(result)