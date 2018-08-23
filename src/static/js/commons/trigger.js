/**
 * Event triggers.
 */
const trigger = (() => {

  /**
   * Triggers an specified event on
   * all of it's subscribers from
   * the subscribers map.
   *
   */
  function trigger(ev) {

    subscribers[ev].forEach(element => element.trigger(ev))
  }

  // Public functions
  return {

    /**
     * Event fired when grid
     * is initialized.
     */
    initializing : () => {

      // Notify all subscribers
      trigger(events.INITIALIZING)

      // Show default message
      showMessage(strings.messages.initial)

      const width  = sliders[keys.CANVAS].data(keys.SLIDER).getValue()
      const height = sliders[keys.CANVAS].data(keys.SLIDER).getValue()
      const pathW  = sliders[keys.PATH].data(keys.SLIDER).getValue()
      const cols   = floor(width  / pathW)
      const rows   = floor(height / pathW)
      const v      = rows * (cols - 1)
      const h      = cols * (rows - 1)

      let config =  {

        pathW  : pathW,
        width  : width,
        height : height,
        rows   : rows,
        cols   : cols,
        walls  : {

          vertical   : v,
          horizontal : h
        }
      };

      // Create the maze
      maze.create(config)
    },

    /**
     * Fired when the 'Generate'
     * button is clicked.
     */
    generating : () => {

      // Notify all subscribers
      trigger(events.GENERATING)

      // Flag to false
      maze.generated = false

      // Get generator algorithm name
      let val = dropdowns[keys.GENERATE].val()

      // Return correct algorithm
      return generators[val]
    },

    /**
     * Fired once generating
     * the maze is complete.
     */
    prepared : () => {

      // Notify all subscribers
      trigger(events.GENERATED)

      // Set generated flag
      maze.generated = true

      // Save the maze in memory
      maze.saveMaze()

      return true
    },

    /**
     * Fired when the 'Solve'
     * button is clicked.
     */
    solving : () => {

      // Notify all subscribers
      trigger(events.SOLVING)

      // Flag to false
      maze.solved = false

      // Get solver algorithm name
      let val = dropdowns[keys.SOLVE].val()

      // Return correct algorithm
      return solvers[val]
    },

    /**
     * Fired once solving
     * the maze is complete.
     */
    complete : () => {

      // Notify all subscribers
      trigger(events.SOLVED)

      // Set solved flag to true
      maze.solved = true

      // Save the image in memory
      maze.saveSolution()

      return true
    }

  }

})()
