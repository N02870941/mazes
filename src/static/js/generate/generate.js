/**
 * Generates the maze.
 */
function generate() {

  // Fire generating event
  let algorithm = generating();

  // Change main event loop
  // action to specified algorithm
  action    = algorithm;
  callbacks = [subtract.vertical, subtract.horizontal, clean, prepared];

  // Initialize the grid
  init();

  // Start the process
  start();
}
