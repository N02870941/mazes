# Solving with Depth-first search (DFS)
A modified depth-first search can be used, stopping once we come across the
target vertex. We then backtrack to reconstruct the path from the destination to the source. This is a brute force method that may not always result in the optimal solution if there is more than one path from beginning to end. However, in practice it runs relatively fast in comparison to other search algorithms.

## Implementing DFS
To implement DFS we start by pushing the source vertex onto a stack of unvisited vertices. We then loop until the unvisited node stack is empty. Within the loop, we `pop()` a node. If this node is the target, we break, otherwise we check if the node is unvisited. If so, we mark it as visited, then push all of it's unvisited neighbors onto the stack.

Pseudo code follows:

```javascript
dfs(src, dst) {
	var unvisited = []  // Stack
	var neighbors = []  // Set
	var parents   = []  // Map
	var current

	// The start vertex has no parent
	parents[src.key] = null

	// Start with source
	unvisited.push(src);

	// Process each vertex
	while (unvisited.length > 0) {

		// Get next vertex
		current = unvisited.pop()

		// We found the target
		if (current == dst) {
			break
		}

		if (!current.visited) {
			current.visited = true

			neighbors = current.neighbors()

			neighbors.forEach(neighbor => {

				// If there is no path to this vertex yet
				if (!neighbor.visited) {

					// Create a mapping for backtracking
					parents[neighbor.key] = current.key

					// Add to start for processing
					unvisited.push(neighbor)
				}
			})
		}
	}

	// Start at destination
	current = dst

	// Backtrack highlighting the path
	while (current) {
		current.highlight()

		current = parents[current.key]
	}
}
```

## Time complexity of DFS
Depth-first search visits all `|V|` vertices in the outer loop. Each loop iteration visits at most all of that vertex's edges, which for a grid is always 4. Discovering adjacent vertices is done in `O(1)` time. The `push()` and `pop()` operation on the stack are also done in constant time. So, `O(|V| * 1)` results in linear time with respect to vertices.

**The runtime of DFS is** `O(|V|)`.

## Space complexity of DFS

This depth-first search uses a stack of unvisitd vertices. In the worst case, we
push all `|V|` vertices before popping. This is the case where we visit **all** vertices in a single walk before hitting a dead end. The map used for backtracking in the worst case will hold references to all `|V|` vertices in the path from source to destination - also using at most `O(|V|)` space.

**The space complexity of DFS is** `O(|V|)`.
