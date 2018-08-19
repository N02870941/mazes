function dijkstra() {

  let u = queue.pop();

  if (Cell.equals(target, u)) {

    current = u;

    return true;
  }

  let neighbors = u.x();

  neighbors.forEach( v => {

    let cost = u.cost + 1;

    if (cost < v.cost) {

      v.gradient();

      v.cost = cost;

      parents.set(v.key, u);

      queue.push(v);
    }

  });

  return queue.empty();
}
