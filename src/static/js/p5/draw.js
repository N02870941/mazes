/**
 * Main event loop
 * that repeats forever.
 */
function draw() {

  if (action) {

    action = !action() ? action : callbacks.shift();
  }

}

//------------------------------------------------------------------------------

/**
 * Simulates runnning the draw() function,
 * but behind the scences. This way, we can
 * make several edits to the canvas, and then
 * display the result at the end rather than
 * painting one frame at a time.
 */
function execute() {

  let exit;

  while (action) {

    do {

      exit = action();

    } while (!exit);

    action = callbacks.shift();
  }

}
