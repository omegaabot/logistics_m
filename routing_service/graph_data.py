graph = {
    "Delhi": [("Mumbai", 10), ("Bangalore", 15), ("Kolkata", 20)],
    "Mumbai": [("Delhi", 10), ("Chennai", 12), ("Hyderabad", 8)],
    "Bangalore": [("Delhi", 15), ("Chennai", 10), ("Hyderabad", 5)],
    "Kolkata": [("Delhi", 20), ("Chennai", 18)],
    "Hyderabad": [("Mumbai", 8), ("Bangalore", 5), ("Chennai", 6)],
    "Chennai": [("Mumbai", 12), ("Bangalore", 10), ("Hyderabad", 6), ("Kolkata", 18)]
}

city_to_hub = {
    "Bangalore": "Bangalore",
    "Mysore": "Bangalore",
    "Mangalore": "Bangalore",
    "Hubli": "Bangalore",

    "Mumbai": "Mumbai",
    "Pune": "Mumbai",
    "Nagpur": "Mumbai",
    "Nashik": "Mumbai",

    "Delhi": "Delhi",
    "Dwarka": "Delhi",
    "Rohini": "Delhi",
    "Saket": "Delhi",

    "Chennai": "Chennai",
    "Coimbatore": "Chennai",
    "Madurai": "Chennai",
    "Salem": "Chennai",

    "Kolkata": "Kolkata",
    "Howrah": "Kolkata",
    "Durgapur": "Kolkata",
    "Siliguri": "Kolkata",

    "Hyderabad": "Hyderabad"
}