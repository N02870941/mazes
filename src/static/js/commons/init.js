/**
 * (Re)initializes the grid.
 */
function init() {

  // Get configuration
  let config = trigger.initializing()

  // Create p5 canvas object
  canvas = createCanvas(
    config.width,
    config.height
  );

  // Assign canvas to inline html element
  canvas.parent(elements.canvas.MAIN);

  // Recreate the maze
  maze.create({
    rows : config.rows,
    cols : config.cols,
    wid  : config.pathW
  })

  // Get subtraction count from sliders
  subtractionsV = subtractions.vertical(config.walls.vertical);
  subtractionsH = subtractions.horizontal(config.walls.horizontal);


  stack.length = 0;

  current = maze.source();
}
