'use strict';


const ESC_KEYCODE = 27;
const ENTER_KEYCODE = 13;
const CLICK_MOUSE = 1;
const DEBOUNCE_INTERVAL = 500;

const clickOnEsc = (evt, action) => {
  if (evt.keyCode === ESC_KEYCODE) {
    action();
  }
};

const clickOnEnter = (evt, action) => {
  if (evt.keyCode === ENTER_KEYCODE) {
    action();
  }
};

const clickOnMouse = (evt, action) => {
  if (evt.which === CLICK_MOUSE) {
    action();
  }
};

const debounce = (cb) => {
  let lastTimeout = null;
  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

window.util = {clickOnEsc, clickOnEnter, clickOnMouse, debounce};
