// TODO - https://stackoverflow.com/questions/39711941/p5-js-manually-call-setup-and-draw
// TODO - https://mobiforge.com/design-development/html5-mobile-web-canvas

/**
 * Initial one time setup.
 */
function setup() {

  // Sliders
  parameters();

  // Buttons
  actions();

  // Grid
  init();

  // Stop p5 main event loop
  noLoop();
}

//------------------------------------------------------------------------------

/**
 * Sets up P5 canvas on the page.
 */
function page(dimension) {

  // Create p5 canvas object
  canvas = createCanvas(

    dimension,
    dimension
  );

  // Assign canvas to inline html element
  canvas.parent(elements.canvas.MAIN);
}

//------------------------------------------------------------------------------

/**
 * Set up event listeners for sliders.
 */
function parameters() {

  const SET_ATTRIBUTE = 'setAttribute';

  let path = () => {

    let curr = sliders[keys.CANVAS].data(keys.SLIDER).getValue();

    // Update path width boundaries
    let lo = Math.max(MIN_PATH_WIDTH, Math.floor(0.01 * curr));
    let hi = Math.min(MAX_PATH_WIDTH, Math.floor(0.20 * curr));

    // Set min and max for path width
    sliders[keys.PATH].slider(SET_ATTRIBUTE, attributes.MIN, lo)
    sliders[keys.PATH].slider(SET_ATTRIBUTE, attributes.MAX, hi)
    sliders[keys.PATH].slider(SET_ATTRIBUTE, Math.floor(1.5 * lo));
    sliders[keys.PATH].slider(events.REFRESH);
  }

  // The sliders
  sliders[keys.CANVAS] = $(elements.slider.CANVAS).slider();
  sliders[keys.PATH]   = $(elements.slider.PATH).slider();
  sliders[keys.FRAMES] = $(elements.slider.FRAMES).slider();

  // The labels
  labels[keys.CANVAS] = $(elements.label.CANVAS_W);
  labels[keys.WIDTH]  = $(elements.label.CANVAS_W);
  labels[keys.HEIGHT] = $(elements.label.CANVAS_H);
  labels[keys.PATH]   = $(elements.label.PATH);
  labels[keys.FRAMES] = $(elements.label.FRAMES);

  // Set min and max width for canvas width
  sliders[keys.CANVAS].slider(SET_ATTRIBUTE, attributes.MIN, MIN_CANVAS_WIDTH)
  sliders[keys.CANVAS].slider(SET_ATTRIBUTE, attributes.MAX, MAX_CANVAS_WIDTH)
  sliders[keys.CANVAS].slider(SET_ATTRIBUTE, attributes.VALUE, Math.floor(1.5 * MIN_CANVAS_WIDTH));
  sliders[keys.CANVAS].slider(events.REFRESH);

  path();

  // Canvas width slider event
  sliders[keys.CANVAS].on(events.SLIDE, (e) => {

    // Update label
    labels[keys.WIDTH].text(e.value);
    labels[keys.HEIGHT].text(e.value);

    path();
  });

  // Path width slider event
  sliders[keys.PATH].on(events.SLIDE, (e) => {

    labels[keys.PATH].text(e.value);
  });

  // Frame rate slider event
  sliders[keys.FRAMES].on(events.SLIDE, (e) => {

    let x = abs(int(e.value));

    frameRate(x);

    labels[keys.FRAMES].text(e.value)
  });

  let t = sliders[keys.CANVAS].data(keys.SLIDER).getValue();
  let v = sliders[keys.PATH].data(keys.SLIDER).getValue();

  // Set initial values
  labels[keys.WIDTH].text(t);
  labels[keys.HEIGHT].text(t);
  labels[keys.PATH].text(v);
}

//------------------------------------------------------------------------------

/**
 * Set up event listeners for buttons.
 */
function actions() {

  // The buttons
  buttons[keys.GENERATE] = $(elements.button.GENERATE);
  buttons[keys.SOLVE]    = $(elements.button.SOLVE);
  buttons[keys.EXPORT]   = $(elements.button.EXPORT);

  // Setup click events for buttons
  buttons[keys.GENERATE].click(generate);
  buttons[keys.SOLVE].click(solve);
  buttons[keys.EXPORT].click(download);
}

//------------------------------------------------------------------------------

/**
 * (Re)initializes the grid.
 */
function init() {

  let width = sliders[keys.CANVAS].data(keys.SLIDER).getValue()
  let w     = sliders[keys.PATH].data(keys.SLIDER).getValue();

  // Canvas
  page(width);

  // Compute dimension of grid
  cols = floor(width  / w);
  rows = floor(height / w);

  generated = false;
  solved    = false;

  // Reinit the grid array
  // and the vertex stack
  stack = [];
  grid  = [];

  // Pre-compute heuristic matrix
  costs = heuristics(rows, cols, w);

  // Start at first cell
  current = grid[0];

  // Start p5 main event loop
  loop();
}

//------------------------------------------------------------------------------

/**
 * Pre-computes matrix of heuristics
 * for later use in A* search algorithm.
 */
function heuristics(r, c, w) {

  let last;
  let h;

  // Create (heuristic) cost matrix
  last = new Cell(r - 1, c - 1);
  h    = new Array(r);

  // Rows
  for (let j = 0; j < r; j++) {

    // Make a new row
    h[j] = new Array(c);

    // Cols
    for (let i = 0; i < c; i++) {

      // New cell
      grid.push(new Cell(i, j, w));

      // Compute heuristic using euclidian distance
      h[j][i] = Cell.euclidian(grid[grid.length - 1], last);
    }
  }

  return h;
}
