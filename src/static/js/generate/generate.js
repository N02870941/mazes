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

    // Start animating
    } else {

      loop();
    }

  }

}

//------------------------------------------------------------------------------

/**
 * This function is used as a callback
 * for when the maze is generated. It
 * fires the 'generated' event, and makes
 * a few changes to the maze so that the starting
 * point and end point are more noticeable.
 */
function postGenerate() {

  for (let i = 0; i < 1000; i++) {

    let x = floor(random(0, grid.length-1))
    let y = x + 1

    Cell.pave(grid[x], grid[y])
  }

  // Trigger generated event
  prepared();

}
