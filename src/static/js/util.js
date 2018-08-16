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

function prepared() {

  maze = canvas.get();

  noLoop();

  buttons[keys.GENERATE].trigger(events.GENERATED);
  buttons[keys.SOLVE].trigger(events.GENERATED);
  buttons[keys.EXPORT].trigger(events.GENERATED);
}

//------------------------------------------------------------------------------

function complete() {

  solution = canvas.get();

  buttons[keys.GENERATE].trigger(events.SOLVED);
  buttons[keys.EXPORT].trigger(events.SOLVED);
}

//------------------------------------------------------------------------------

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

function funcInMap(func, map) {

  if (func && typeof func == 'function' && map) {

    return map[func.name] ? true : false;
  }

  return false;
}

//------------------------------------------------------------------------------

function generator(f) {

  return funcInMap(f, generators);
}

//------------------------------------------------------------------------------

function solver(f) {

  return funcInMap(f, solvers);
}

//------------------------------------------------------------------------------

function visualizer(f) {

  return funcInMap(f, visualizers);
}

//------------------------------------------------------------------------------

function checked(element) {

  return element.prop('checked');
}

//------------------------------------------------------------------------------

function highlighted() {

  return checked(checkboxes[keys.HIGHLIGHT]);
}

//------------------------------------------------------------------------------

function animated() {

  return checked(checkboxes[keys.ANIMATE]);
}
