/**
 * Main event loop
 * that repeats forever.
 */
function draw() {

  // Are we generating?
  if (generator(action)) {

    // Are we done?
    if (generated) {

      callback();

    // In progress
    } else {

      generated = action();
    }

  // Are we solving?
  } else if (solver(action)) {

    // If done, switch to animate action
    action = !action() ? action : callback;

  // Are we highlighting? Keep going, until done.
  } else if (visualizer(action) && action()) {

    complete();
  }

}

//------------------------------------------------------------------------------

/**
 * Executes loop behind the scenes.
 * The first argument is a function with
 * zero arguments. It returns true when
 * it has met it's base case / exit condition.
 * otherwise it continues to return false.
 *
 * The second function after() is an optional
 * callback function that executes after the
 * procedure has run it's course. after() does
 * not return anything.
 */
function execute(procedure, after) {

  let exit;

  let c = 0;

  do {

    c++;

    exit = procedure();

  } while (!exit);

  // Debug, prints path length
  if (procedure === highlight) {
    console.log(c)
  }

  if (after)
    after();
}
