function DFS() {

  let u = queue.pop();

  if (Cell.equals(u, target)) {

    current = u;

    return true;
  }
  
  if (!u.visited) {

    u.visited = true

    let neighbors = u.x();

    neighbors.forEach( v => {

      if (!parents.has(v.key)) {

        v.gradient();

        parents.set(v.key, u)

        queue.push(v);
      }

    });
  }

  return queue.length === 0;
}
