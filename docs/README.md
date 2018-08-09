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
Maze generation and solving can be described in terms of graph theory. For the
purpose of clarity, we will use the words maze and graph interchangeably. If You
are not familiar with graph theory, here is a **brief** explanation on the relevant
parts.

A graph `G` is a pair denoted as `G = {V, E}` where `V` is a set of vertices and
`E` is a set of edges that associated vertices in the set `V`. A vertex is an abstract
*node* in a network. A vertex is a *branch* that links two vertices of nodes. Graphs
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
example, although the distance from New York to Chicago may be 200 miles, the distance
you do not take the same road going the other way.

For the purpose of representing a maze, we will use an undirected weighted graph.
We will consider vertices pixels (or square groups of pixels) and an edge will be
placed between two adjacent pixels. Edges will have a uniform weight of 1 which
just indicates two vertices are one pixel away from each other (adjacent).

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
number of edges required to connected all vertices in `G`. If we denote the number of
vertices as `|V|` and number of edges as `|E|`, then for graph `S`, `|V|`
remains the same, and `|E| = |V| - 1`. It also turns out that graph `S` meets the
criteria of an **acyclic** graph. A graph is acyclic if there is *no way* to start
at a specified vertex `v` and follow an alternating sequence of vertices and edges `v1, e1, v2, e2...`
where edge `ei` connects `vi` and `vi+1` in the sequence. In other words, there
are no loops.

Now that we have establish our vocabulary we can see the algorithm:

1. Make the initial cell the current cell and mark it as visited

2. While there are unvisited cells
  1. If the current cell has any neighbours which have not been visited
    1. Choose randomly one of the unvisited neighbours
    2. Push the current cell to the stack
    3. Remove the wall between the current cell and the chosen cell
    4. Make the chosen cell the current cell and mark it as visited

  2.Else if stack is not empty
    1. Pop a cell from the stack
    2. Make it the current cell

# Maze solving
