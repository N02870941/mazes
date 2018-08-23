/**
 * Event triggers
 */
const trigger = (() => {

  /**
   * Triggers an event on
   * an array of JQuery elements
   */
  function trigger(ev) {

    console.log(ev)

    subscribers[ev].forEach( element => {

      element.trigger(ev)
    })

  }

  // Public functions
  return {

    /**
     * Event fired when grid
     * is initialized.
     */
    initializing : () => {

      // Show default message
      showMessage(strings.messages.initial)

      // TODO - Turn into event

      buttons[keys.GENERATE].prop(attributes.DISABLED, false)
      buttons[keys.SOLVE].prop(attributes.DISABLED, true)
      buttons[keys.EXPORT].prop(attributes.DISABLED, true)

      const width  = sliders[keys.CANVAS].data(keys.SLIDER).getValue()
      const height = width
      const pathW  = sliders[keys.PATH].data(keys.SLIDER).getValue()

      let cols = floor(width  / pathW)
      let rows = floor(height / pathW)

      let v = rows * (cols - 1)
      let h = cols * (rows - 1)

      return {

        pathW  : pathW,
        width  : width,
        height : height,
        rows   : rows,
        cols   : cols,
        walls  : {

          vertical : v,
          horizontal : h
        }
      };
    },

    /**
     * Fired when the 'Generate'
     * button is clicked.
     */
    generating : () => {

      // Disable appropriate buttons
      trigger(events.GENERATING)

      // Flag to false
      maze.generated = false;

      // Get generator algorithm name
      let val = dropdowns[keys.GENERATE].val();

      // Return correct algorithm
      return generators[val];
    },

    /**
     * Fired once generating
     * the maze is complete.
     */
    prepared : () => {

      maze.generated = true;

      images.maze = canvas.get();

      buttons[keys.GENERATE].trigger(events.GENERATED);
      buttons[keys.SOLVE].trigger(events.GENERATED);
      buttons[keys.EXPORT].trigger(events.GENERATED);

      return true;
    },

    /**
     * Fired when the 'Solve'
     * button is clicked.
     */
    solving : () => {

      // Disable appropriate buttons
      buttons[keys.GENERATE].trigger(events.SOLVING);
      buttons[keys.EXPORT].trigger(events.SOLVING);

      // Flag to false
      maze.solved = false;

      // Get solver algorithm name
      let val = dropdowns[keys.SOLVE].val();

      // Return correct algorithm
      return solvers[val];
    },

    /**
     * Fired once solving
     * the maze is complete.
     */
    complete : () => {

      maze.solved = true;

      images.solution = canvas.get();

      buttons[keys.GENERATE].trigger(events.SOLVED);
      buttons[keys.EXPORT].trigger(events.SOLVED);

      return true;
    }

  }

})()
