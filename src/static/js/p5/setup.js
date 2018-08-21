/**
 * Initial one time setup.
 */
function setup() {

  // Stop infinite loop
  // of draw()
  noLoop();

  // Sliders
  sliders[keys.CANVAS]     = $(elements.slider.CANVAS).slider();
  sliders[keys.PATH]       = $(elements.slider.PATH).slider();
  sliders[keys.FRAMES]     = $(elements.slider.FRAMES).slider();
  sliders[keys.SUBTRACT_V] = $(elements.slider.SUBTRACT_V).slider();
  sliders[keys.SUBTRACT_H] = $(elements.slider.SUBTRACT_H).slider();

  // Labels
  labels[keys.CANVAS]     = $(elements.label.CANVAS_W);
  labels[keys.WIDTH]      = $(elements.label.CANVAS_W);
  labels[keys.HEIGHT]     = $(elements.label.CANVAS_H);
  labels[keys.PATH]       = $(elements.label.PATH);
  labels[keys.FRAMES]     = $(elements.label.FRAMES);
  labels[keys.SUBTRACT_V] = $(elements.label.SUBTRACT_V);
  labels[keys.SUBTRACT_H] = $(elements.label.SUBTRACT_H);

  // Dropowns
  dropdowns[keys.GENERATE] = $(elements.dropdown.GENERATE);
  dropdowns[keys.SOLVE]    = $(elements.dropdown.SOLVE);

  // Checkboxes
  checkboxes[keys.HIGHLIGHT] = $(elements.checkbox.HIGHLIGHT);
  checkboxes[keys.ANIMATE]   = $(elements.checkbox.ANIMATE);

  // Buttons
  buttons[keys.GENERATE] = $(elements.button.GENERATE);
  buttons[keys.SOLVE]    = $(elements.button.SOLVE);
  buttons[keys.EXPORT]   = $(elements.button.EXPORT);
  buttons[keys.CANCEL]   = $(elements.button.CANCEL);

  // Set min and max, and default values for sliders
  initSlider(sliders[keys.CANVAS], MIN_CANVAS_WIDTH, MAX_CANVAS_WIDTH, DEFAULT_CANVAS_WIDTH);
  initSlider(sliders[keys.PATH], MIN_PATH_WIDTH, MAX_PATH_WIDTH, DEFAULT_PATH_WIDTH);
  initSlider(sliders[keys.SUBTRACT_V], 0, 100, 0);
  initSlider(sliders[keys.SUBTRACT_H], 0, 100, 0);
  initSlider(sliders[keys.FRAMES], 1, 60, 60);

  // Connect sliders to labels
  connectSliderLabel({slider : sliders[keys.CANVAS],     label : labels[keys.WIDTH]});
  connectSliderLabel({slider : sliders[keys.CANVAS],     label : labels[keys.HEIGHT]});
  connectSliderLabel({slider : sliders[keys.PATH],       label : labels[keys.PATH]});
  connectSliderLabel({slider : sliders[keys.SUBTRACT_V], label : labels[keys.SUBTRACT_V]});
  connectSliderLabel({slider : sliders[keys.SUBTRACT_H], label : labels[keys.SUBTRACT_H]});
  connectSliderLabel({slider : sliders[keys.FRAMES],     label : labels[keys.FRAMES], transformer : (v) => abs(int(v)), callback : frameRate});

  // Generate button
  initButton({
    button  : buttons[keys.GENERATE],
    onclick : generate,
    disable : [events.SOLVING],
    enable  : [events.GENERATED, events.SOLVED]
  });

  // Solve button
  initButton({
    button  : buttons[keys.SOLVE],
    onclick : solve,
    disable : [events.GENERATING],
    enable  : [events.GENERATED]
  });

  // Export button
  initButton({
    button  : buttons[keys.EXPORT],
    onclick : download,
    disable : [events.GENERATING, events.SOLVING],
    enable  : [events.GENERATED,  events.SOLVED]
  });

  // Cancel button
  initButton({
    button  : buttons[keys.CANCEL],
    onclick : cancel,
    disable : [],
    enable  : []
  });

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

  // Auxiliary generators for subtracting walls / create cycles in graph
  generators[algorithms.generator.subtract.HORIZONTAL] = subtract.horizontal;
  generators[algorithms.generator.subtract.VERTICAL]   = subtract.vertical;

  // Solver algorithms
  solvers[algorithms.solver.DFS]      = DFS;
  solvers[algorithms.solver.BFS]      = BFS;
  solvers[algorithms.solver.A_STAR]   = aStar;
  solvers[algorithms.solver.DIJKSTRA] = dijkstra;

  // Visualizer algorithms
  visualizers[algorithms.visualizer.HIGHLIGHT] = highlight;

  // Grid
  init();
}
