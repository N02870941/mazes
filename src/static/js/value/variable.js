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

// Keys for lookup in
// associative arrays
// of UI elements
const keys = {

  CANCEL     : 'cancel',
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
  SUBTRACT_H : 'horizontal',
  MESSAGE    : 'message',
  TITLE      : 'title',
  CONTENT    : 'content'
};

// Names of supported algorithms
const algorithms = {

  generator : {

    BFS     : 'bfs',
    DFS     : 'dfs',
    HYBRID  : 'hybrid',
    KRUSKAL : 'kruskal',
    PRIM    : 'prim',

    subtract : {

      VERTICAL   : 'vertical',
      HORIZONTAL : 'horizontal'
    }
  },

  solver : {

    BFS        : 'BFS',
    DFS        : 'DFS',
    A_STAR     : 'aStar',
    DIJKSTRA   : 'dijkstra',
    FOLLOWER_L : 'follower-left',
    FOLLOWER_R : 'follower-right'
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
const message    = [];
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
