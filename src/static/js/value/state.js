// Used in maze traversal
const stack   = [];
const heap    = new Heap();
let queue;

// The main maze
const maze = Maze.getInstance();

let current;

// Canvas, images
let canvas;

const images = {

  maze     : undefined,
  solution : undefined
}

// Repeated action in draw()
// and main event loop
let action;
let callbacks = [];

// Number of walls to subtract
let subtractionsV;
let subtractionsH;
