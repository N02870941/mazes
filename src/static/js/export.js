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

    confirm(strings.DOWNLOAD_MSG, () => save(canvas, 'maze-solution', 'png'));

  } else {

    
  }

}
