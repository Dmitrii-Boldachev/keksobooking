'use strict';


const mapPinMain = document.querySelector(`.map__pin--main`);

const PIN_TAIL = 18;

const mapLimits = {
  top: 130,
  right: 1200,
  bottom: 630,
  left: 0
};

mapPinMain.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };


  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    const newLocation = {
      x: mapPinMain.offsetLeft - shift.x,
      y: mapPinMain.offsetTop - shift.y
    };

    const movingLimits = {
      top: mapLimits.top - mapPinMain.offsetHeight - PIN_TAIL,
      right: mapLimits.right - mapPinMain.offsetWidth / 2,
      bottom: mapLimits.bottom - mapPinMain.offsetHeight - PIN_TAIL,
      left: mapLimits.left - mapPinMain.offsetWidth / 2
    };


    const positionPin = (coords) => {
      if (coords.x <= movingLimits.left) {
        coords.x = movingLimits.left;
      }
      if (coords.x >= movingLimits.right) {
        coords.x = movingLimits.right;
      }
      if (coords.y <= movingLimits.top) {
        coords.y = movingLimits.top;
      }
      if (coords.y >= movingLimits.bottom) {
        coords.y = movingLimits.bottom;
      }
    };
    positionPin(newLocation);

    mapPinMain.style.left = newLocation.x + `px`;
    mapPinMain.style.top = newLocation.y + `px`;


    window.form.createAddress(newLocation, true);
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});
