/**
 * Exports the maze as a download.
 */
function download() {

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

    if (!generated) {

        notify("Please generate a maze or wait until the current one is complete.");

        return;
    }

    // Allow the dialog to go away
    await sleep(1000);

    saveCanvas(canvas, 'maze', 'png');
  };

  confirm("Would you like to download the solution as well?", yes, no, always);

}
