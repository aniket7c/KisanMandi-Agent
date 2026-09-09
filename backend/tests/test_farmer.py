from models.farmer import FarmerRequest


farmer = FarmerRequest(
    district="Kanpur Nagar",
    crop="Wheat",
    quantity_quintals=50,
    variety="Dara",
)

print("Farmer request:")
print(f"District: {farmer.district}")
print(f"Crop: {farmer.crop}")
print(f"Quantity: {farmer.quantity_quintals} quintals")
print(f"Variety: {farmer.variety}")