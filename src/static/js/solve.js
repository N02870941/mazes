/**
 * Solves the maze.
 */
function solve() {

  // notify("Coming soon!")
  //
  // return;

  // Are we solving?
  if (action === aStar) {

    // Are we done?
    if (solved) {

      notify(strings.ALREADY_SOLVED);

    // Or still solving
    } else {

      notify(strings.WAIT_TO_SOLVE);
    }

  // Or generating?
  } else {

    // Maze fully generated?
    if (generated) {

      // Change main event loop's
      // primary action back to
      // A* search algorithm,
      // mark all nodes as unvited,
      // then solve the maze
      action = aStar;

      grid.forEach(c => c.visited = false);

      // Start at first cell
      current = grid[0];

      loop();

    // In progress
    } else {

      unprepared();
    }

  }

}

//------------------------------------------------------------------------------

/**
 * Modified A* search algorithm
 * that finds the shortest path from
 * the first cell to the last cell.
 */
function aStar() {

  grid.forEach(c => c.show());

  current.visited = true;
  current.optimal = true;

  current.highlight();

  // We have founce the target vertex
  if (costs[current.i][current.j] === 0) {

    return true;
  }

  let next = current.next();

  if (next) {

    next.visited = true;
    next.optimal = true;

    stack.push(current);

    current = next;

  } else if (stack.length > 0) {

    current = stack.pop();
  }

  return stack.length == 0;
}
