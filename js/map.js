'use strict';


const mapPinMain = document.querySelector(`.map__pin--main`);
const mapElement = document.querySelector(`.map`);
const addForm = document.querySelector(`.ad-form`);
const formElements = addForm.querySelectorAll(`fieldset`);
const mapFilters = document.querySelector(`.map__filters`);
const filterElements = mapFilters.querySelectorAll(`select`);
const roomNumber = document.querySelector(`#room_number`);
const typeHouseSelect = addForm.querySelector(`#type`);

const setAtivationAndInactivation = (bool, filter, form) => {
  filter.forEach((element) => {
    element.disabled = bool;
  });

  form.forEach((element) => {
    element.disabled = bool;
  });
};

const onLoadSuccess = (data) => {
  window.filter.activateFilter(data);
};


const activationMap = () => {
  mapElement.classList.remove(`map--faded`);
  addForm.classList.remove(`ad-form--disabled`);
  setAtivationAndInactivation(false, filterElements, formElements);
  window.load(onLoadSuccess, window.form.showErrorMessage);
  window.form.checkRoom(roomNumber.value);
  window.form.typeHouse(typeHouseSelect.value);
  window.form.createAddress(window.pin.positionPinDefault, true);
};

const deactivationMap = () => {
  mapElement.classList.add(`map--faded`);
  addForm.classList.add(`ad-form--disabled`);
  setAtivationAndInactivation(true, filterElements, formElements);
  mapPinMain.style.top = window.pin.positionPinDefault.y + `px`;
  mapPinMain.style.left = window.pin.positionPinDefault.x + `px`;
  window.form.createAddress(window.pin.positionPinDefault, true);
  mapPinMain.addEventListener(`mousedown`, onPinMouseDown);
  mapPinMain.addEventListener(`keydown`, onPinKeyDown);

};

const onPinMouseDown = (evt) => {
  window.util.clickOnMouse(evt, activationMap);
  mapPinMain.removeEventListener(`mousedown`, onPinMouseDown);
};

const onPinKeyDown = (evt) => {
  window.util.clickOnEnter(evt, activationMap);
  mapPinMain.removeEventListener(`keydown`, onPinKeyDown);
};

mapPinMain.addEventListener(`mousedown`, onPinMouseDown);
mapPinMain.addEventListener(`keydown`, onPinKeyDown);

setAtivationAndInactivation(true, filterElements, formElements);

window.map = {deactivationMap};
