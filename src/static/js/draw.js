/**
 * Main event loop that repeats forever.
 */
async function draw() {

  // Just show the grid
  if (first) {

    grid.forEach( c => c.show());

    return;
  }

  // Are we generating?
  if (action === dfs) {

    // Are we done?
    if (generated) {

      // Get the start and end cells
      let first = grid[0];
      let last  = grid[grid.length - 1];

      // Remove the left and right
      // walls respectively
      first.walls[3] = false
      last.walls[1]  = false;

      // Re-paint to screen
      first.show();
      last.show();

    // In progress
    } else {

      generated = action();
    }

  // Are we solving?
  } else {

    // Not done
    if (!solved) {

      solved = action();

    // Solved
    } else {

      // NOTE - What to do?
    }

  }

}
