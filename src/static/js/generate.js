/**
 * Generates the maze.
 */
function generate() {

  console.log('generating')
}

//------------------------------------------------------------------------------

function removeWalls(a, b) {

  const left   = 0;
  const right  = 1;
  const top    = 2;
  const bottom = 3;

  let x = a.i - b.i;
  let y = a.j - b.j;

  if (x === 1) {

    a.walls[3] = false;
    b.walls[1] = false;

  } else if (x === -1) {

    a.walls[1] = false;
    b.walls[3] = false;
  }

  if (y === 1) {

    a.walls[0] = false;
    b.walls[2] = false;

  } else if (y === -1) {

    a.walls[2] = false;
    b.walls[0] = false;
  }
}
