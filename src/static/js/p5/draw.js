/**
 * Main event loop that repeats forever.
 * We keep calling the action function until
 * it returns true. When it returns true, we
 * dequeue the next action from the callback queue,
 * set that to the main action and continue looping.
 * This way we can "chain" a sequence of actions
 * by simply specifying the callback array as a list
 * of functions that we would like to execute in
 * a specific order.
 *
 * Once the callback array is empty, it will
 * return undefined, and the main loop will
 * stop calling action(), and draw() will also stop
 * executing.
 */
function draw() {

  // Stop draw() to avoid infinite
  // loop and resource leaks
  if (!action) {

    noLoop()

  // Call action(), if it
  // returns true, get the next
  // action from queue, otherwise,
  // just keep repeating
  } else if (action()) {

    action = callbacks.shift();
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
