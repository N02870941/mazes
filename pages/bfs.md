# Solving with Breadth-first search (BFS)
Breadth-first search is another general purpose graph traversal algorithm. The intuition behind BFS can be looked at as roughly the "opposite" of that of DFS. In DFS we try to go as deep as possible until we hit a dead end. With BFS, we try to go as wide as possible until we hit a dead end, or find our target. For acyclic graphs it is the equivalent of a level-order traversal of a tree.

## Implementing BFS
It turns out that the only difference between implementing BFS and DFS is the data structure used to process vertices. For DFS we used a stack, which is a First In Last Out (FILO) structure. For BFS we will use a standard queue, which is a First In First Out (FIFO) structure. The code is otherwise, roughly the same.


Pseudo code follows:

```javascript
bfs(src, dst) {
	let unvisited = []	// Queue
	let neighbors = []	// Set
	let parents   = []	// Map
	let current

	// The start vertex has no parent
	parents[src.key] = null

	// Start with source
	unvisited.enqueue(src);

	while (unvisited.length > 0) {
		current = unvisited.dequeue()

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
					unvisited.enqueue(neighbor)
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

## Time complexity of BFS
Breadth-first search's outer loop visits all `|V|` vertices. Within each loop iteration, we perform one `dequeue()` and at most 4 `enqueue()` operations - constant time. Discovering adjacent vertices is also done in constant time. In total, we have `|V| * O(1)` which is `O(|V|)`.

**The runtime of BFS is** `O(|V|)`.

## Space complexity of BFS
To process vertices, BFS uses a queue. In the worst case, the queue is storing all the vertices - `O(|V|)`. We also use a map to store references to vertices to reconstruct the path. In the worst case, the map holds references to all vertices - `O(|V|)`.

**The space complexity of BFS is** `O(|V|)`.
