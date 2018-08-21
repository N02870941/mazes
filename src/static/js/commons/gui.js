const SET_ATTRIBUTE = 'setAttribute';

/**
 * Sets min, max, initial value for a
 *jquery  bootstrap-slider object reference.
 */
let initSlider = (slider, min, max, initial) => {

  slider.slider(SET_ATTRIBUTE, attributes.MIN, min);
  slider.slider(SET_ATTRIBUTE, attributes.MAX, max);
  slider.slider(SET_ATTRIBUTE, attributes.VALUE, initial);
  slider.slider(events.REFRESH);
};

/**
 * Connects a slider to a label.
 */
let connectSliderLabel = ({

    // Named parameters + default values
    slider      = undefined,
    label       = undefined,
    transformer = (v) => v,
    callback    = (v) => {}

  }) => {

  // On slide event
  slider.on(events.SLIDE, (e) => {

    // Transform the data
    let v = transformer(e.value);

    // Set the value
    label.text(v);

    // Follow up action
    callback(v);
  });

  // Get initial value from label
  let data = slider.data(keys.SLIDER).getValue();

  // Display on screen
  label.text(data);
};

let initButton = ({

  button  = undefined,
  onclick = () => {},
  enable  = [],
  disable = []

}) => {

  button.click(onclick);

  disable.forEach(e => {

    button.on(e, function(event) {

      button.prop(attributes.DISABLED, true);
    });

  });

  enable.forEach(e => {

    button.on(e, function(event) {

      button.prop(attributes.DISABLED, false);
    });

  });
};
