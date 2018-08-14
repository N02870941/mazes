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

  buttons[keys.SOLVE].trigger(events.GENERATING);
  buttons[keys.EXPORT].trigger(events.GENERATING);
}

//------------------------------------------------------------------------------

function prepared() {

  maze = canvas.get();

  buttons[keys.GENERATE].trigger(events.GENERATED);
  buttons[keys.SOLVE].trigger(events.GENERATED);
  buttons[keys.EXPORT].trigger(events.GENERATED);
}

//------------------------------------------------------------------------------

function solving() {

  buttons[keys.GENERATE].trigger(events.SOLVING);
  buttons[keys.EXPORT].trigger(events.SOLVING);
}

//------------------------------------------------------------------------------

function complete() {

  buttons[keys.GENERATE].trigger(events.SOLVED);
  buttons[keys.EXPORT].trigger(events.SOLVED);
}

//------------------------------------------------------------------------------

function cancel() {

  confirm(strings.CONFIRM_CANCEL, () => {

    const prev = action;

    action = null;

    // Were we solving
    if (prev === aStar) {

      grid.forEach(c => c.clear());

      prepared();

      solved = false;

    // Or generating
    } else {

      init();
    }

  });
}
