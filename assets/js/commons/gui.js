const gui = {
  /**
   * Sets min, max, initial value for a jquery  bootstrap-slider object reference.
   */
  initSlider : ({
    key = undefined,
    min = undefined,
    max = undefined,
    def = undefined}) => {

    const slider = sliders[key]

    slider.slider(attributes.SET_ATTRIBUTE, attributes.MIN,   min)
    slider.slider(attributes.SET_ATTRIBUTE, attributes.MAX,   max)
    slider.slider(attributes.SET_ATTRIBUTE, attributes.VALUE, def)
    slider.slider(events.REFRESH);
  },

//------------------------------------------------------------------------------

  /**
   * Connects a slider to a label with an optional transformer function that
   * performs data type conversion and an optional callback that takes in the transformed value.
   */
  connectSliderLabel : ({
      sliderKey   = undefined,
      labelKey    = undefined,
      transformer = undefined,
      callback    = undefined
    }) => {

      const slider = sliders[sliderKey]
      const label  = labels[labelKey]

    slider.on(events.SLIDE, (e) => {

      // Transform the data
      let v = transformer ? transformer(e.value) : e.value

      // Set the value
      label.text(v)

      if (callback) {
        callback(v)
      }

    })

    const data = slider.data(keys.SLIDER).getValue()

    // Display on screen
    label.text(data)
  },

//------------------------------------------------------------------------------

  /**
   * Initializes a button by setting the onclick event as well as
   * attaches event listeners that tell the button when to activate and
   * deactivate.
   */
  initButton : ({
      key     = undefined,
      onclick = undefined,
      enable  = [],
      disable = []
    }) => {

    const button = buttons[key]

    button.click(onclick)

    // For all events in disable array, if fired, disable this button
    disable.forEach(e => {
      subscribers[e].add(button)

      button.on(e, (c) => button.prop(attributes.DISABLED, true))
    })

    // For all events in enable array, if fired, enable this button
    enable.forEach(e => {
      subscribers[e].add(button)

      button.on(e, (c) => button.prop(attributes.DISABLED, false))
    })
  },

//------------------------------------------------------------------------------

  /**
   * Initializes an HTML element as a JQuery object.
   */
  initElement : ({
    map         = undefined,
    key         = undefined,
    selector    = undefined,
    initializer = undefined}) => {

    map[key] = initializer ? initializer(selector) : $(selector)
  },

//------------------------------------------------------------------------------

  /**
   * Initializes an algorithm.
   */
  initAgorithm : ({
    map       = undefined,
    key       = undefined,
    algorithm = undefined}) => {

    map[key] = algorithm
  },

//------------------------------------------------------------------------------

  /**
   * Initializes a dropdown.
   */
  initDropdown : ({
    key      = undefined,
    options  = undefined,
    onchange = undefined
  }) => {

    let dropdown = dropdowns[key]

    if (onchange) {
        dropdown.change(onchange)
    }

    options.forEach(option => {
      dropdown.append(`<option value="${option.value}">${option.name}</option>`)
    })

    // Trigger the change event so that all of the dropdown's
    // dependencies are in a valid initial state
    dropdown.trigger(events.CHANGE)
  }

}
