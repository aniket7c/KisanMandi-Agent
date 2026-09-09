from models.farmer import FarmerRequest
from services.agmarknet import fetch_mandi_prices


farmer = FarmerRequest(
    state="Uttar Pradesh",
    district="Kanpur Nagar",
    crop="Wheat",
    quantity_quintals=50,
    variety="Dara",
)


records = fetch_mandi_prices(
    request=farmer,
    limit=10,
)


print("Farmer request:")
print(f"State: {farmer.state}")
print(f"District: {farmer.district}")
print(f"Crop: {farmer.crop}")
print(f"Quantity: {farmer.quantity_quintals} quintals")
print(f"Variety: {farmer.variety}")

print(f"\nFound {len(records)} mandi records\n")

for record in records:
    print(
        f"{record.market} | "
        f"{record.commodity} | "
        f"{record.variety} | "
        f"₹{record.modal_price}/q"
    )