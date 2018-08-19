// TODO - http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
// TODO - http://theory.stanford.edu/~amitp/GameProgramming/index.html

function aStar() {

  let u = queue.pop();

  if (Cell.equals(target, u)) {

    current = u;

    return true;
  }

  u.visited = true;

  let neighbors = u.x();

  neighbors.forEach( v => {

    if (v.visited) {
      return;
    }

    let cost = u.cost + 1;

    if (cost < v.cost) {

      v.gradient();

      v.cost = cost;

      v.heuristic = cost + Cell.euclidian(v, target);

      parents.set(v.key, u);

      queue.push(v);
    }

  });

  return queue.empty();
}

//------------------------------------------------------------------------------

/**
 * Selects unvisited adjacent
 * vertices based on minimum
 * heuristic for A* algorithm.
 */
function closest(cell) {

  return next(
    cell,
    Cell.manhattan,
    (neighbors, distances) => neighbors[minimum(distances)]
  );
}
