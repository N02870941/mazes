/*
 * This file holds all constant and variable
 * values that reflect the 'state' of the application.
 * No global value should be declared outside of this
 * file. They should all be local to functions.
 */

// Colors
const BLACK = 0;
const LINE_WIDTH = 2;

// Frame rate parameters
const MIN_FRAME_RATE = 1;
const MAX_FRAME_RATE = 60;

// Canvas parameters
const MIN_CANVAS_WIDTH     = 100;
const MAX_CANVAS_WIDTH     = 3000;
const DEFAULT_CANVAS_WIDTH = 300;

// Grid parameters
const MIN_PATH_WIDTH     = 10;
const MAX_PATH_WIDTH     = 50;
const DEFAULT_PATH_WIDTH = MIN_PATH_WIDTH;

// All string messages
const strings = {

  GENERATE_BUTTON : 'Generate',
  SOLVE_BUTTON    : 'Solve',
  EXPORT_BUTTON   : 'Export',
  DOWNLOAD_MSG    : 'Would you like to download the solution as well?',
  WAIT_FOR_MAZE   : 'Please wait until the maze is fully generated.',
  WAIT_TO_SOLVE   : 'Please wait util the maze is be fully solved',
  ALREADY_SOLVED  : 'The maze it already solved',
  CONFIRM_CANCEL  : 'Are you sure you want to cancel?',
  YES             : 'Yes',
  NO              : 'No'
};

// Keys for lookup in
// associative arrays
// of UI elements
const keys = {

  CANVAS     : 'canvas',
  PATH       : 'path',
  WIDTH      : 'width',
  HEIGHT     : 'height',
  GENERATE   : 'generate',
  SOLVE      : 'solve',
  EXPORT     : 'export',
  FRAMES     : 'frame-rate',
  SLIDER     : 'slider',
  HIGHLIGHT  : 'highlight',
  ANIMATE    : 'animate',
  SUBTRACT_V : 'vertical',
  SUBTRACT_H : 'horizontal'
};

// UI element selector ids
// Most of them are Jquery selectors
// so they are preceded by a # symbol
const elements = {

  dropdown : {

    GENERATE : '#dropdown-generator',
    SOLVE    : '#dropdown-solver'
  },

  button : {

    GENERATE : '#button-generate',
    SOLVE    : '#button-solve',
    EXPORT   : '#button-export',
    CANCEL   : '#button-cancel'
  },

  slider : {

    CANVAS     : '#canvas-width-slider',
    PATH       : '#path-width-slider',
    FRAMES     : '#frame-rate-slider',
    SUBTRACT_V : '#vertical-wall-slider',
    SUBTRACT_H : '#horizontal-wall-slider'
  },

  label : {

    CANVAS_W   : '#canvas-width-slider-value',
    CANVAS_H   : '#canvas-height-slider-value',
    PATH       : '#path-width-slider-value',
    FRAMES     : '#frame-rate-slider-value',
    SUBTRACT_V : '#vertical-wall-slider-value',
    SUBTRACT_H : '#horizontal-wall-slider-value'
  },

  checkbox : {

    HIGHLIGHT : '#checkbox-highlight-visited',
    ANIMATE   : '#checkbox-animate'
  },

  canvas : {

    // NOTE - Not a Jquery selector
    // so there is purposely no # symbol
    MAIN : 'sketch-holder'
  }
};

// HTML element attributes / states
const attributes = {

  MIN      : 'min',
  MAX      : 'max',
  VALUE    : 'value',
  DISABLED : 'disabled'
};

// Jquery event strings
const events = {

  SLIDE      : 'slide',
  CLICK      : 'click',
  REFRESH    : 'refresh',
  GENERATED  : 'generated',
  GENERATING : 'generating',
  SOLVED     : 'solved',
  SOLVING    : 'solving'
};

// Names of supported algorithms
const algorithms = {

  generator : {

    BFS    : 'bfs',
    DFS    : 'dfs',
    HYBRID : 'hybrid',

    subtract : {

      VERTICAL   : 'vertical',
      HORIZONTAL : 'horizontal'
    }
  },

  solver : {

    BFS      : 'BFS',
    DFS      : 'DFS',
    A_STAR   : 'aStar',
    DIJKSTRA : 'dijkstra'
  },

  visualizer : {

    HIGHLIGHT : 'highlight'
  }

};

// Numbers for top, bottom,
// right, and left walls for
// a given cell's wall array.
const TOP    = 0;
const RIGHT  = 1;
const BOTTOM = 2;
const LEFT   = 3;

// Bitmasks for setting
// and unsetting boolean flags
// for cell walls
const masks = {

  set : {

    TOP    : 0b1000,
    RIGHT  : 0b0100,
    BOTTOM : 0b0010,
    LEFT   : 0b0001
  },

  unset : {

    TOP    : 0b0111,
    RIGHT  : 0b1011,
    BOTTOM : 0b1101,
    LEFT   : 0b1110
  }

};

// UI element
// associative arrays
const buttons    = [];
const sliders    = [];
const labels     = [];
const dropdowns  = [];
const checkboxes = [];

// Arrays of functions
// used for generating,
// solving, and visualizing
const solvers     = [];
const generators  = [];
const visualizers = [];

// Used in graph traversal
const grid    = [];
const stack   = [];
const parents = new Map();
const heap    = new Heap();
let queue;

// Dimensions of grid
let cols;
let rows;
let current;
let source;
let target;

// Canvas, images
let canvas;
let maze;

// Boolean flags
let generated = false;
let solved    = false;

// Repeated action in draw()
// and main event loop
let action;
let callbacks = [];

// Numbers of walls in maze
const walls = {

  vertical   : 0,
  horizontal : 0,
};

// Number of walls to subtract
let subtractionsV;
let subtractionsH;
