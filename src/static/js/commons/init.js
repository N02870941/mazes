/**
 * (Re)initializes the grid.
 */
function init() {

  const width = sliders[keys.CANVAS].data(keys.SLIDER).getValue();
  const w     = sliders[keys.PATH].data(keys.SLIDER).getValue();

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
  cols = floor(width  / w);
  rows = floor(height / w);

  generated = false;
  solved    = false;

  // Reinit the grid array
  // and the vertex stack
  // and best path map
  stack.length = 0;
  grid.length  = 0;
  parents.clear();

  // Rows
  for (let j = 0; j < rows; j++) {

    // Cols
    for (let i = 0; i < cols; i++) {

      // New cell
      grid.push(new Cell(i, j, w));
    }
  }

  // TODO - Allow user to click on the cell
  // to specify source and target vertex
  source = grid[0];
  target = grid[grid.length - 1];

  // Start at source
  current = source;

  // Show each grid cell in white
  grid.forEach(c => c.clear());
}
