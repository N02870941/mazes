/**
 * Random neighbors, standard removeFirst() to dequeue.
 */
function bfs() {

  return make(Cell.randomNeighbor, (s) => s.shift());
}
