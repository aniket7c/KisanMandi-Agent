from services.location import normalize_district


test_locations = [
    "Kanpur Nagar",
    "kanpur nagar",
    "  Kanpur Nagar  ",
    "Kanpur",
]


for location in test_locations:
    result = normalize_district(location)
    print(f"{location!r} -> {result!r}")