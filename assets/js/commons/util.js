/**
 * Sleeps for a specified number of milliseconds.
 */
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, abs(ms)));
}

//------------------------------------------------------------------------------

/**
 * Displays an alert dialog with a specified message.
 */
function notify(msg) {
  swal(msg, {
    buttons: {
      cancel: false,
      confirm: true,
    }
  })
}

//------------------------------------------------------------------------------

/**
 * Displays a confirmation dialog with a specified message, callback for yes, callback for no, and
 * an always callback that executes after regardless of whether or not the user selected yes or no. Note,
 * all callbacks are optional.
 */
function confirm(msg, yes, no, always) {
  swal({
    text: msg,
    buttons: {
      confirm: {
        text: "Yes",
        value: true,
        visible: true,
        className: "",
        closeModal: true
      },
      cancel: {
        text: "No",
        value: false,
        visible: true,
        className: "",
        closeModal: true,
      }

    }
  }).then(result => {
    if (result && yes) {
      yes();

    } else if (no) {
      no();
    }

    if (always) {
      always();
    }
  })
}

//------------------------------------------------------------------------------

/**
 * Alerts the user that the action attempting to be performed
 * cannot be done yet because the maze is not generated or ready yet.
 */
function unprepared() {
  notify(strings.WAIT_FOR_MAZE);
}

//------------------------------------------------------------------------------

/**
 * Cancels any generating or solving action and resets grid to previous state.
 */
function cancel() {
  confirm(strings.CONFIRM_CANCEL, () => {

    // Get previous action
    let prev = maze.action

    // Clear task queue
    maze.action = null
    maze.tasks  = []

    // Check what type of task we were executing before
    // being interrupted, if it was a solver, just clean the maze,
    // so all highlighting is gone
    if (maze.solved || solver(prev)) {
      maze.forEach(c => {
        c.clear()
      });

      trigger.prepared();

      maze.solved = false;

    // If it was not a solver, and we were generating, just completely reinitialize the maze
    } else {
      trigger.initializing()
    }
  });
}

//------------------------------------------------------------------------------

/**
 * Exports the maze as a download.
 */
function download() {

  // Do not export if we are not ready
  if (!maze.generated) {
    unprepared();
    return;
  }

  save(maze.images.maze, 'maze', 'png');

  if (maze.solved) {
    confirm(strings.DOWNLOAD_MSG, () => save(maze.images.solution, 'maze-solution', 'png'));
  }

}

//------------------------------------------------------------------------------

/**
 * Determines if a function is in a map by name.
 */
function funcInMap(func, map) {

  if (func && typeof func == 'function' && map) {

    return map[func.name] ? true : false;
  }

  return false;
}

//------------------------------------------------------------------------------

/**
 * Determines is a specified function is calssified as a generator algorithm.
 */
function generator(f) {
  return funcInMap(f, generators);
}

//------------------------------------------------------------------------------

/**
 * Determines is a specified function is calssified as a solver algorithm.
 */
function solver(f) {

  return funcInMap(f, solvers);
}

//------------------------------------------------------------------------------

/**
 * Determines is a specified function is calssified as a visualizer algorithm.
 */
function visualizer(f) {

  return funcInMap(f, visualizers);
}

//------------------------------------------------------------------------------

/**
 * Determines if a checkbox is checked or not.
 */
function checked(element) {
  return element.prop('checked');
}

//------------------------------------------------------------------------------

/**
 * Determines whether or not
 * we want to keep the maze
 * solution highlighted or not
 * by checking the highlighted
 * checkbox.
 */
function highlighted() {
  return checked(checkboxes[keys.HIGHLIGHT]);
}

//------------------------------------------------------------------------------

/**
 * Determines if we want to animate a particular action by checking the
 * value of the animate checkbox.
 */
function animated() {
  return checked(checkboxes[keys.ANIMATE]);
}

//------------------------------------------------------------------------------

/**
 * Determines if we are doing auto solve or not.
 */
function autosolve() {

  return checked(checkboxes[keys.AUTOSOLVE]);
}

//------------------------------------------------------------------------------

/**
 * Returns the number of vertical and horizontal wall subtractions
 * from the respective sliders.
 */
const subtractions = {
  vertical : (v) => {
    let number = sliders[keys.SUBTRACT_V].data(keys.SLIDER).getValue();

    return (number / 100) * v;
  },

  horizontal : (h) => {
    let number = sliders[keys.SUBTRACT_H].data(keys.SLIDER).getValue();

    return (number / 100) * h;
  }

}

//------------------------------------------------------------------------------

/**
 * Starts an algorithm in either animated mode or background mode.
 */
function start() {

  // Run in background
  if (!animated()) {

    execute();

  // Start draw() to animate
  } else {
    loop();
  }
}

//------------------------------------------------------------------------------

/**
 * Displays a message on screen to notify the user the results
 * of an operation.
 */
function showMessage({title = '', content = ''}) {
  message[keys.TITLE].text(title)
  message[keys.CONTENT].text(content)

  return true;
}

//------------------------------------------------------------------------------

function determinant(matrix) {
  let a = matrix[0][0]
  let b = matrix[1][0]
  let c = matrix[0][1]
  let d = matrix[1][1]

  return (a * d) - (b * c)
}
