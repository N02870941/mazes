/**
 * Event triggers
 */
const trigger = {

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

  generating : () => {

    // Disable appropriate buttons
    buttons[keys.SOLVE].trigger(events.GENERATING);
    buttons[keys.EXPORT].trigger(events.GENERATING);

    // Flag to false
    maze.generated = false;

    // Get generator algorithm name
    let val = dropdowns[keys.GENERATE].val();

    // Return correct algorithm
    return generators[val];
  },

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

  prepared : () => {

    maze.generated = true;

    images.maze = canvas.get();

    buttons[keys.GENERATE].trigger(events.GENERATED);
    buttons[keys.SOLVE].trigger(events.GENERATED);
    buttons[keys.EXPORT].trigger(events.GENERATED);

    return true;
  },

  complete : () => {

    maze.solved = true;

    solution = canvas.get();

    buttons[keys.GENERATE].trigger(events.SOLVED);
    buttons[keys.EXPORT].trigger(events.SOLVED);

    return true;
  }

};
