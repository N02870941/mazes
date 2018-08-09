let cols;
let rows;
let current;

let w     = DEFAULT_PATH_WIDTH;
let grid  = [];
let stack = [];

let generateButton;
let solveButton;
let canvasWidthSlider = $("#canvas-width-slider").slider();
let pathWidthSlider   = $("#path-width-slider").slider();
let canvas;


$("#canvas-width-slider").on("slide", (e) => $("#canvas-width-slider-value").text(e.value));
$("#path-width-slider").on("slide", (e) => $("#path-width-slider-value").text(e.value));

//------------------------------------------------------------------------------

/**
 * Initial one time setup.
 */
function setup() {

  // Create the canvas
  canvas = createCanvas(
    DEFAULT_CANVAS_WIDTH,
    DEFAULT_CANVAS_WIDTH
  );

  // Assing to inline <div> element
  canvas.parent('sketch-holder');

  cols = floor(width / w);
  rows = floor(height / w);

  // frameRate(10);

  for (let j = 0; j < rows; j++) {

    for (let i = 0; i < cols; i++) {

      grid.push(new Cell(i, j));
    }
  }

  current = grid[0];
}

//------------------------------------------------------------------------------

/**
 * Main loop that repeats forever
 */
function draw() {

  background(CHARCOAL);

  for (let i = 0; i < grid.length; i++) {

    grid[i].show();
  }

  current.visited = true;
  current.highlight();

  let next = current.checkNeighbors();

  if (next) {

    next.visited = true;

    stack.push(current);

    removeWalls(current, next);

    current = next;

  } else if (stack.length > 0) {

    current = stack.pop();
  }

}

//------------------------------------------------------------------------------

function dfs(index) {

  while(stack.length > 0) {


  }

}

//------------------------------------------------------------------------------

function index(i, j) {

  if (
    i < 0      ||
    j < 0      ||
    i > cols-1 ||
    j > rows-1) {

    return -1;
  }

  return i + j * cols;
}

//------------------------------------------------------------------------------

function removeWalls(a, b) {

  const left   = 0;
  const right  = 1;
  const top    = 2;
  const bottom = 3;

  let x = a.i - b.i;
  let y = a.j - b.j;

  if (x === 1) {

    a.walls[3] = false;
    b.walls[1] = false;

  } else if (x === -1) {

    a.walls[1] = false;
    b.walls[3] = false;
  }

  if (y === 1) {

    a.walls[0] = false;
    b.walls[2] = false;

  } else if (y === -1) {

    a.walls[2] = false;
    b.walls[0] = false;
  }
}
