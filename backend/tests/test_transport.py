from services.transport import estimate_transport


farmer_state = "Uttar Pradesh"
farmer_district = "Kanpur Nagar"
quantity = 50.0


mandis = [
    ("Kanpur(Grain) APMC", "Kanpur"),
    ("Rura APMC", "Kanpur Dehat"),
    ("Pukharayan APMC", "Kanpur Dehat"),
    ("Jhijhank APMC", "Kanpur Dehat"),
]


print("Dynamic transport estimates:\n")


for market, district in mandis:

    try:
        distance, cost = estimate_transport(
            farmer_state=farmer_state,
            farmer_district=farmer_district,
            mandi_market=market,
            mandi_district=district,
            quantity_quintals=quantity,
        )

        print(
            f"{market} | "
            f"Distance: {distance:.2f} km | "
            f"Transport: ₹{cost:.2f}"
        )

    except Exception as exc:

        print(
            f"{market} | ERROR: {exc}"
        )