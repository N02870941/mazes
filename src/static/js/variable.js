// Colors
let BLACK    = 0;
let WHITE    = 255;

// Frame rate parameters
const MIN_FRAME_RATE = 1;
const MAX_FRAME_RATE = 30;

// Canvas parameters
const MIN_CANVAS_WIDTH     = 200;
const MAX_CANVAS_WIDTH     = 1000;
const DEFAULT_CANVAS_WIDTH = MAX_CANVAS_WIDTH;

// Grid parameters
const MIN_PATH_WIDTH     = Math.floor(0.01 * MAX_CANVAS_WIDTH);
const MAX_PATH_WIDTH     = Math.floor(0.10 * MAX_CANVAS_WIDTH);
// const DEFAULT_PATH_WIDTH = Math.floor(0.1 * DEFAULT_CANVAS_WIDTH);

const DEFAULT_PATH_WIDTH = Math.floor(0.05 * DEFAULT_CANVAS_WIDTH);

// const DEFAULT_PATH_WIDTH = Math.floor(0.01 * DEFAULT_CANVAS_WIDTH);

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
  FRAMES   : 'frame-rate'
};

// Jquery event strings
const events = {

  SLIDE : 'slide',
  CLICK : 'click'
};

// Numbers for top, bottom,
// right, and left walls for
// a given cell's wall array.
const T = 0;
const B = 3;
const R = 1;
const L = 2;

// Dimensions of grid
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
