let cols;
let rows;
let current;

// UI element
// associative arrays
let buttons = [];
let sliders = [];
let labels  = [];

// Main canvas
let canvas;

let w     = DEFAULT_PATH_WIDTH;
let grid  = [];
let stack = [];

//------------------------------------------------------------------------------

/**
 * Initial one time setup.
 */
function setup() {

  // Get references to UI elements

  // The sliders
  sliders[keys.CANVAS] = $("#canvas-width-slider").slider();
  sliders[keys.PATH]   = $("#path-width-slider").slider();

  // The buttons
  buttons[keys.GENERATE] = $('#button-generate');
  buttons[keys.SOLVE]    = $('#button-solve');
  buttons[keys.EXPORT]   = $('#button-export');

  // The labels
  labels[keys.CANVAS] = $("#canvas-width-slider-value");
  labels[keys.WIDTH]  = $("#canvas-height-slider-value");
  labels[keys.HEIGHT] = $("#canvas-width-slider-value");
  labels[keys.PATH]   = $("#path-width-slider-value");

  // Add functionality to UI elements

  // Setup the canvas width sliders
  sliders[keys.CANVAS].on(events.SLIDE, (e) => {

    labels[keys.WIDTH].text(e.value);
    labels[keys.HEIGHT].text(e.value);
  });

  // Setup the path width slider
  sliders[keys.PATH].on(events.SLIDE, (e) => {

    labels[keys.PATH].text(e.value)
  });

  // Setup generate, solve, and export buttons
  buttons[keys.GENERATE].click(generate);
  buttons[keys.SOLVE].click(solve);
  buttons[keys.EXPORT].click(download);

  // Initialize the canvas

  // Create p5 canvas object
  canvas = createCanvas(

    DEFAULT_CANVAS_WIDTH,
    DEFAULT_CANVAS_WIDTH
  );

  // Assign to inline html element
  canvas.parent('sketch-holder');

  // Compute dimension of grid
  cols = floor(width / w);
  rows = floor(height / w);

  // frameRate(10);

  init();

  current = grid[0];
}

//------------------------------------------------------------------------------

/**
 * Initializes the grid
 */
function init() {

  for (let j = 0; j < rows; j++) {

    for (let i = 0; i < cols; i++) {

      grid.push(new Cell(i, j));
    }
  }

}
