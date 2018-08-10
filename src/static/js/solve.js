/**
 * Solves the maze
 */
function solve() {

  if (generated) {

    aStar();

  } else {

    notify("Please wait until the maze is fully generated.");

    return false;
  }

}

//------------------------------------------------------------------------------

function aStar() {

  solved = true;

  console.log("SOLVING");

  return true;
}
