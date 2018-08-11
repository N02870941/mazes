

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

  // Canvas
  page();

  // Grid
  init();

  // Stop animating
  noLoop();
}

//------------------------------------------------------------------------------

function page() {

  // Create p5 canvas object
  canvas = createCanvas(

    DEFAULT_CANVAS_WIDTH,
    DEFAULT_CANVAS_WIDTH
  );

  // Assign to inline html element
  canvas.parent('sketch-holder');
}

//------------------------------------------------------------------------------

function parameters() {

  // The sliders
  sliders[keys.CANVAS] = $("#canvas-width-slider").slider();
  sliders[keys.PATH]   = $("#path-width-slider").slider();
  sliders[keys.FRAMES] = $("#frame-rate-slider").slider();

  // The labels
  labels[keys.CANVAS] = $("#canvas-width-slider-value");
  labels[keys.WIDTH]  = $("#canvas-height-slider-value");
  labels[keys.HEIGHT] = $("#canvas-width-slider-value");
  labels[keys.PATH]   = $("#path-width-slider-value");
  labels[keys.FRAMES] = $("#frame-rate-slider-value");

  // Canvas width slider event
  sliders[keys.CANVAS].on(events.SLIDE, (e) => {

    labels[keys.WIDTH].text(e.value);
    labels[keys.HEIGHT].text(e.value);
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
}

//------------------------------------------------------------------------------

function actions() {

  // The buttons
  buttons[keys.GENERATE] = $('#button-generate');
  buttons[keys.SOLVE]    = $('#button-solve');
  buttons[keys.EXPORT]   = $('#button-export');

  // Setup click events for buttons
  buttons[keys.GENERATE].click(generate);
  buttons[keys.SOLVE].click(solve);
  buttons[keys.EXPORT].click(download);
}

//------------------------------------------------------------------------------

/**
 * Initializes the grid
 */
function init() {

  // Compute dimension of grid
  cols = floor(width  / w);
  rows = floor(height / w);

  generated = false;
  solved    = false;

  // Reinit the grid
  // and the vertex stack
  stack = [];
  grid  = [];

  // Pre-compute heuristic matrix
  costs = heuristics(rows, cols);

  // Start at first cell
  current = grid[0];

  loop();
}

//------------------------------------------------------------------------------

/**
 * Pre-computes matrix of heuristics
 * for later use in A* search algorithm.
 */
function heuristics(r, c) {

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
      grid.push(new Cell(i, j));

      // Compute heuristic using euclidian distance
      h[j][i] = Cell.euclidian(grid[grid.length - 1], last);
    }
  }

  return h;
}
