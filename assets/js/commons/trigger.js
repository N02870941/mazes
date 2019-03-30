/**
 * Event triggers.
 */
const trigger = (() => {

  /**
   * Triggers an specified event on all
   * of it's subscribers from the subscribers map.
   */
  function trigger(ev) {

    subscribers[ev].forEach(element => element.trigger(ev))
  }

  // Public functions
  return {

    /**
     * Event fired when grid is initialized.
     */
    initializing : () => {
      trigger(events.INITIALIZING)
      showMessage(strings.messages.initial)

      const width  = sliders[keys.CANVAS].data(keys.SLIDER).getValue()
      const height = sliders[keys.CANVAS].data(keys.SLIDER).getValue()
      const pathW  = sliders[keys.PATH].data(keys.SLIDER).getValue()
      const cols   = floor(width  / pathW)
      const rows   = floor(height / pathW)
      const v      = rows * (cols - 1)
      const h      = cols * (rows - 1)
      const config = {
        pathW  : pathW,
        width  : width,
        height : height,
        rows   : rows,
        cols   : cols,
        walls  : {
          vertical   : v,
          horizontal : h
        }
      }

      maze.create(config)
    },

    /**
     * Fired when the 'Generate' button is clicked.
     */
    generating : () => {
      trigger(events.GENERATING)
      maze.generated = false

      // Get generator algorithm name
      let algo = dropdowns[keys.GENERATE].val()

      return generators[algo]
    },

    /**
     * Fired once generating the maze is complete.
     */
    prepared : () => {
      trigger(events.GENERATED)
      maze.generated = true
      maze.saveMaze()

      return true
    },

    /**
     * Fired when the 'Solve' button is clicked.
     */
    solving : () => {
      trigger(events.SOLVING)
      maze.solved = false

      let val = dropdowns[keys.SOLVE].val()

      return solvers[val]
    },

    /**
     * Fired once solving the maze is complete.
     */
    complete : () => {
      trigger(events.SOLVED)
      maze.solved = true
      maze.saveSolution()

      return true
    }

  }

})()
