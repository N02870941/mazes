/**
 * Main loop that repeats forever
 */
function draw() {

  background(CHARCOAL);

  for (let i = 0; i < grid.length; i++) {

    grid[i].show();
  }

  current.visited = true;
  current.highlight();

  let next = current.checkNeighbors();

  if (next) {

    next.visited = true;

    stack.push(current);

    removeWalls(current, next);

    current = next;

  } else if (stack.length > 0) {

    current = stack.pop();
  }

}
