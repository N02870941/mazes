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

  // We need this boolean flag to
  // let the always function know we just started
  // solving but we need to wait until it finished
  let solving;

  let yes = () => {

    solving = true;

    if (!solved) {

      solve();
    }

  };

  let no = () => {

    // Nothing to do
  };

  let always = async () => {

    if (solved == true) {

      solving = false;
    }

    if (solving) {

      return;
    }

    // Allow the dialog to go away
    await sleep(1000);

    saveCanvas(canvas, 'maze', 'png');
  };

  confirm(strings.DOWNLOAD_MSG, yes, no, always);
}
