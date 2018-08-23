/**
 * Sleeps for a specified
 * number of milliseconds.
 */
async function sleep(ms) {

  return new Promise(resolve => setTimeout(resolve, abs(ms)));
}

//------------------------------------------------------------------------------

/**
 * Displays an alert dialog
 * with a specified message.
 */
function notify(msg) {

  bootbox.alert({
    message: msg,
    size: 'small'
  });

}

//------------------------------------------------------------------------------

/**
 * Displays a confirmation dialog with a specified
 * message, callback for yes, callback for no, and
 * an always callback that executes after regardless
 * of whether or not the user selected yes or no. Note,
 * all callbacks are optional.
 */
function confirm(msg, yes, no, always) {

  bootbox.confirm({

    message: msg || "MESSAGE",

    buttons: {

        confirm: {
            label: strings.YES,
            className: 'btn-success'
        },

        cancel: {
            label: strings.NO,
            className: 'btn-danger'
        }
    },

    // Function que ejecuta
    // despues de que se cierre
    // el dialogo
    callback: (result) => {

      // Si el usuario dijo que si
      if (result && yes) {

        yes();

      // Si dijo que no
      } else if (no) {

        no();
      }

      // No importa que dijo
      if (always) {

        always();
      }
    }
  });
}

//------------------------------------------------------------------------------

/**
 * Alerts the user that the
 * action attempting to be performed
 * cannot be done yet because the maze
 * is not generated or ready yet.
 */
function unprepared() {

  notify(strings.WAIT_FOR_MAZE);
}

//------------------------------------------------------------------------------

/**
 * Cancels any generating
 * or solving action and resets
 * grid to previous state.
 */
function cancel() {

  confirm(strings.CONFIRM_CANCEL, () => {

    let prev = action

    action    = null
    callbacks = []

    // Were we solving
    if (maze.solved || solver(prev)) {

      maze.forEach(c => c.clear());

      trigger.prepared();

      maze.solved = false;

    // Or generating
    } else {

      init();
    }

  });
}

//------------------------------------------------------------------------------

/**
 * Exports the maze as a download.
 */
function download() {

  // Do not export
  // if we are not ready
  if (!maze.generated) {

    unprepared();

    return;
  }

  // Save the maze
  save(images.maze, 'maze', 'png');

  if (maze.solved) {

    confirm(strings.DOWNLOAD_MSG, () => save(images.solution, 'maze-solution', 'png'));
  }

}

//------------------------------------------------------------------------------

/**
 * Determines if a function is
 * in a map by name.
 */
function funcInMap(func, map) {

  if (func && typeof func == 'function' && map) {

    return map[func.name] ? true : false;
  }

  return false;
}

//------------------------------------------------------------------------------

/**
 * Determines is a specified
 * function is calssified as
 * a generator algorithm.
 */
function generator(f) {

  return funcInMap(f, generators);
}

//------------------------------------------------------------------------------

/**
 * Determines is a specified
 * function is calssified as
 * a solver algorithm.
 */
function solver(f) {

  return funcInMap(f, solvers);
}

//------------------------------------------------------------------------------

/**
 * Determines is a specified
 * function is calssified as
 * a visualizer algorithm.
 */
function visualizer(f) {

  return funcInMap(f, visualizers);
}

//------------------------------------------------------------------------------

/**
 * Determines if a checkbox
 * is checked or not.
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
 * Determines if we want to animate
 * a particular action by checking the
 * value of the animate checkbox.
 */
function animated() {

  return checked(checkboxes[keys.ANIMATE]);
}

//------------------------------------------------------------------------------

/**
 * Returns the number of vertical
 * and horizontal wall subtractions
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
 * Starts an algorithm in either
 * animated mode or background mode.
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
 * Displays a message on screen
 * to notify the user the results
 * of an operation.
 */
function showMessage({title = '', content = ''}) {

  message[keys.TITLE].text(title)
  message[keys.CONTENT].text(content)

  return true;
}
