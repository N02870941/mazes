/**
 * Initial one time setup.
 */
function setup() {

  // Stop infinite loop
  // of draw()
  noLoop();

  // Sliders
  parameters();

  // Buttons
  actions();

  // Grid
  init();
}

//------------------------------------------------------------------------------

/**
 * Set up event listeners for sliders.
 */
function parameters() {

  const SET_ATTRIBUTE = 'setAttribute';

  let path = () => {

    // TODO - Implement?

    let curr = sliders[keys.CANVAS].data(keys.SLIDER).getValue();

    // Update path width boundaries
    const lo = MIN_PATH_WIDTH
    const hi = MAX_PATH_WIDTH

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
  checkboxes[keys.ANIMATE]   = $(elements.checkbox.ANIMATE);
}

//------------------------------------------------------------------------------

/**
 * Set up event listeners for buttons.
 */
function actions() {

  /*
   * Here we are are creating key-value
   * pairs between algorithm functions as
   * values and their string names as keys.
   * This way we can lookup function by name
   * and always get the right algorithm based
   * on the value in the dropdown.
   */

  // Generator algorithms
  generators[algorithms.generator.BFS]    = bfs;
  generators[algorithms.generator.DFS]    = dfs;
  generators[algorithms.generator.HYBRID] = hybrid;

  // Solver algorithms
  solvers[algorithms.solver.DFS]    = DFS;
  solvers[algorithms.solver.A_STAR] = aStar;

  // Visualizer algorithms
  visualizers[algorithms.visualizer.HIGHLIGHT] = highlight;

  /*
   * References to buttons that perform
   * three main actions. Generate, Solve,
   * and Export.
   */

  // The buttons
  buttons[keys.GENERATE] = $(elements.button.GENERATE);
  buttons[keys.SOLVE]    = $(elements.button.SOLVE);
  buttons[keys.EXPORT]   = $(elements.button.EXPORT);
  buttons[keys.CANCEL]   = $(elements.button.CANCEL);

  /*
   * Bind appropriate functions
   * to their onclick events.
   */

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

  // Create p5 canvas object
  canvas = createCanvas(

    width,
    width
  );

  // Assign canvas to inline html element
  canvas.parent(elements.canvas.MAIN);

  // Compute dimension of grid
  cols = floor(width  / w);
  rows = floor(height / w);

  generated = false;
  solved    = false;

  // Reinit the grid array
  // and the vertex stack
  // and best path map
  stack.length = 0;
  grid.length  = 0;
  parents.clear();

  // Rows
  for (let j = 0; j < rows; j++) {

    // Cols
    for (let i = 0; i < cols; i++) {

      // New cell
      grid.push(new Cell(i, j, w));
    }
  }

  // Start at first cell
  current = grid[0];

  // Show each grid cell in white
  grid.forEach(c => c.clear());
}

//------------------------------------------------------------------------------

/**
 * Main event loop
 * that repeats forever.
 */
function draw() {

  // Are we generating?
  if (generator(action)) {

    // Are we done?
    if (generated) {

      callback();

    // In progress
    } else {

      generated = action();
    }

  // Are we solving?
  } else if (solver(action)) {

    // Done
    if (action()) {

      action = callback
    }

  // Are we highlighting?
  } else if (visualizer(action)) {

    if (action()) {

      complete();
    }
  }

}

//------------------------------------------------------------------------------

/**
 * Executes loop behind the scenes.
 * The first argument is a function with
 * zero arguments. It returns true when
 * it has met it's base case / exit condition.
 * otherwise it continues to return false.
 *
 * The second function after() is an optional
 * callback function that executes after the
 * procedure has run it's course. after() does
 * not return anything.
 */
function execute(procedure, after) {

  let exit;

  do {

    exit = procedure();

  } while (!exit);

  if (after)
    after();
}
