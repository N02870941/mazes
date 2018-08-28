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
  if (!maze.action) {

    noLoop()

  // Call action(), if it
  // returns true, get the next
  // action from queue, and jump
  // back to the top. Otherwise,
  // just keep repeating action()
  } else if (maze.action() !== false) {

    maze.action = maze.tasks.shift();
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

  let done;

  // While there is an
  // action to execute
  // run it until it returns
  // true. Once it returns true,
  // dequeue the next action and
  // jump back to the top. When
  // the callback queue becomes
  // empty we action will be
  // undefined (falsy), and we
  // will drop out of the outer loop
  // and all tasks will be complete.
  while (maze.action) {

    do {

      done = maze.action();

    } while (done === false);

    maze.action = maze.tasks.shift();
  }

  return true
}
