/**
 * Initial one time setup.
 */
function setup() {

  // Stop infinite loop of draw()
  noLoop();

  // HTML elements to create references for
  let elementsToSelect = [

    // Messages
    {
      map      : message,
      key      : keys.MESSAGE,
      selector : elements.message.MESSAGE
    },
    {
      map      : message,
      key      : keys.TITLE,
      selector : elements.message.TITLE
    },
    {
      map      : message,
      key      : keys.CONTENT,
      selector : elements.message.CONTENT
     },

    // Sliders
    {
      map         : sliders,
      key         : keys.CANVAS,
      selector    : elements.slider.CANVAS,
      initializer : s => $(s).slider()
    },
    {
      map         : sliders,
      key         : keys.PATH,
      selector    : elements.slider.PATH,
      initializer : s => $(s).slider()
    },
    {
      map         : sliders,
      key         : keys.FRAMES,
      selector    : elements.slider.FRAMES,
      initializer : s => $(s).slider()
    },
    {
      map         : sliders,
      key         : keys.SUBTRACT_V,
      selector    : elements.slider.SUBTRACT_V,
      initializer : s => $(s).slider()
    },
    {
      map         : sliders,
      key         : keys.SUBTRACT_H,
      selector    : elements.slider.SUBTRACT_H,
      initializer : s => $(s).slider()
    },

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
    {map : dropdowns, key : keys.HEURISTIC,  selector : elements.dropdown.HEURISTIC},

    // Checkboxes
    {map : checkboxes, key : keys.HIGHLIGHT, selector : elements.checkbox.HIGHLIGHT},
    {map : checkboxes, key : keys.ANIMATE,   selector : elements.checkbox.ANIMATE},
    {map : checkboxes, key : keys.AUTOSOLVE, selector : elements.checkbox.AUTOSOLVE},

    // Buttons
    {map : buttons, key : keys.GENERATE,     selector : elements.button.GENERATE},
    {map : buttons, key : keys.SOLVE,        selector : elements.button.SOLVE},
    {map : buttons, key : keys.EXPORT,       selector : elements.button.EXPORT},
    {map : buttons, key : keys.CANCEL,       selector : elements.button.CANCEL},

    // Misc
    {map : misc,    key : keys.HEURISTIC,    selector : elements.misc.HEURISTIC}
  ];

  // Sliders to initialize
  let slidersToInit = [
    {key : keys.CANVAS,     min : MIN_CANVAS_WIDTH, max : MAX_CANVAS_WIDTH, def : DEFAULT_CANVAS_WIDTH},
    {key : keys.PATH,       min : MIN_PATH_WIDTH,   max : MAX_PATH_WIDTH,   def : DEFAULT_PATH_WIDTH},
    {key : keys.SUBTRACT_V, min : MIN_SUBTRACT_V,   max : MAX_SUBTRACT_V,   def : DEFAULT_SUBTRACT_V},
    {key : keys.SUBTRACT_H, min : MIN_SUBTRACT_H,   max : MAX_SUBTRACT_H,   def : DEFAULT_SUBTRACT_H},
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

  // Drop downs
  let dropdownsToInit = [
    {
      key     : keys.GENERATE,
      options : strings.dropdowns.generate
    },

    {
      key      : keys.SOLVE,
      options  : strings.dropdowns.solve,
      onchange : function() {

        let heuristics = $(elements.misc.HEURISTIC_ROW)

        if (this.value === aStar.aStar.name)
          heuristics.show()

        else
          heuristics.hide()
      }
    },
    {
      key      : keys.HEURISTIC,
      options  : strings.dropdowns.heuristic,
      onchange : function() {maze.heuristic = Cell.heuristics[this.value]}
    }
  ];

  // Buttons to initialize
  let buttonsToInit = [
    {
      key     : keys.GENERATE,
      onclick : generate,
      disable : [events.SOLVING],
      enable  : [events.GENERATED, events.SOLVED, events.INITIALIZING]
    },
    {
      key     : keys.SOLVE,
      onclick : solve,
      disable : [events.GENERATING, events.INITIALIZING],
      enable  : [events.GENERATED]
    },
    {
      key     : keys.EXPORT,
      onclick : download,
      disable : [events.GENERATING, events.SOLVING, events.INITIALIZING],
      enable  : [events.GENERATED,  events.SOLVED]
    },
    {
      key     : keys.CANCEL,
      onclick : cancel,
      disable : [],
      enable  : []
    }
  ];

  // Algorithms for generating, solving, etc
  let algorithmsToInit = [

    // Generators
    {map : generators, key : algorithms.generator.BFS,    algorithm : backtrack.bfs},
    {map : generators, key : algorithms.generator.DFS,    algorithm : backtrack.dfs},
    {map : generators, key : algorithms.generator.HYBRID, algorithm : backtrack.hybrid},

    // Auxiliary generators
    {map : generators, key : algorithms.generator.subtract.HORIZONTAL, algorithm : subtract.horizontal},
    {map : generators, key : algorithms.generator.subtract.VERTICAL,   algorithm : subtract.vertical},

    // Solvers
    {map : solvers, key : algorithms.solver.DFS,      algorithm : dfs.DFS},
    {map : solvers, key : algorithms.solver.BFS,      algorithm : bfs.BFS},
    {map : solvers, key : algorithms.solver.A_STAR,   algorithm : aStar.aStar},
    {map : solvers, key : algorithms.solver.DIJKSTRA, algorithm : dijkstra.dijkstra},

    // Visualizers
    {map : visualizers, key : algorithms.visualizer.HIGHLIGHT, algorithm : maze.highlight}
  ];

  let initMaps = [
    {array : elementsToSelect,      initializer : gui.initElement},
    {array : slidersToInit,         initializer : gui.initSlider},
    {array : sliderLabelsToConnect, initializer : gui.connectSliderLabel},
    {array : dropdownsToInit,       initializer : gui.initDropdown},
    {array : buttonsToInit,         initializer : gui.initButton},
    {array : algorithmsToInit,      initializer : gui.initAgorithm}
  ];

  // Initialize all maps
  initMaps.forEach(e => e.array.forEach(v => e.initializer(v)))

  // Grid
  trigger.initializing()
}
