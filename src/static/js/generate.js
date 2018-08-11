/**
 * Generates the maze.
 */
function generate() {

  // Are we generating?
  if (action === dfs || first) {

    // Done generating?
    if (generated || first) {

      // This is a one time flag used,
      // for all other subsequent executions
      // this flag should be set to false
      first = false;

      // Change main event loop's
      // primary action back to
      // depth-first search, and
      // reinitialize the grid
      action = dfs;

      init();

    // In progress
    } else {

      notify(strings.WAIT_FOR_MAZE);
    }

  // Or solving?
  } else {

    // Done solving?
    if (solved) {

      // Change main event loop's
      // primary action back to
      // depth-first search, and
      // reinitialize the grid
      action = dfs;

      init();

    // In progress
    } else {

      notify(strings.WAIT_TO_SOLVE);
    }

  }
}

//------------------------------------------------------------------------------

/**
 * Modified depth-first search that
 * continuously removes boundaries
 * between adjacent cells to create
 * one continuous path.
 */
function dfs() {

  // Draw each cell onto canvas
  grid.forEach(c => c.show());

  // Mark as visited
  current.visited = true;

  // Show on screen
  current.flash();

  // Get neighbors
  let next = current.checkNeighbors();

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

    // Shift the pointers
    current = next;

  // We have reached maximum depth
  // so we start back tracking
  } else if (stack.length > 0) {

    current = stack.pop();
  }

  // Indicated where or not
  // all nodes have been processed.
  return stack.length === 0;
}
