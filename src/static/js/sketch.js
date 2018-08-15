/**
 * Initial one time setup.
 */
function setup() {

  // Sliders
  parameters();

  // Buttons
  actions();

  // Grid
  init();

  // Stop p5 main event loop
  noLoop();
}

//------------------------------------------------------------------------------

/**
 * Sets up P5 canvas on the page.
 */
function page(dimension) {

  maze = createCanvas(

    dimension,
    dimension
  );

  // Create p5 canvas object
  canvas = createCanvas(

    dimension,
    dimension
  );

  // Assign canvas to inline html element
  canvas.parent(elements.canvas.MAIN);
}

//------------------------------------------------------------------------------

/**
 * Set up event listeners for sliders.
 */
function parameters() {

  const SET_ATTRIBUTE = 'setAttribute';

  let path = () => {

    let curr = sliders[keys.CANVAS].data(keys.SLIDER).getValue();

    // Update path width boundaries
    let lo = MIN_PATH_WIDTH
    let hi = MAX_PATH_WIDTH

    // Set min and max for path width
    sliders[keys.PATH].slider(SET_ATTRIBUTE, attributes.MIN, lo)
    sliders[keys.PATH].slider(SET_ATTRIBUTE, attributes.MAX, hi)
    sliders[keys.PATH].slider(SET_ATTRIBUTE, Math.floor(lo + hi) / 2);
    sliders[keys.PATH].slider(events.REFRESH);
  }

  // The sliders
  sliders[keys.CANVAS] = $(elements.slider.CANVAS).slider();
  sliders[keys.PATH]   = $(elements.slider.PATH).slider();
  sliders[keys.FRAMES] = $(elements.slider.FRAMES).slider();

  // The labels
  labels[keys.CANVAS] = $(elements.label.CANVAS_W);
  labels[keys.WIDTH]  = $(elements.label.CANVAS_W);
  labels[keys.HEIGHT] = $(elements.label.CANVAS_H);
  labels[keys.PATH]   = $(elements.label.PATH);
  labels[keys.FRAMES] = $(elements.label.FRAMES);

  // Set min and max width for canvas width
  sliders[keys.CANVAS].slider(SET_ATTRIBUTE, attributes.MIN, MIN_CANVAS_WIDTH)
  sliders[keys.CANVAS].slider(SET_ATTRIBUTE, attributes.MAX, MAX_CANVAS_WIDTH)
  sliders[keys.CANVAS].slider(SET_ATTRIBUTE, attributes.VALUE, DEFAULT_CANVAS_WIDTH);
  sliders[keys.CANVAS].slider(events.REFRESH);

  path();

  // Canvas width slider event
  sliders[keys.CANVAS].on(events.SLIDE, (e) => {

    // Update label
    labels[keys.WIDTH].text(e.value);
    labels[keys.HEIGHT].text(e.value);

    path();
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

  let t = sliders[keys.CANVAS].data(keys.SLIDER).getValue();
  let v = sliders[keys.PATH].data(keys.SLIDER).getValue();

  // Set initial values
  labels[keys.WIDTH].text(t);
  labels[keys.HEIGHT].text(t);
  labels[keys.PATH].text(v);

  // Dropowns
  dropdowns[keys.GENERATE] = $(elements.dropdown.GENERATE);
  dropdowns[keys.SOLVE]    = $(elements.dropdown.SOLVE);

  // Checkboxes
  checkboxes[keys.HIGHLIGHT] = $(elements.checkbox.HIGHLIGHT);
}

//------------------------------------------------------------------------------

/**
 * Set up event listeners for buttons.
 */
function actions() {

  // TODO - Make cleaner somehow

  generators.push(dfs);
  generators.push(prim);

  solvers.push(aStar);
  solvers.push(DFS);

  // Generators
  generators['prim'] = prim;
  generators['dfs']  = dfs;

  // Solvers
  solvers['aStar'] = aStar;
  solvers['dfs']   = DFS;

  // The buttons
  buttons[keys.GENERATE] = $(elements.button.GENERATE);
  buttons[keys.SOLVE]    = $(elements.button.SOLVE);
  buttons[keys.EXPORT]   = $(elements.button.EXPORT);
  buttons[keys.CANCEL]   = $(elements.button.CANCEL);

  // Setup click events for buttons
  buttons[keys.GENERATE].click(generate);
  buttons[keys.SOLVE].click(solve);
  buttons[keys.EXPORT].click(download);
  buttons[keys.CANCEL].click(cancel);

  // Disable solve button while generating happening
  buttons[keys.SOLVE].on(events.GENERATING, function(event) {

    $(this).prop(attributes.DISABLED, true);
  });

  // Disable export button while generating happening
  buttons[keys.EXPORT].on(events.GENERATING, function(event) {

    $(this).prop(attributes.DISABLED, true);
  });

  // Enable generate button once generating is done
  buttons[keys.GENERATE].on(events.GENERATED, function(event) {

    $(this).prop(attributes.DISABLED, false);
  });

  // Enable solve button once generating is done
  buttons[keys.SOLVE].on(events.GENERATED, function(event) {

    $(this).prop(attributes.DISABLED, false);
  });

  // Enable export button once generating is done
  buttons[keys.EXPORT].on(events.GENERATED, function(event) {

    $(this).prop(attributes.DISABLED, false);
  });

  // Disable generate button until solving is done
  buttons[keys.GENERATE].on(events.SOLVING, function(event) {

    $(this).prop(attributes.DISABLED, true);
  });

  // Disable generate button until solving is done
  buttons[keys.EXPORT].on(events.SOLVING, function(event) {

    $(this).prop(attributes.DISABLED, true);
  });

  // Enable generate button when solving is done
  buttons[keys.GENERATE].on(events.SOLVED, function(event) {

    $(this).prop(attributes.DISABLED, false);
  });

  // Enable generate button when solving is done
  buttons[keys.EXPORT].on(events.SOLVED, function(event) {

    $(this).prop(attributes.DISABLED, false);
  });
}

//------------------------------------------------------------------------------

/**
 * (Re)initializes the grid.
 */
function init() {

  const width = sliders[keys.CANVAS].data(keys.SLIDER).getValue()
  const w     = sliders[keys.PATH].data(keys.SLIDER).getValue();

  buttons[keys.GENERATE].prop(attributes.DISABLED, false);
  buttons[keys.SOLVE].prop(attributes.DISABLED, true);
  buttons[keys.EXPORT].prop(attributes.DISABLED, true);

  // Canvas
  page(width);

  // Compute dimension of grid
  cols = floor(width  / w);
  rows = floor(height / w);

  generated = false;
  solved    = false;

  // Reinit the grid array
  // and the vertex stack
  // and best path map
  stack   = [];
  grid    = [];
  parents = [];

  // Pre-compute heuristic matrix
  costs = heuristics(rows, cols, w);

  // Start at first cell
  current = grid[0];

  // Start p5 main event loop
  loop();

  // Show each grid cell in white
  grid.forEach(c => c.clear());
}

//------------------------------------------------------------------------------

/**
 * Pre-computes matrix of heuristics
 * for later use in A* search algorithm.
 */
function heuristics(r, c, w) {

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
      grid.push(new Cell(i, j, w));

      // Compute heuristic using euclidian distance
      h[j][i] = Cell.euclidian(grid[grid.length - 1], last);
    }
  }

  return h;
}

//------------------------------------------------------------------------------

/**
 * Main event loop that repeats forever.
 */
async function draw() {

  // Are we generating?
  if (generator(action)) {

    // Are we done?
    if (generated) {

      // Trigger generated event
      prepared();

      // Get the start and end cells
      const first = grid[0];
      const last  = grid[grid.length - 1];

      // Remove the left and right
      // walls respectively
      first.walls[3] = false
      last.walls[1]  = false;

      // Re-paint to screen
      first.clear();
      last.clear();

    // In progress
    } else {

      generated = action();
    }

  // Are we solving?
  } else if (solver(action)) {

    // Not done
    if (!solved) {

      solved = action();

    // Highlight the result
    } else {

      action = highlight
    }

  // Are we highlighting?
  } else if (action === highlight) {

    if (action()) {

      complete();
    }
  }

}
