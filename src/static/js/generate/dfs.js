/**
 * Random neighbors, standard pop() to dequeue.
 */
function dfs() {

  return make(Cell.randomNeighbor, (s) => s.pop());
}
