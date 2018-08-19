/**
 * Random neighbors, half removeFirst()
 * half removeLast() to dequeue. Provides
 * decent branching factor without too
 * many rivers.
 */
function hybrid() {

  return make(Cell.randomNeighbor, (s) => {

    let n = floor(random(1, 101));

    if (n % 2 === 0)
      return s.shift();

    else
      return s.pop();

  });

}
