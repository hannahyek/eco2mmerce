from flask import Flask, request
import math
app = Flask(__name__)


@app.route("/")
def index():
    return "Hello, World!"

@app.route("/ecommerce", methods=["POST"])
def ecommerce():
    request_data = request.get_json()

    user = request_data["user"]

    nearest_warehouse = request_data["nearest_warehouse"]

    item = request_data["item"]
    item_weight = item["weight"]

    flight_emissions = distance(item, nearest_warehouse) * 53 * (item_weight / 78950)
    truck_emissions = distance(nearest_warehouse, user) * 1.2

    print("flight emissions: ", flight_emissions)
    print("truck emissions:", truck_emissions)

    # returns pounds of carbon dioxide
    return {
        "flight_emissions": flight_emissions,
        "truck_emissions": truck_emissions,
        "total_emissions": flight_emissions + truck_emissions,
    }


def distance(location1, location2):
    print(location1, location2)
    coords = [
        float(location1["longitude"]),
        float(location1["latitude"]),
        float(location2["longitude"]),
        float(location2["latitude"]),
    ]
    radian_coords = []
    for i in coords:
        radian_coords.append(float(i) / (180 / math.pi))
    print(radian_coords, radian_coords[0])
    mi_distance = 3963.0 * math.acos(
        (math.sin(radian_coords[1]) * math.sin(radian_coords[3]))
        + math.cos(radian_coords[1])
        * math.cos(radian_coords[3])
        * math.cos(radian_coords[2] - radian_coords[0])
    )
    return mi_distance
