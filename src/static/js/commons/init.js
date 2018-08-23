/**
 * (Re)initializes the grid.
 */
function init() {

  // Show default message
  showMessage({content : strings.DEFAULT_MESSAGE, title : strings.DEFAULT_TITLE});

  // TODO - Abstract to function in util.js
  const width = sliders[keys.CANVAS].data(keys.SLIDER).getValue();
  const w     = sliders[keys.PATH].data(keys.SLIDER).getValue();

  // TODO - Abstract to function in util.js
  buttons[keys.GENERATE].prop(attributes.DISABLED, false);
  buttons[keys.SOLVE].prop(attributes.DISABLED, true);
  buttons[keys.EXPORT].prop(attributes.DISABLED, true);


  // TODO - Allow non-square mazes?

  // Create p5 canvas object
  canvas = createCanvas(
    width,
    width
  );

  // Assign canvas to inline html element
  canvas.parent(elements.canvas.MAIN);

  // Compute dimension of grid
  let cols = floor(width  / w);
  let rows = floor(height / w);

  // Get the number of walls
  let v = rows * (cols - 1)
  let h = cols * (rows - 1)

  // Recreate the maze
  maze.create({rows:rows, cols:cols, wid:w})

  // Get subtraction count from sliders
  subtractionsV = subtractions.vertical(v);
  subtractionsH = subtractions.horizontal(h);

  // Reinit the grid array
  // and the vertex stack
  // and best path map
  stack.length = 0;

  // TODO - Allow user to click on the cell
  // to specify source and target vertex
  // Start at source
  current = maze.source();

  maze.forEach(c => c.clear())
}
