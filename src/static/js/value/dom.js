// UI element selector ids
// Most of them are Jquery selectors
// so they are preceded by a # symbol
const elements = {

  message : {

    MESSAGE : '#message',
    TITLE   : '#message-title',
    CONTENT : '#message-content'
  },

  dropdown : {

    GENERATE : '#dropdown-generator',
    SOLVE    : '#dropdown-solver'
  },

  button : {

    GENERATE : '#button-generate',
    SOLVE    : '#button-solve',
    EXPORT   : '#button-export',
    CANCEL   : '#button-cancel'
  },

  slider : {

    CANVAS     : '#canvas-width-slider',
    PATH       : '#path-width-slider',
    FRAMES     : '#frame-rate-slider',
    SUBTRACT_V : '#vertical-wall-slider',
    SUBTRACT_H : '#horizontal-wall-slider'
  },

  label : {

    CANVAS_W   : '#canvas-width-slider-value',
    CANVAS_H   : '#canvas-height-slider-value',
    PATH       : '#path-width-slider-value',
    FRAMES     : '#frame-rate-slider-value',
    SUBTRACT_V : '#vertical-wall-slider-value',
    SUBTRACT_H : '#horizontal-wall-slider-value'
  },

  checkbox : {

    HIGHLIGHT : '#checkbox-highlight-visited',
    ANIMATE   : '#checkbox-animate'
  },

  canvas : {

    // NOTE - Not a Jquery selector
    // so there is purposely no # symbol
    MAIN : 'sketch-holder'
  }
};

// HTML element attributes / states
const attributes = {

  MIN           : 'min',
  MAX           : 'max',
  VALUE         : 'value',
  DISABLED      : 'disabled',
  SET_ATTRIBUTE : 'setAttribute'
};

// Jquery event strings
const events = {

  SLIDE      : 'slide',
  CLICK      : 'click',
  REFRESH    : 'refresh',
  GENERATED  : 'generated',
  GENERATING : 'generating',
  SOLVED     : 'solved',
  SOLVING    : 'solving'
};

// UI element
// associative arrays
const message    = [];
const buttons    = [];
const sliders    = [];
const labels     = [];
const dropdowns  = [];
const checkboxes = [];
