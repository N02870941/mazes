/**
 * Initial one time setup.
 */
function setup() {

  // Stop infinite loop
  // of draw()
  noLoop();

  // HTML elements to create references for
  let elementsToSelect = [

    // Message
    {map : message, key : keys.MESSAGE,      selector : elements.message.MESSAGE},
    {map : message, key : keys.TITLE,        selector : elements.message.TITLE},
    {map : message, key : keys.CONTENT,      selector : elements.message.CONTENT},

    // Sliders
    {map : sliders, key : keys.CANVAS,       selector : elements.slider.CANVAS,     initializer : s => $(s).slider()},
    {map : sliders, key : keys.PATH,         selector : elements.slider.PATH,       initializer : s => $(s).slider()},
    {map : sliders, key : keys.FRAMES,       selector : elements.slider.FRAMES,     initializer : s => $(s).slider()},
    {map : sliders, key : keys.SUBTRACT_V,   selector : elements.slider.SUBTRACT_V, initializer : s => $(s).slider()},
    {map : sliders, key : keys.SUBTRACT_H,   selector : elements.slider.SUBTRACT_H, initializer : s => $(s).slider()},

    // Labels
    {map : labels,  key : keys.CANVAS,       selector : elements.label.CANVAS_W},
    {map : labels,  key : keys.WIDTH,        selector : elements.label.CANVAS_W},
    {map : labels,  key : keys.HEIGHT,       selector : elements.label.CANVAS_H},
    {map : labels,  key : keys.PATH,         selector : elements.label.PATH},
    {map : labels,  key : keys.FRAMES,       selector : elements.label.FRAMES},
    {map : labels,  key : keys.SUBTRACT_V,   selector : elements.label.SUBTRACT_V},
    {map : labels,  key : keys.SUBTRACT_H,   selector : elements.label.SUBTRACT_H},

    // Dropdowns
    {map : dropdowns, key : keys.GENERATE,   selector : elements.dropdown.GENERATE},
    {map : dropdowns, key : keys.SOLVE,      selector : elements.dropdown.SOLVE},

    // Checkboxes
    {map : checkboxes, key : keys.HIGHLIGHT, selector : elements.checkbox.HIGHLIGHT},
    {map : checkboxes, key : keys.ANIMATE,   selector : elements.checkbox.ANIMATE},

    // Buttons
    {map : buttons, key : keys.GENERATE,     selector : elements.button.GENERATE},
    {map : buttons, key : keys.SOLVE,        selector : elements.button.SOLVE},
    {map : buttons, key : keys.EXPORT,       selector : elements.button.EXPORT},
    {map : buttons, key : keys.CANCEL,       selector : elements.button.CANCEL},
  ];

  // Sliders to initialize
  let slidersToInit = [

    {key : keys.CANVAS,     min : MIN_CANVAS_WIDTH, max : MAX_CANVAS_WIDTH, def : DEFAULT_CANVAS_WIDTH},
    {key : keys.PATH,       min : MIN_PATH_WIDTH,   max : MAX_PATH_WIDTH,   def : DEFAULT_PATH_WIDTH},
    {key : keys.SUBTRACT_V, min : 0,                max : 100,              def : 0},
    {key : keys.SUBTRACT_H, min : 0,                max : 100,              def : 0},
    {key : keys.FRAMES,     min : MIN_FRAME_RATE,   max : MAX_FRAME_RATE,   def : MAX_FRAME_RATE}
  ];

  // Slider label pairs to connect
  let sliderLabelsToConnect = [

    {sliderKey : keys.CANVAS,     labelKey : keys.WIDTH},
    {sliderKey : keys.CANVAS,     labelKey : keys.HEIGHT},
    {sliderKey : keys.PATH,       labelKey : keys.PATH},
    {sliderKey : keys.SUBTRACT_V, labelKey : keys.SUBTRACT_V},
    {sliderKey : keys.SUBTRACT_H, labelKey : keys.SUBTRACT_H},
    {sliderKey : keys.FRAMES,     labelKey : keys.FRAMES, transformer : (v) => abs(int(v)), callback : frameRate}
  ];

  // Buttons to initialize
  let buttonsToInit = [

    {key  : keys.GENERATE, onclick : generate, disable : [events.SOLVING],                    enable  : [events.GENERATED, events.SOLVED]},
    {key  : keys.SOLVE,    onclick : solve,    disable : [events.GENERATING],                 enable  : [events.GENERATED]},
    {key  : keys.EXPORT,   onclick : download, disable : [events.GENERATING, events.SOLVING], enable  : [events.GENERATED,  events.SOLVED]},
    {key  : keys.CANCEL,   onclick : cancel,   disable : [],                                  enable  : []}
  ];

  // Algorithms for generating, solving, etc
  let algorithmsToInit = [

    // Generators
    {map : generators, key : algorithms.generator.BFS,    algorithm : bfs},
    {map : generators, key : algorithms.generator.DFS,    algorithm : dfs},
    {map : generators, key : algorithms.generator.HYBRID, algorithm : hybrid},

    // Auxiliary generators
    {map : generators, key : algorithms.generator.subtract.HORIZONTAL, algorithm : subtract.horizontal},
    {map : generators, key : algorithms.generator.subtract.VERTICAL,   algorithm : subtract.vertical},

    // Solvers
    {map : solvers, key : algorithms.solver.DFS,      algorithm : DFS},
    {map : solvers, key : algorithms.solver.BFS,      algorithm : BFS},
    {map : solvers, key : algorithms.solver.A_STAR,   algorithm : aStar},
    {map : solvers, key : algorithms.solver.DIJKSTRA, algorithm : dijkstra},

    // Visualizers
    {map : visualizers, key : algorithms.visualizer.HIGHLIGHT, algorithm : highlight}
  ];

  let initMaps = [

    {array : elementsToSelect,      initializer : initElement},
    {array : slidersToInit,         initializer : initSlider},
    {array : sliderLabelsToConnect, initializer : connectSliderLabel},
    {array : buttonsToInit,         initializer : initButton},
    {array : algorithmsToInit,      initializer : initAgorithm}
  ];

  // Initialize all maps
  initMaps.forEach(e => e.array.forEach(v => e.initializer(v)))

  // Grid
  init();
}
