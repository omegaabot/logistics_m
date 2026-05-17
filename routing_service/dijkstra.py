import heapq

def dijkstra(graph, start, end):
    queue = [(0, start, [])]
    visited = set()

    while queue:
        (cost, node, path) = heapq.heappop(queue)

        if node in visited:
            continue

        path = path + [node]
        visited.add(node)

        if node == end:
            return {
                "cost": cost,
                "path": path,
                "stops": len(path) - 1
        }

        for neighbor, weight in graph.get(node, []):
            heapq.heappush(queue, (cost + weight, neighbor, path))

    return {"cost": -1, "path": []}