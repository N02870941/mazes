/**
 * Generates the maze.
 */
function generate() {

  // Are we still generating?
  if (generator(action) && !generated) {

    notify(strings.WAIT_FOR_MAZE);

  // Cancel whatever we are doing
  // and start generating a new maze
  } else {

    // Fire generating event
    let algorithm = generating();

    // Change main event loop
    // action to specified algorithm
    action   = algorithm;
    callback = postGenerate;

    init();

    // Do we want to process
    // in the background
    if (!animated()) {

      execute(action, callback);
    }

    // Otherwise, do nothing because action()
    // will automatically get picked up and called
    // by the main event loop draw()
  }

}

//-----------------------------------------------------------------------------

function postGenerate() {

  // Trigger generated event
  prepared();

  // Get the start and end cells
  const first = grid[0];
  const last  = grid[grid.length - 1];

  // Remove the left and right
  // walls respectively
  first.walls[3] = false
  last.walls[1]  = false;

  // Re-paint to screen
  first.clear();
  last.clear();
}

//-----------------------------------------------------------------------------

/**
 * Generic backtracking function that
 * takes in two functions. The first
 * function takes in a cell and returns
 * the next "discovered" adjacent cell.
 * It is up to the discovery function to decide
 * 'how' we discover. The dequeue function
 * takes in an array / stack and dequeues the
 * next vertex. It's up to the dequeue function
 * to go about 'how' we choose to dequeue.
 * This is what influences some of the patterns and biases.
 *
 * For example, always removing the first
 * element results in a breadth-first search,
 * or level order traversal. This results in a
 * high branching factor in the resulting tree,
 * and thus a realtively easy solution in that
 * it is not highly 'river-y.' The solution tends
 * to be a straight line from start to finish with
 * slight randomness, but still easy to spot with the eye.
 * However, this can trick up algorithms such as A* because there
 * are many paths that appear 'promising', but are long
 * paths that eventually lead to dead ends.
 *
 * Always removing from the back results in
 * a depth-first search. So we will keep going
 * as deep as possible, until we hit a dead end.
 * For high resolutions, this results in an extremely
 * difficult maze to solve by hand because the path
 * from start to finish is very long and rivery.
 * This however, is easy for A* to solve because
 * dead ends are relatively short and branching factor
 * is low. That being said, there are fewer 'promising'
 * paths that lead to dead ends, and even when they do,
 * they are not very deep, and course correction can
 * be done with less effort than the above example.
 *
 * We can limit the disadvantage of BFS (overly predictable solution)
 * and the disadvantage of DFS (overly complicated solution) by
 * randomizing how we dequeue adjacent vertices as we pave paths
 * throughout the grid. For example, removing from the front 50% and
 * removing from the back 50% warrants less predictable but still
 * solvable solutions.
 */
function make(discover, dequeue) {

  // Mark as visited
  current.visited = true;

  // Set back to white
  current.clear();

  // Get random neighbor
  let next = discover(current);

  // Did one come back?
  if (next) {

    // Mark as visited
    next.visited = true;

    // Push current onto stack
    // for backtracking purposes
    stack.push(current);

    // Remove the wall between
    // these two adjacent vertices
    Cell.pave(current, next);

    // Show in white
    current.clear();
    next.clear();

    // Highlight end of path
    current.highlight();

    // Shift the pointers
    current = next;

  // We have reached a dead end
  // so we start back tracking
  } else if (stack.length > 0) {

    current = dequeue(stack);
  }

  // Exit condition
  return stack.length === 0;
}

//------------------------------------------------------------------------------

/**
 * Random neighbors, standard pop() to dequeue.
 */
function dfs() {

  return make(randomNeighbor, (s) => s.pop());
}

//------------------------------------------------------------------------------

/**
 * Random neighbors, standard removeFirst() to dequeue.
 */
function bfs() {

  return make(randomNeighbor, (s) => s.shift());
}

//------------------------------------------------------------------------------

/**
 * Random neighbors, half removeFirst()
 * half removeLast() to dequeue. Provides
 * decent branching factor without too
 * many rivers.
 */
function hybrid() {

  return make(randomNeighbor, (s) => {

    let n = floor(random(1, 101));

    if (n % 2 === 0)
      return s.shift()

    else
      return s.pop()

  });

}

//------------------------------------------------------------------------------

/**
 * Returns random unvisited
 * adjacent vertex.
 */
function randomNeighbor(cell) {

  // Get unvisited neighbors
  let neighbors = cell.unvisited();

  // Random index
  let r = floor(random(0, neighbors.length));

  // Return random neighbor
  return neighbors[r];
}
