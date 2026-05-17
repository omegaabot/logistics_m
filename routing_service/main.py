from fastapi import FastAPI
from pydantic import BaseModel
from dijkstra import dijkstra
from graph_data import graph, city_to_hub

app = FastAPI()

class RouteRequest(BaseModel):
    start: str
    end: str

from graph_data import graph

@app.post("/route")
def get_route(req: RouteRequest):

    start = req.start
    end = req.end

    start_hub = city_to_hub.get(start)
    end_hub = city_to_hub.get(end)

    # ✅ SAFE CHECK (VERY IMPORTANT)
    if not start_hub or not end_hub:
        return {
            "error": f"Invalid mapping: {start} → {start_hub}, {end} → {end_hub}"
        }

    if start_hub not in graph or end_hub not in graph:
        return {
            "error": f"Hub not in graph: {start_hub}, {end_hub}"
        }

    result = dijkstra(graph, start_hub, end_hub)

    # Add original cities for clarity
    result["path"] = [start] + result["path"] + [end]

    return result