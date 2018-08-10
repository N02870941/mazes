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
            label: 'Yes',
            className: 'btn-success'
        },

        cancel: {
            label: 'No',
            className: 'btn-danger'
        }
    },

    callback: (result) => {

        if (result && yes) {

          yes();

        } else if (no) {

          no();
        }

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
