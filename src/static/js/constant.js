// Colors
let BLACK    = 0;
let WHITE    = 255;
let CHARCOAL = 51;

// Frame rate parameters
const MIN_FRAME_RATE = 1;
const MAX_FRAME_RATE = 30;

// Canvas parameters
const MIN_CANVAS_WIDTH     = 200;
const MAX_CANVAS_WIDTH     = 1000;
const DEFAULT_CANVAS_WIDTH = MAX_CANVAS_WIDTH / 2;

// Grid parameters
const MIN_PATH_WIDTH     = Math.floor(0.01 * MAX_CANVAS_WIDTH);
const MAX_PATH_WIDTH     = Math.floor(0.10 * MAX_CANVAS_WIDTH);
const DEFAULT_PATH_WIDTH = Math.floor(0.05 * DEFAULT_CANVAS_WIDTH);

// All string messages
const strings = {

  GENERATE_BUTTON : 'Generate',
  SOLVE_BUTTON    : 'Solve',
  EXPORT_BUTTON   : 'Export'
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