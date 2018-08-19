/**
 * Solves the maze.
 */
function solve() {

  let algorithm = solving();

  switch (algorithm) {

    case dijkstra:
    case aStar:

      queue = heap;
      queue.clear();
      break;

    case DFS:

    default:
      queue = stack;
      break;
  }

  // Maze fully generated?
  if (generated) {

    // Change main event loop's
    // primary action to specified
    // search algorithm
    action   = algorithm;
    callback = highlight;

    // Reset the grid
    grid.forEach(c => {

      c.visited = false;
      c.cost    = Infinity;

      c.clear();
    });

    // Start at first cell
    current = source;

    // Set the cost to 0
    current.cost = 0;

    // Clear the parents map
    parents.clear();

    // Indicates beginning of path
    parents.set(current.key, null);

    // If we want to do it
    // in the background, execute it,
    // then execute highlight as the
    // callback to highlight the path
    if (!animated()) {

      execute(action, () => {

        solved = true;

        execute(callback, complete);
      });

    // Start draw() loop
    } else {

      loop();
    }

  // In progress
  } else {

    unprepared();
  }

}

//------------------------------------------------------------------------------

/**
 * Searches the maze for the target
 * vertex. This function takes a discover()
 * function that takes a Cell object.
 * discover() returns another Cell that will
 * be the next cell pushed on to the stack.
 */
function search(discover, dequeue, update) {

  // Mark current node as visited
  current.visited = true;

  // Do not leave visited
  // highlights on screen
  if (!highlighted()) {

    current.clear();
  }

  // We have found the target vertex
  // So, no need to do any more work
  if (Cell.equals(current, target)) {

    return true;
  }

  // Get next vertex according to
  // the specified getter function
  let next = discover(current);

  // Did anything come back?
  if (next) {

    // Mark as visited
    next.visited = true;

    // Is next in path? have
    // we found a better route? etc.
    // Calling function must Implement.
    if (update(current, next)) {

      parents.set(next.key, current);
    }

    // Push on to queue
    // for backtracking
    queue.push(current);

    // Show on-screen where we are
    current.gradient();
    next.gradient();

    // Move current pointer
    // to next vertex
    current = next;

  // Hit a dead end, begin backtracking
  } else if (queue.length > 0) {

    current = dequeue(queue);
  }

  // If the queue is empty and no one else to visit, the search is done
  return queue.length === 0 &&
         current.unvisited().length === 0
}

//------------------------------------------------------------------------------

/**
 * Searches the maze using the A*
 * path finding algorithm. We Use
 * the closest() function as our
 * adjacent vertex discovery function
 * which used a heuristic (manhattan or euclidian)
 * distance
 */
function aStar() {

  // TODO - http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
  // TODO - http://theory.stanford.edu/~amitp/GameProgramming/index.html

  return search(
    closest,
    (s) => s.pop(),
    cheaper
  );
}

//------------------------------------------------------------------------------

/**
 * Finds the shortest path from the source
 * vertex to the target. For perfect mazes
 * Dijkstra performs exactly the same as
 */
function dijkstra() {

  return search(
    rand,
    (s) => s.pop(),
    cheaper
  );
}

//------------------------------------------------------------------------------

function DFS() {

  return search(
    rand,
    (s) => s.pop(),
    undiscovered
  );
}

//------------------------------------------------------------------------------

/**
 * Takes in a cell and a selector function
 * which has two arguments - neighbors and
 * distances. They are both arrays of the same
 * length where distance[i] represents the distance
 * to get to neighbors[i]. The selector function must
 * return a single value from neighbors. This selector
 * function specifies the order of graph traversal
 */
function next(cell, heuristic, selector) {

  let neighbors  = [];
  let distances  = [];
  let potentials = cell.potentials();
  let cost;

  let add = (x, mask) => {

    if (x && !cell.wall(mask) && !x.visited) {

      cost = heuristic ? heuristic(x, target) : 0;

      neighbors.push(x);
      distances.push(cost);
    }

  };

  add(potentials[TOP],    masks.set.TOP);
  add(potentials[RIGHT],  masks.set.RIGHT);
  add(potentials[BOTTOM], masks.set.BOTTOM);
  add(potentials[LEFT],   masks.set.LEFT);

  return selector(neighbors, distances);
}

//------------------------------------------------------------------------------

/**
 * Selects unvisited adjacent
 * vertices based on minimum
 * heuristic for A* algorithm.
 */
function closest(cell) {

  return next(
    cell,
    Cell.manhattan,
    (neighbors, distances) => neighbors[minimum(distances)]
  );
}

//------------------------------------------------------------------------------

/**
 * Returns a randomly selected
 * unvisited adjacent vertex with
 * no heuristic.
 */
function rand(cell) {

  return next(
    cell,
    null,
    (n, distances) => n[floor(random(0, n.length))]
  );
}

//------------------------------------------------------------------------------

/**
 * Auxiliary function that returns a
 * boolean value that tells the search
 * function to save a record in the parents
 * map that associates src as a the source
 * node to dst in the solution path.
 */
function cheaper(src, dst) {

  // Compute cost to get to next vertex.
  // This is always one plus the cost of
  // the vertex from which we are coming
  // because they are adjacent.
  let cost = src.cost + 1;

  // A better path already exists
  // then do not update.
  if (cost >= dst.cost) {

    return false;
  }

  // If we are here, this means, we have
  // either already seen this vertex, but
  // we have found a better path. Or this
  // is the firt time seeing it, and it's
  // cost is infinite, so anything is less
  // than that. Note, for a perfect / simple
  // maze, this code is only executed once,
  // upon first discovery.
  dst.cost = cost;

  return true;
}

//------------------------------------------------------------------------------

/**
 * Auxiliary function that tells the search
 * function to only store src as a source vertex
 * to dst if the destination vertex has not
 * previously been visited. This may result in
 * suboptimals solution paths if there exist multiple
 * paths from the start to target vertex. For perfect / simlpe
 * mazes this will still result in the optimal solution
 * because there is only one.
 */
function undiscovered(src, dst) {

  return !parents.has(dst.key);
}

//------------------------------------------------------------------------------

/**
 * Iteratively highlights the solution
 * path going backwards from finish to start
 * using the parents lookup table.
 */
function highlight() {

  let stop = true;

  // Highlight current vertex
  current.shade();

  // Get previous vertex
  current = parents.get(current.key);

  // If one came back
  if (current) {

    // Return false to indicate
    // we still have more vertices
    // in our path to highlight
    stop = false;
  }

  return stop;
}
