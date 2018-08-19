/**
 * Iteratively highlights the solution
 * path going backwards from finish to start
 * using the parents lookup table.
 */
function highlight() {

  let stop = true;

  // Highlight current vertex
  current.shade();

  // Get previous vertex
  current = parents.get(current.key);

  // If one came back
  if (current) {

    // Return false to indicate
    // we still have more vertices
    // in our path to highlight
    stop = false;
  }

  return stop;
}
