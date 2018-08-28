# Solving with Dijkstra's algorithm
We can (theoretically) improve the above BFS by running Dijkstra's algorithm, which is a generic shortest path algorithm for arbitrary weighted graphs. Instead of blindly visiting each unvisited adjacent vertex until we have found our target, we will give them a priority. We will visit adjacent verticies that have **lower** associated cost first. This is a greedy approach that takes steps that may be optimal for
**intermediate** solutions, but not optimal for the **overall** solution. So we run the risk of diverging off on to many sub-optimal paths if the maze has a high branching factor.

In fact, since each adjacent vertex has the same cost to visit, if the graph only has **one solution**, Dijkstra will behave nearly identically to BFS. In other words, Dijkstra degrades to a greedy best-first search.

The only way we get value out of Dijkstra's algorithm is if there are **multiple ways** to get to the same vertex because that way we could actually **compare** and update costs if a **better** route is found. With this in mind, it makes it clear that the added benefit of Dijkstra's algorithm is null and void unless the maze has multiple solutions.

## Implementing Dijkstra
Dijkstra's algorithm is very similar to BFS. The difference is that we update costs upon finding better paths and we do not use the visited flag.

Pseudo code follows:

```javascript
dijkstra(graph, src, dst) {

	var unvisited = []	// Heap
	var neighbors = []	// Set
	var parents   = []	// Map
	var current
	var cost

	// Add to heap with initial cost of infinity
	graph.verticies.forEach( v => {

		if (v != src) {

			v.cost = Infinity

			unvisited.push(v)
		}

	})

	// The start vertex has no parent
	parents[src.key] = null

	// Cost to get to start is 0
	src.cost = 0

	// Push source
	unvisited.push(src)

	// Process each vertex
	while (unvisited.length > 0) {

		// Get next vertex with min cost
		current = unvisited.min()

		// We found the target
		if (current == dst) {

			break
		}

		// Get it's neighbors
		neighbors = current.neighbors()

		// Discover each neighbor
		neighbors.forEach( neighbor => {

			// Compute cost to go over one vertex
			cost = current.cost + 1

			// Have we found a shorter path to this vertex?
			if (cost < neighbor.cost) {

				// Update the cost
				neighbor.cost = cost

				// Update path map to indicate new parent vertex
				parents[neighbor.key] = current.key

				// Decrease the key of the neighbor with new cost
				unvisited.decreaseKey(neighbor, cost

			}

		})

	}

	// Backtrack using parent map to display path

}
```

## Time complexity of Dijkstra
For this particular problem, we have chosen to implement Dijkstra's
algorithm with a min priority binary heap. We must loop through `|V|` vertices. For each iteration, we perform 1 `pop()` which is `O(log |V|)` and at most 4 `push()` operations for each adjacent neighbor - also `O(log |V|)`. So, multiplying the inner runtime by the outer runtime, we get `O(|V| * log |V|)`.

**Solving the maze with Dijkstra's algorithm is done in** `O(|V| * log |V|)` **time.**

## Space complexity of Dijkstra
Dijkstra's algorithm uses a priority queue to process unvisited vertices. In the worst case we will push `|V|` vertices before our first pop. We also use a map for backtracking to discover the path from source to destination. The map used to reconstruct the path will also have at most `|V|` entries.

**The space complexity is** `O(|V|)`.
