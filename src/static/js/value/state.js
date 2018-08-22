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

const walk = {

  visits    : 0,
  length    : 0,
  algorithm : undefined
};

// Number of walls to subtract
let subtractionsV;
let subtractionsH;
