# Mazes
[![Build Status](https://travis-ci.com/N02870941/mazes.svg?branch=master)](https://travis-ci.com/N02870941/mazes)

A simple maze generator and solver available in the form of a [web app][site].

# Intuition
One way of describing the process of generating and solving a maze is through graph theory. For the
purpose of clarity, we will use the words maze and graph interchangeably. If you
are not familiar with graph theory, here is an explanation of the information
about graph theory that is relevant to understand this problem.

A graph `G` is a pair denoted as `G = {V, E}` where `V` is a set of vertices and
`E` is a set of edges where each edge connects some vertex `u` to some vertex `v` from the vertex set `V`. A vertex is an abstract
**node or location** in a network. An edge is a **branch** that links vertices together. Graphs
come in various ways:

1. Weighted
2. Directed

Any combination is valid:

1. Weighted and directed
2. Weighted and undirected
3. Unweighted and directed
4. Unweighted and undirected


<p align="center">
  <img src="img/png/weighted-unweighted.png"><br>
</p>

A weighted graph is a graph where edges have a specified **weight** or **cost** associated
with branching two vertices. For example, if we represent a country as a graph where
cities are vertices and roads are edges, the weight of an edge might be the distance between
each city.

<p align="center">
  <img src="img/png/directed-undirected.png"><br>
</p>

A directed graph is a graph where an edge `e`  from vertex `u` to
`v` is not equal to an edge `f` from `v` to `u` - they are directional. For example, in our city
graph we may have an edge (road) from New York to Chicago with weight 200 miles.
But, we have a **different** edge going from Chicago to New York that is 250 miles because the return route may require taking a different road.

<p align="center">
  <img src="img/png/undirected-weighted.png"><br>
  <i>Undirected, weighted graph with uniform costs that represents a 2 x 2 pixel image.</i>
</p>

For the purpose of representing a maze, we will use an undirected weighted graph.
We will consider vertices white pixels (or square groups of white pixels) and edges will be
placed between adjacent pixels. A vertex is considered adjacent or having an edge with another vertex if there is **no** barrier (black pixels) between them. Edges will have a uniform weight of 1 which
just indicates that two vertices are one pixel away from each other (adjacent).

<p align="center">
  <img src="img/png/grid.png"><br>
  <i>A 30 x 30 square grid that represents a graph with <strong>no</strong> edges.</i>
</p>

It is worth noting for this particular implementation, we will have a
tad of redundancy where each cell in the grid has information regarding all 4
adjacent vertices. This causes overlap in that for a vertex `u` that is to the
left of vertex `v`, `u`'s `right` vertex is the same as `v`'s `left` vertex pointer.
So from a technical coding standpoint, the graph created in memory will be directed, but edges `{u,v}` and `{v,u}` will
be treated the same. For example, if we delete one, we delete the other. So we still consider the graph undirected.
This can be optimized if an abstract "`Graph`" object were created in memory. But, that
is unnecessary for the scope of this problem.

# Maze generating
Generating a maze requires a modified graph traversal algorithm. Traversing the graph means to
**visit** each node (usually) from a specified starting vertex. If an undirected graph is
**connected** then there exists a path from each vertex to every other vertex in the graph.

<p align="center">
  <img src="img/png/unweighted-undirected-graph.png"><br>
  <i>A connected unweighted graph.</i>
</p>

In the case of a **blank** `n x n` image where `n` is the width (and height) of the image
in pixels, the image **always** represents connected graph. The reason is that
there are no missing pixels. So, in terms of
traversing the image, there exist a path from each white pixel to every other white pixel - this is too many
in fact. 

This is why we have black lines to represent the **absence** of edges, or a boundary that terminates a particular path. But, in the case of our full grid, we have too many boundaries as well - resulting in zero paths. 

Our goal is to traverse our image full of boundaries and **remove** (recreate) as many (paths) as possible but still resulting in a graph that has the connected property. This will result in a maze that leaves a
**path** from any vertex to any other vertex, but in a much less cluttered way.
The result is called a **spanning tree**.

<p align="center">
  <img src="img/png/spanning-tree.png"><br>
  <i>A spanning tree of the above graph.</i>
</p>

A spanning tree `S` is a sub-graph of a graph `G = {V, E}` that contains the minimum
number of edges required to connect all vertices in `G`. If we denote the number of
vertices as `|V|` and number of edges as `|E|`, then for graph `S`, `|V'| = |V|` and `|E'| = |V| - 1`. It also turns out that graph `S` has the **acyclic** property of a graph. 

<p align="center">
  <img src="img/png/cyclic-acyclic.png"><br>
  <i>A cyclic graph, and it's acyclic sub-graph.</i>
</p>

A graph is acyclic if there is **no way** to start
at a specified vertex `v` and follow an alternating sequence of vertices and edges `v1, e1, v2, e2...`
where edge `ei` connects `vi` and `vi+1` and visit the same vertex twice. In other words, there
are no loops or repitition in a walk of the graph.

For simplicity, we will consider white (squares of) pixels valid vertices, and black (lines of)
pixels the absence of a connecting edge. This means, as we go through our graph removing walls, we will
be generating a continuous path of white pixels that represent traversable vertices
in the graph. Black pixels that are left over will be the walls of the maze. They
are the absence of edges, or area that does not allow us to go from one vertex to another.

<p align="center">
  <img src="img/png/maze.png"><br>
  <i>Our result once the correct amount of walls is removed will look like this.</i>
</p>

Now that we have framed the problem, we can see some of the algorithms used to actually generate the mazes.

# Notes on runtime and space analysis

We will explore the runtime of both generating the maze, and solving it. But, before we do that
we must prove a few things and understand that runtime analysis on graphs is often times
dependent on **how** the graph is implemented. Let's explore the worst case scenarios.

As stated, a graph `G = {V, E}` can have a vertex set with cardinality `|V|`. Provided
that each vertex can be connected to at most, every other vertex, the cardinality of the edge set
`E` can be expressed as `|E| ≈ |V|²`. **However, for this particular problem, we can assert otherwise**.

The reason is because we are working on an image where edges only exist between **adjacent** pixels. A pixel can only be adjacent to at most 4 other vertices.
Consider a grid composed of n x n pixels or n² vertices. 


A vertex has at most 4 adjacent vertices:

1. Top
2. Bottom
3. Left
4. Right

We can also visualize each vertex from 0,0 to 0,k where k = n-1 as follows:


<p align="center">
  <img src="img/png/branching-factor.png">
</p>


We observe, that each vertex has 4 edges that point to the top, bottom, left, and right
adjacent vertices. In total, for `|V|` vertices we have 4 * `|V|` edges. `|E|` is linear with respect to `|V|`.
Although typically we say `O(|E|) = O(|V|²)`, for **this particular problem** we can say `O(|E|) = O(|V|) = O(n²)` where `n` is the number of boxes in our grid.

# Implementation details
There are many ways to represent a graph in memory. The typical implementations of the graph structure are Edge List, Adjacency Matrix, and Adjacency List. However, since this graph does not need to support all of the standard graph operations, we will implement a modified version of the adjacency list. We will have a single array called `grid` that represents a flattened `n x n` matrix of pixels / vertices. The `grid` array will be of type `Cell`.

```
Cell {

	walls     = 1111
	visited   = false
	cost      = Infinity
	heuristic = 0
}
```

Each `Cell` object contains a 4-bit binary string containing boolean values indicating whether or not any of the 4 walls are present for that `Cell`. If a particular bit is set to 0, then there is **no** wall, or there **is** and edge between that cell and the cell indicated by the position of the bit. If the bit is set to 1, a wall **does** exist or there is **not** an edge to the adjacent vertex. The bit mapping goes as follows:

| Bit | Neighbor |
|:---:| :------: |
| 0   | top      |
| 1   | right    |
| 2   | bottom   |
| 3   | left     |

For example, if `wall = 1010`, then the cell has a top, and bottom wall, but it does not have a left or right wall. In order to actually check the value of or modify on of the flags, we must use bitwise operations.

In regards to edge weight, there is no need to actually store that information. As noted, all edges have a weight of 1 because the distance between two adjacent pixels is always 1. So, we can simply ignore it. Instead, we just give each cell a `cost` field that represents the **aggregated weight** associated with **getting to** that vertex from a specified start vertex.

<p align="center">
  <img src="img/png/uniform-costs.png"><br>
  <i>A walk from vertex A to I on a weighted graph.</i>
</p>

For a given walk of the graph, the cost of a vertex `v_i` is always the cost of vertex `v_(i-1) + 1`, where `v_(i-1)` is the vertex just before vertex `v` in the walk. So, when we traverse the graph, we just keep incrementing as we go instead of wasting space on information we can confidently predict and compute when it is needed. We see for vertices that we have not discovered or visited, by default their cost is infinite - this will come in handy when finding the shortest path between two vertices.

# Generating with backtracking

The [Randomized Depth / Breadth-first search][wiki] follows:

1. Make the initial cell the current cell and mark it as visited
2. While there are unvisited cells
    1. If the current cell has any neighbors which have not been visited
        1. Choose randomly one of the unvisited neighbors
        2. Push the current cell to the stack
        3. Remove the wall between the current cell and the chosen cell
        4. Make the chosen cell the current cell and mark it as visited

    2.Else if stack is not empty
        1. Pop a cell from the stack
        2. Make it the current cell

Pseudo code follows:

```
backtrack(src) {

	var unvisited = []  // Stack or Queue
	var neighbors = []  // Array
	var curr
	var next
	var i
	
	// Make the initial cell the current cell
	curr = src

	do {
	
		// Mark current as visited
		curr.visited = true
		
		// Get neighbors
		neighbors = curr.neighbors()
		
		// If at least one came back
		if (neighbors.length > 0) {
		
			// Pick random index
			i = random(0, neighbors.length)
		
			// Pick random neighbor	
			next = neighbors[i]
			
			// Push to stack
			unvisited.push(next)
			
			// Remove wall (create edge)
			removeWall(curr, next)
			
			// Point current to next
			curr = next
			
		// No neighbors, start backtracking
		} else {
		
			curr = unvisited.pop()
		}
	
	} while (unvisited.length > 0)

}
```

In essence, this algorithm starts at a vertex `u`, randomly visits an adjacent
vertex `v` that has not been visited yet - destroying barriers (walls of pixels) between
the current and previous vertices to create an edge, and repeats this until all vertices are visited and we have a spanning tree.

<p align="center">
  <img src="img/png/maze-dfs.png"><br>
  <i>A maze generated with DFS and solved with A*.</i>
</p>

The above algorithm can be written as DFS, BFS, or even a hybrid. if implemented with DFS, the resulting maze will have a longer solution path, but relatively "easy" to solve by a computer using graph algorithms because there is a lower brancing factor. This means dead ends are relatively short, and there are less paths that are seemingly reasonable but lead no where. Instead, the solution may take many twists and turns around the entire maze to get to the target. We see there are less highlighted squares, meaning the path finding algorithm did not visit too many nodes that did not contribute to the final solution.

<p align="center">
  <img src="img/png/maze-bfs.png"><br>
  <i>A maze generated with BFS and solved with A*.</i>
</p>

Generating the maze with BFS will result in a maze with much higher branching factor, meaning the depth of the tree will be lower. This means we will get a shorter path, so the maze is more solvable for humans. However, for graph algorithms, they will generally take longer to solve because there are many more "promising" paths that branch off to dead ends. Notice that the path finding algorithm visited nearly all nodes to find the optimal solution, even though by "looking" at it, the solution appears obvious.

<p align="center">
  <img src="img/png/maze-bfs-dfs.png"><br>
  <i>A maze generated with BFS / DFS hybrid and solved with A*.</i>
</p>

Finally, we can implement a hybrid where sometimes we push, and sometimes we pop. This will result in a maze that is less difficult than DFS, so still solvable by a human, but less predictable than BFS so it remains interesting. Alternating between pushing and popping with 50:50 probability works well. Here we see, the path finding algorithm needed to visit a decent amount of nodes before finding the solution and the solution still seems "doable" by a human.

## Time complexity with backtracking
As noted, we are using depth / breadth-first search to generate the graph. To **traverse** a graph
we visit each node once, which is `O(|V|)`. But, we also must check all adjacent vertices per vertex.
This we can do in `O(1)` time because edges are simply stored as boolean values per grid cell.
We must check all four (top, bottom, left and right) edges, per vertex. This is `4 * O(1)`
which is still `O(1)`. So, we are doing `|V|` loop iterations, each of which does `O(1)` work.

**Generating the maze is done in** `O(|V|)` **time.**

## Space complexity with backtracking
The only auxiliary space we use is the stack / queue
structure for queuing vertices for processing. In the worst case, the depth / breadth-first search
traverses the entire graph without repetition / backtracking. This would mean all `|V|` vertices are
pushed on to the stack before any popping (visiting) occurs.

**Generating the maze required** `O(|V|)` **space.**

# Solving with Depth-first search (DFS)

A modified depth-first search can be used, stopping once we come across the
target vertex, then back tracking to discover the path from source to destination. This is a brute force method that may not always result in the optimal solution if there is more than one path from beginning to end. However, in practice it runs relatively fast in comparison to other search algorithms.

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
		
		// If first time visiting
		if (!current.visited) {
		
			// Label is visited
			current.visited = true
					
			// Get it's neighbors
			neighbors = current.neighbors()
			
			// Push all unvisited neighbors to stack
			neighbors.forEach( neighbor => {
			
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

# Solving with Breadth-first search (BFS)

Breadth-first search is another general purpose graph traversal algorithm. The intuition behind BFS can be looked at as roughly the "opposite" of that of DFS. In DFS we try to go as deep as possible until we hit a dead end. With BFS, we try to go as wide as possible until we hit a dead end, or find our target. For acyclic graphs (trees) it is the equivalent of a level-order traversal. It also turns out that the only difference between implementing BFS and DFS is the data structure used to process vertices. For DFS we used a stack (FILO) structure. For BFS we will use a standard queue (FIFO) structure. The code is otherwise, roughly the same.

Pseudo code follows:

```javascript
bfs(src, dst) {

	var unvisited = []	// Queue
	var neighbors = []	// Set
	var parents   = []	// Map
	var current
	
	// The start vertex has no parent
	parents[src.key] = null
	
	// Start with source
	unvisited.enqueue(src);
	
	// Process each vertex
	while (unvisited.length > 0) {
	
		// Get next vertex
		current = unvisited.dequeue()
		
		// We found the target
		if (current == dst) {
			
			break
		}
		
		// If first time visiting
		if (!current.visited) {
		
			// Label is visited
			current.visited = true
					
			// Get it's neighbors
			neighbors = current.neighbors()
			
			// Push all unvisited neighbors to stack
			neighbors.forEach( neighbor => {
			
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

# Solving with Dijkstra's algorithm

We can (theoretically) improve the above BFS by running Dijkstra's algorithm, which is a generic shortest path algorithm for arbitrary weighted graphs. Instead of blindly visiting each unvisited adjacent vertex until we have found our target, we will give them a priority. We will visit adjacent verticies that have **lower** associated cost first. This is a greedy approach that takes steps that may be optimal for
**intermediate** solutions, but not optimal for the **overall** solution. So we run the risk of diverging off on to many sub-optimal paths if the maze has a high branching factor.

In fact, since each adjacent vertex has the same cost to visit, if the graph only has **one solution**, Dijkstra will behave exactly like a greedy BFS.

The only way we get value out of Dijkstra's algorithm is if there are **multiple ways** to get to the same vertex because that way we could actually **compare** and update costs if a **better** route is found. With this in mind, it makes it clear that the added benefit of Dijkstra's algorithm is null and void unless the maze has multiple solutions. 

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
		
		// Label is visited
		current.visited = true
		
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

Dijkstra's algorithm uses a priority queue to process unvisited vertices. In the worst case we will push `|V|` vertices before our first pop. We also use a map for backtracking to discover the path from source to destination. Since we are **only working with spanning trees**, the max size of a path is `|V| - 1`. In fact, no **path** in a graph can have more than `|V|` vertices because a path by definition says a vertex cannot be repeated. So, the map cannot grow greater than `O(|V|)`. 

**The space complexity is** `O(|V|)`.

# Solving with A* search

The limitations of Dijkstra's algorithm is the reason we use A* (A Star) as our primary approach in **path finding**. It can be considered a generalization of Dijkstra's algorithm
that uses a heuristic value (specific to the problem) that prevents us from straying away on non-optimal paths and helps make more intelligent intermediate
steps that lead to the overall optimal solution. We can also say Dijkstra's algorithm is a specific case of A* where the heuristic of all adjacent vertices are equal or zero - thus having no impact on decision making. This fact, along with the fact that edge weights are all equal for a maze is why Dijkstra for simple (single solution) mazes degrades to a greedy best-first search.

The heuristic is an easy-to-compute value computed per iteration (or beforehand) that we use to determine whether or not we are getting closer to our target. It is a problem-specific computation because for arbitrary graphs (a set of edges and vertices) we do not have any information nor a concept of "how close" we are. Since we have our graph in terms of a grid, a good choice for the heuristic is the (euclidian or manhattan) distance between the current pixel and the target. 

Although we may not always know the **direct** path, we know we are getting closer if the distance is shrinking. With this new tool at our disposal, we make our choice to visit a particular vertex that not only minimizes overall cost, but also shrinks the distance between the current vertex in the search and the target vertex - this assures us we are "getting closer." We use both the aggregated cost and the vertex's heuristic as the metric for assigning priority to vertices in the priority queue.

Again, algorithms like Dijkstra's or A* have limited benefit if there is only one solution. However, A* allows us to make more **informed** decisions in our traversal.

Pseudo code follows:

## Time complexity of A*

A* is the worst case degrades to Dijkstra's algorithm. We visit all `|V|` vertices, each of which requires a `log |V|` extract min operation on the min heap. This results in `O(|V| * log |V|)` operations.

**Solving the maze with A* is done in** `O(|V| * log |V|)` **time.**

## Space complexity of A*

A* uses a priority queue of unvisited vertices. In the worst case, we
push all `|V|` vertices before popping. This is the case where we visit **all** vertices in a single walk before hitting a dead end. The map used for backtracking in the worst case will hold references to all `|V|` vertices in the path from source to destination - also using at most `O(|V|)` space. Lastly, if we pre-compute our heuristics for easy lookup (one per vertex), we will need `O(|V|)` extra space - still resulting in linear space.

**The space complexity of A* is** `O(|V|)`.

# How to run
Ensure you have docker installed before running the following commands:

```
docker pull jabaridash/mazes

docker run -p 8080:80 jabaridash/mazes
```

You can also run it from source if you have git and node 8+ installed:

```
git clone https://github.com/N02870941/mazes.git

cd mazes/src

npm install

gulp dev
```

[site]: http://mazes.jabaridash.com
[wiki]: https://en.wikipedia.org/wiki/Maze_generation_algorithm
[youtube]:https://www.youtube.com/watch?v=HyK_Q5rrcr4
