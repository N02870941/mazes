/**
 * Generates the maze.
 */
function generate() {

  // Fire generating event
  let algorithm = generating();

  // Change main event
  // loop algorithm to
  // the specified generator
  action = algorithm;

  // List of callbacks
  callbacks = [
    loadFunda,
    subtract.vertical,
    loadFunda,
    subtract.horizontal,
    clean,
    prepared
  ];

  // Initialize the grid
  init();

  // Start the process
  start();
}

//------------------------------------------------------------------------------

/**
 * Create a new funda, mark all
 * nodes as unvisited, and add them
 * to the funda.
 */
function loadFunda() {

  queue = new Funda()

  grid.forEach(c => {

    c.visited = false

    queue.push(c)
  })

  return true
}
