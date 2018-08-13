// Colors
let BLACK    = 0;
let WHITE    = 255;

// Frame rate parameters
const MIN_FRAME_RATE = 1;
const MAX_FRAME_RATE = 60;

// Canvas parameters
const MIN_CANVAS_WIDTH = 200;
const MAX_CANVAS_WIDTH = 1000;

// Grid parameters
const MIN_PATH_WIDTH = Math.floor(0.01 * MAX_CANVAS_WIDTH);
const MAX_PATH_WIDTH = Math.floor(0.05 * MAX_CANVAS_WIDTH);

// All string messages
const strings = {

  GENERATE_BUTTON : 'Generate',
  SOLVE_BUTTON    : 'Solve',
  EXPORT_BUTTON   : 'Export',
  DOWNLOAD_MSG    : 'Would you like to download the solution as well?',
  WAIT_FOR_MAZE   : 'Please wait until the maze is fully generated.',
  WAIT_TO_SOLVE   : 'Please wait util the maze is be fully solved',
  ALREADY_SOLVED  : 'The maze it already solved',
  YES             : 'Yes',
  NO              : 'No'
};

// Keys for lookup in
// associative arrays
// of UI elements
const keys = {

  CANVAS   : 'canvas',
  PATH     : 'path',
  WIDTH    : 'width',
  HEIGHT   : 'height',
  GENERATE : 'generate',
  SOLVE    : 'solve',
  EXPORT   : 'export',
  FRAMES   : 'frame-rate',
  SLIDER   : 'slider'
};

// UI element ids
const elements = {

  button : {

    GENERATE : '#button-generate',
    SOLVE    : '#button-solve',
    EXPORT   : '#button-export'

  },

  slider : {

    CANVAS : '#canvas-width-slider',
    PATH   : '#path-width-slider',
    FRAMES : '#frame-rate-slider'
  },

  label : {

    CANVAS_W : '#canvas-width-slider-value',
    CANVAS_H : '#canvas-height-slider-value',
    PATH     : '#path-width-slider-value',
    FRAMES   : '#frame-rate-slider-value'
  },

  canvas : {

    MAIN : 'sketch-holder'
  }
};

// HTML element attributes
const attributes = {

  MIN   : 'min',
  MAX   : 'max',
  VALUE : 'value'

};

// Jquery event strings
const events = {

  SLIDE   : 'slide',
  CLICK   : 'click',
  REFRESH : 'refresh'
};

// Numbers for top, bottom,
// right, and left walls for
// a given cell's wall array.
const TOP    = 0;
const RIGHT  = 1;
const BOTTOM = 2;
const LEFT   = 3;

// Dimensions of grid
let cols;
let rows;
let current;

// UI element
// associative arrays
let buttons = [];
let sliders = [];
let labels  = [];

// Canvas, images
let canvas;
let maze;
let solution;

//
let grid;
let stack;

// Boolean flags
let generated = false;
let solved    = false;
let first     = true;

// Matrix of heuristic
let costs;

// Repeated action in draw()
// and main event loop
let action;
