# Mazes
[![Build Status](https://travis-ci.com/N02870941/mazes.svg?branch=master)](https://travis-ci.com/N02870941/mazes)

Mazes is a simple maze generator an solver available in the form of a docker based web app.

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

# Intuition
Maze generating and solving can be described in terms of graph theory. For the
purpose of clarity, we will use the words maze and graph interchangeably. If You
are not familiar with graph theory, here is a **brief** explanation on the relevant
parts.

A graph `G` is a pair denoted as `G = {V, E}` where `V` is a set of vertices and
`E` is a set of edges that associates vertices in the set `V`. A vertex is an abstract
*node* in a network. A vertex is a *branch* that links two vertices or nodes. Graphs
come in various ways:

1. Weighted
2. Directed

You can have any combination:

1. Weighted and directed
2. Weighted and undirected
3. Unweighted and directed
4. Unweighted and undirected

A weighted graph is a graph where edges have a specified **weight** or **cost** associated
with branching two vertices. For example, if we represent a country as a graph where
cities are vertices and roads are edges, the weight of an edge might be distance between
each city.

A directed graph is a graph where an edge `e`  from vertex `u` to
`v` is not equal to an edge `f` from `v` to `u`. For example, in our city
example, we may have an edge from New York to Chicago with weight 200 miles.
But, the edge going from Chicago to New York may be 250 miles because that
edges represents a different road.

For the purpose of representing a maze, we will use an undirected weighted graph.
We will consider vertices pixels (or square groups of pixels) and an edge will be
placed between two adjacent pixels. Edges will have a uniform weight of 1 which
just indicates that two vertices are one pixel away from each other (adjacent). We
do not need to make it directed because from pixels have uniform size, thus a
uniform distance if they are adjacent.

# Maze generating
Generating a maze requires a modified depth-first search of the graph. A depth-first
search is an algorithm used to **traverse** a graph. Traversing the graph means to
*visit* each node (usually) from a specified starting vertex. If an undirected graph is
**connected** then there exists a path from each vertex to every other vertex in the graph.

In the case of an `n x n` image where `n` is the width (and height) of the image
in pixels, the image *always* represents a connected graph. The reason is that
there are no missing pixels assuming your photo is not corrupted. So, in terms of
traversing the image, there exist a path from each pixel to each other pixel - this too many
in fact. Our goal is to traverse our image and **remove** as many edges as possible while
still maintaining our connected property. This will result in a maze that leaves a
**path** from any vertex to any other vertex, but in a much less cluttered way.
The result is called a **spanning tree**.

A spanning tree `S` is a sub-graph of a graph `G = {V, E}` that contains the minimum
number of edges required to connect all vertices in `G`. If we denote the number of
vertices as `|V|` and number of edges as `|E|`, then for graph `S`, `|V|`
remains the same, and `|E| = |V| - 1`. It also turns out that graph `S` meets the
criteria of an **acyclic** graph. A graph is acyclic if there is *no way* to start
at a specified vertex `v` and follow an alternating sequence of vertices and edges `v1, e1, v2, e2...`
where edge `ei` connects `vi` and `vi+1` and visit the vertex twice. In other words, there
are no loops.

For simplicity, we will consider white pixels valid vertices, and black pixels the
absence of a vertex. This means, as we go through our graph removing walls, we will
be generating a continuous path of white pixels that represent traversable vertices
in the graph. Black pixels that are left over will be the walls of the maze. They
are the absence of edges, or area that cannot be visited.

Now that we have framed the problem we can see the [algorithm][wiki]:

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

In essence, this algorithm starts at a vertex `u`, randomly visits an adjacent
vertex `v` that has not been visited yet - destroying barriers (walls of pixels) between
the current and previous vertex, and repeats this until all vertices are visited.

# Maze solving
Now that we have generated a maze, we want to solve it. Solving the maze can be done
in several ways. We will use the A* algorithm to solve it. A* is a single source
shortest pathfinding algorithm. In the case of our maze, we will have a starting point
specified by a pixel's location in the image and a target pixel location to get to.
We will then run A* on the maze to find shortest path between the two vertices (pixels).
Pseudo code for A* follows:

It is worth noting that A* is not the only way to solve this problem. We could have
just done another modified depth-first search, stopping once we come across the
target vertex, then backtracking. However, this is a brute force method that would take a lot longer
and would not result in an optimal solution (if there were more than one path). We can optimize
that by running Dijkstra's algorithm with is a generic shortest path algorithm for weighted graphs. However,
Dijkstra's algorithm is a greedy algorithm that takes steps that may be optimal for
*intermediate* steps, but do not contribute to the *overall* solutions, thus warranting a longer
runtime by potentially going down too many sub-optimal paths before generating the overall
best solution.

For these reason we use A*, which can be considered a generalization of Dijkstra's algorithm
that uses the heuristic value (specific to the problem) that helps make more intelligent intermediate
steps that lead to the overall optimal solution more quickly.

# Runtime analysis
We will explore the runtime of both generating the maze, and solving it. But, before we do that
we must prove a few things and understand that runtime analysis on graphs is often times
dependent on **how** the graph is implemented. Let's explore the worst case scenario:

As stated, an undirected graph `G = {V, E}` can have a integer `|V|` of vertices. Provided
that each vertex can be connected to at most, every other vertex, there can be some number
`|E| ≈ |V|²`. We can prove this:

We can also prove {@code |E|} ≈ {@code |V|²} for an undirected graph even though there are considerably less edges in the graph.

```
G = {V, E}

V = {A, B, C, D, E, F}

We will make a matrix to visualize all potential edges. We will use an {@code x} to denote an edge
and a {@code -} to indicate there is no edge.

  | A B C F E F
--+-------------
A | x - - - - -
B | x x - - - -
C | x x x - - -
D | x x x x - -
E | x x x x x -
F | x x x x x x

We see that going down the matrix (from 1 to |V|) each row contains 1 more edge than the previous row.
The upper triangle of the matrix is all hyphens because those represent edges that would be associating the same
vertices, but going in the opposite direction (directed), so for undirected graphs, they are omitted.

However, if we want to know how many edges we have, we can describe this with the following formula:

      |V|
      ---
      \                                |V| * (|V| + 1)   |V|² + |V|
|E| = /   i  = 1 + 2 + 3 + ... + |V| = --------------- = ----------
      ---                                     2               2
      i=1

We can prove by induction:

 n
---
\                                n * (n + 1)     n² + n
/   i  = 1 + 2 + 3 + ... + n = -------------- = --------
---                                     2           2
i=1

Prove the base case:

 1
---
\              1 * (1 + 1)    1² + 1     2
/   i  = 1  = ------------ = -------- = --- = 1
---                 2           2        2
i=1

Assume all case to be true up to k, where k is less than n:

 k
---
\                                k * (k + 1)     k² + k
/   i  = 1 + 2 + 3 + ... + k = -------------- = --------
---                                     2           2
i=1

Prove case: k+1

k+1
---
\                                       (k+1) * (k+1 + 1)     (k+1) * (k+2)
/   i  = 1 + 2 + 3 + ... + k + (k+1) = ------------------- = -------------
---                                           2                     2
i=1

We re-write case: k+1

 k² + k            ? (k+1) * (k+2)
-------- + (k + 1) = -------------
   2                       2

We simplify the right side:

 k² + k    2 * (k+1) ?  k² + 3k + 2
-------- + --------- = -------------
   2           2             2

We simplify the left side:

 k² + k      2k + 2  ?  k² + 3k + 2
-------- + --------- = -------------
   2           2             2

They match:

 k² + 3k + 2     k² + 3k + 2
------------- = -------------
   2                 2

We have now proven our summation:

 n
---
\                                n * (n + 1)     n² + n
/   i  = 1 + 2 + 3 + ... + n = -------------- = --------
---                                     2           2
i=1

So for the worst case of edges in an undirected graph, we can assert:

      |V|
      ---
      \                                |V| * (|V| + 1)   |V|² + |V|
|E| = /   i  = 1 + 2 + 3 + ... + |V| = --------------- = ----------
      ---                                     2               2
      i=1

```

We can see our final term that expresses `|E|` in terms of `|V|` is of the
order of magnitude `|V|²`. Therefore for both directed and undirected graphs the worst case, `O(|E|) = O(|V|²)`.

## Generating a maze
As noted, we are using depth-first search to generate the graph. To *traverse* a graph
we visit each node once, which is `O(|V|)`. But, we also must check all adjacent vertices.
For a vertex `v` in a graph, `v` can have at most `|V|` edges

[wiki]: https://en.wikipedia.org/wiki/Maze_generation_algorithm
[youtube]:https://www.youtube.com/watch?v=HyK_Q5rrcr4
