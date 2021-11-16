'use strict';


const addressForm = document.querySelector(`#address`);
const capacity = document.querySelector(`#capacity`);
const capacityOptions = capacity.querySelectorAll(`option`);
const roomNumber = document.querySelector(`#room_number`);
const addForm = document.querySelector(`.ad-form`);
const addFormReset = addForm.querySelector(`.ad-form__reset`);
const headingFormInput = addForm.querySelector(`#title`);
const typeHouseSelect = addForm.querySelector(`#type`);
const timeIn = document.querySelector(`#timein`);
const timeOut = document.querySelector(`#timeout`);
const priceInput = addForm.querySelector(`#price`);

const HEADING_MIN_LENGTH = 30;
const HEADING_MAX_LENGTH = 100;

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const avatarPreview = document.querySelector(`.ad-form-header__preview`);
const avatarChooser = document.querySelector(`#avatar`);
const imageChooser = document.querySelector(`#images`);
const photoPreview = document.querySelector(`.ad-form__photo`);

const createAddress = (coord, bool) => {
  if (bool) {
    addressForm.value = `${Math.ceil(coord.x + window.pin.mainPin.MAIN_PIN_WIDTH / 2)}, ${Math.ceil(coord.y + window.pin.mainPin.MAIN_PIN_HEIGHT + window.pin.mainPin.PIN_TAIL)}`;
  } else {
    addressForm.value = `${Math.ceil(570 + window.pin.mainPin.MAIN_PIN_WIDTH / 2)}, ${Math.ceil(375 + window.pin.mainPin.MAIN_PIN_HEIGHT / 2)}`;
  }
};

createAddress(false);

const roomValues = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const checkRoom = (people) => {
  capacityOptions.forEach((element) => {
    element.disabled = true;
  });

  roomValues[people].forEach((seats) => {
    capacityOptions.forEach((element) => {
      if (Number(element.value) === seats) {
        element.disabled = false;
        element.selected = true;
      }
    });
  });
};

roomNumber.addEventListener(`change`, (evt) => {
  checkRoom(evt.target.value);
});

headingFormInput.addEventListener(`input`, () => {
  const valueLength = headingFormInput.value.length;
  if (valueLength < HEADING_MIN_LENGTH) {
    headingFormInput.setCustomValidity(`Еще ` + (HEADING_MIN_LENGTH - valueLength) + ` симв`);
  } else if (valueLength > HEADING_MAX_LENGTH) {
    headingFormInput.setCustomValidity(`Удалите лишние ` + (valueLength - HEADING_MAX_LENGTH) + ` симв`);
  } else {
    headingFormInput.setCustomValidity(``);
  }

  headingFormInput.reportValidity();
});

const onTimeInChange = () => {
  timeOut.value = timeIn.value;
};
const onTimeOutChange = () => {
  timeIn.value = timeOut.value;
};

timeIn.addEventListener(`change`, onTimeInChange);
timeOut.addEventListener(`change`, onTimeOutChange);

const minPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

const typeHouse = (type) => {
  priceInput.setAttribute(`min`, minPrice[type]);
  priceInput.setAttribute(`placeholder`, minPrice[type]);
};
typeHouseSelect.addEventListener(`change`, (evt) => {
  typeHouse(evt.target.value);
});

const messageErrorPopup = document.querySelector(`#error`).content.querySelector(`.error`);
const messageSuccessPopup = document.querySelector(`#success`).content.querySelector(`.success`);
const mainBody = document.querySelector(`main`);

const showErrorMessage = () => {
  const message = messageErrorPopup.cloneNode(true);
  mainBody.appendChild(message);
  hideMessageError();
};

const showSuccessMessage = () => {
  const message = messageSuccessPopup.cloneNode(true);
  mainBody.appendChild(message);
  hideMessageSuccess();
  addForm.reset();
  window.map.deactivationMap();
  window.pin.removePins();
  window.card.removeCard();
  window.filter.resetFilter();
  deletePreviewPhoto();
};

const hideMessageError = () => {
  const messageError = document.querySelector(`.error`);
  const errorBtn = document.querySelector(`.error__button`);

  const hideMessageErrorEsc = (evt) => {
    window.util.clickOnEsc(evt, () => {
      messageError.remove();
    });
  };
  const hideMessageErrorMouse = (evt) => {
    window.util.clickOnMouse(evt, () => {
      messageError.remove();
    });
  };
  window.addEventListener(`keydown`, hideMessageErrorEsc);
  errorBtn.addEventListener(`click`, hideMessageErrorMouse);
  window.addEventListener(`click`, hideMessageErrorMouse);
};

const hideMessageSuccess = () => {
  const messageSuccess = document.querySelector(`.success`);

  const hideMessageSuccessEsc = (evt) => {
    window.util.clickOnEsc(evt, () => {
      messageSuccess.remove();
    });

  };
  const hideMessageSuccessMouse = (evt) => {
    window.util.clickOnMouse(evt, () => { });
    messageSuccess.remove();
  };
  window.addEventListener(`keydown`, hideMessageSuccessEsc);
  window.addEventListener(`click`, hideMessageSuccessMouse);
};

const submitHandler = (evt) => {
  evt.preventDefault();
  window.upload(new FormData(addForm), showSuccessMessage, showErrorMessage);
};

const renderPreviewPhoto = (reader, box) => {
  const photo = document.createElement(`img`);
  photo.classList.add(`photo-preview`);
  photo.src = reader.result;
  photo.style.width = `70px`;
  photo.style.height = `70px`;
  photo.style.borderRadius = `5px`;
  box.style.position = `relative`;
  photo.style.position = `absolute`;
  photo.style.left = `0`;
  box.appendChild(photo);
};

const createPreviewPhoto = (param1, param2) => {
  return () => {
    const file = param1.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        renderPreviewPhoto(reader, param2);
      });

      reader.readAsDataURL(file);
    }
    param1.addEventListener(`change`, () => {
      deletePreviewPhoto();
    });
  };
};

const deletePreviewPhoto = () => {
  const removeImage = document.querySelectorAll(`.photo-preview`);
  removeImage.forEach((img) => {
    img.remove();
  });
};

avatarChooser.addEventListener(`change`, createPreviewPhoto(avatarChooser, avatarPreview));
imageChooser.addEventListener(`change`, createPreviewPhoto(imageChooser, photoPreview));
addForm.addEventListener(`submit`, submitHandler);
addFormReset.addEventListener(`click`, () => {
  addForm.reset();
  window.map.deactivationMap();
  window.pin.removePins();
  window.card.removeCard();
  window.filter.resetFilter();
  deletePreviewPhoto();
});

window.form = {createAddress, checkRoom, typeHouse, showErrorMessage};
