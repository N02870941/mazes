/**
 * Sleeps for a specified
 * number of milliseconds.
 */
async function sleep(ms) {

  return new Promise(resolve => setTimeout(resolve, abs(ms)));
}

//------------------------------------------------------------------------------

/**
 * Return min value in array.
 */
function minimum(array) {

  let min = 0;

  let i = 0;

  while (i < array.length) {

    if (array[i] < array[min]) {

      min = i;
    }

    i++;
  }

  return min;
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
 * Triggers generating event.
 */
function generating() {

  // Disable appropriate buttons
  buttons[keys.SOLVE].trigger(events.GENERATING);
  buttons[keys.EXPORT].trigger(events.GENERATING);

  // Flag to false
  generated = false;

  // Get generator algorithm name
  let val = dropdowns[keys.GENERATE].val();

  // Return correct algorithm
  return generators[val];
}

//------------------------------------------------------------------------------

/**
 * Triggers solving event.
 */
function solving() {

  // Disable appropriate buttons
  buttons[keys.GENERATE].trigger(events.SOLVING);
  buttons[keys.EXPORT].trigger(events.SOLVING);

  // Flag to false
  solved = false;

  // Get solver algorithm name
  let val = dropdowns[keys.SOLVE].val();

  // Return correct algorithm
  return solvers[val];
}

//------------------------------------------------------------------------------

/**
 * Triggers generated event.
 */
function prepared() {

  generated = true;

  maze = canvas.get();

  noLoop();

  buttons[keys.GENERATE].trigger(events.GENERATED);
  buttons[keys.SOLVE].trigger(events.GENERATED);
  buttons[keys.EXPORT].trigger(events.GENERATED);

  return true;
}

//------------------------------------------------------------------------------

/**
 * Triggers solved event.
 */
function complete() {

  solved = true;

  solution = canvas.get();

  noLoop();

  buttons[keys.GENERATE].trigger(events.SOLVED);
  buttons[keys.EXPORT].trigger(events.SOLVED);

  return true;
}

//------------------------------------------------------------------------------

/**
 * Cancels any generating
 * or solving action and resets
 * grid to previous state.
 */
function cancel() {

  confirm(strings.CONFIRM_CANCEL, () => {

    const prev = action;

    action = null;

    // Were we solving
    if (solver(prev)) {

      grid.forEach(c => c.clear());

      prepared();

      solved = false;

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
  if (!generated) {

    unprepared();

    return;
  }

  // Save the maze
  save(maze, 'maze', 'png');

  if (solved) {

    confirm(strings.DOWNLOAD_MSG, () => save(solution, 'maze-solution', 'png'));
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

  vertical : () => {

    let number = sliders[keys.SUBTRACT_V].data(keys.SLIDER).getValue();

    return (number / 100) * walls.vertical.length;
  },

  horizontal : () => {

    let number = sliders[keys.SUBTRACT_H].data(keys.SLIDER).getValue();

    return (number / 100) * walls.horizontal.length;
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
 * Clears any highlighted
 * vertices from having
 * generated the maze.
 */
function clean() {

  grid.forEach(c => {

    c.clear();
  })

  return true;
}
