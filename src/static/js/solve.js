/**
 * Solves the maze
 */
function solve() {

  if (generated && action !== aStar) {

    action = aStar;

    grid.forEach(c => c.visited = false);

    current = grid[0];

    loop();

  } else if (action === aStar && !solved) {

    notify("Please wait for the maze to be completely solved");

  } else if (action === aStar && solved) {

    notify("The maze is already solved");

  } else {

    unprepared()
  }

}

//------------------------------------------------------------------------------

function aStar() {

  grid.forEach(c => c.show());

  current.visited = true;

  current.highlight();

  let next = current.checkNeighbors();

  if (next) {

    next.visited = true;

    stack.push(current);

    current = next;

  } else if (stack.length > 0) {

    current = stack.pop();
  }

  return stack.length == 0;
}
