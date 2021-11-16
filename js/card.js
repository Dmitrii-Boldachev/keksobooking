'use strict';


const card = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapElement = document.querySelector(`.map`);

const houseTypes = {
  'palace': `Дворец`,
  'flat': `Квартира`,
  'house': `Дом`,
  'bungalow': `Бунгало`
};

const createAvatarPopup = (element, incomingData) => {
  if (!incomingData) {
    element.style.display = `none`;
    return;
  } else {
    element.src = incomingData;
  }
};

const createElementPopup = (element, incomingData) => {
  if (!incomingData) {
    element.style.display = `none`;
    return;
  } else {
    element.textContent = incomingData;
  }
};

const renderFeaturesPopup = (element, incomingData) => {
  element.innerHTML = ``;
  if (!incomingData.length) {
    element.style.display = `none`;
    return;
  }
  incomingData.forEach((feature) => {
    const li = document.createElement(`li`);
    li.classList.add(`popup__feature`);
    li.classList.add(`popup__feature--` + feature);
    element.appendChild(li);
  });
};

const renderPhotosPopup = (element, incomingData) => {
  element.innerHTML = ``;
  if (!incomingData.length) {
    element.style.display = `none`;
    return;
  }
  incomingData.forEach((photo) => {
    const img = document.createElement(`img`);
    img.classList.add(`popup__photo`);
    img.src = photo;
    img.width = `45`;
    img.height = `40`;
    img.alt = `Фотография жилья`;
    element.appendChild(img);
  });
};

const createPopup = (popup) => {
  const popupElement = card.cloneNode(true);

  renderPhotosPopup(popupElement.querySelector(`.popup__photos`), popup.offer.photos);
  renderFeaturesPopup(popupElement.querySelector(`.popup__features`), popup.offer.features);
  createElementPopup(popupElement.querySelector(`.popup__description`), popup.offer.description);
  createElementPopup(popupElement.querySelector(`.popup__text--capacity`), `${popup.offer.rooms} комнаты для ${popup.offer.guests} гостей`);
  createElementPopup(popupElement.querySelector(`.popup__text--time`), `Заезд после ${popup.offer.checkin}, выезд до ${popup.offer.checkout}`);
  createElementPopup(popupElement.querySelector(`.popup__type`), houseTypes[popup.offer.type]);
  createElementPopup(popupElement.querySelector(`.popup__text--price`), `${popup.offer.price}₽/ночь`);
  createElementPopup(popupElement.querySelector(`.popup__text--address`), popup.offer.address);
  createElementPopup(popupElement.querySelector(`.popup__title`), popup.offer.title);
  createAvatarPopup(popupElement.querySelector(`.popup__avatar`), popup.author.avatar);

  const popupClose = popupElement.querySelector(`.popup__close`);

  const removePopup = () => {
    popupElement.remove();
  };


  const hidePopupMouse = (evt) => {
    window.util.clickOnMouse(evt, removePopup);
  };

  const hidePopupEsc = (evt) => {
    window.util.clickOnEsc(evt, removePopup);
  };

  popupClose.addEventListener(`mousedown`, hidePopupMouse);
  window.addEventListener(`keydown`, hidePopupEsc);

  return popupElement;
};

const renderCard = (data) => {
  const mapPopup = document.querySelector(`.map__card`);
  if (mapPopup) {
    mapPopup.remove();
  }
  mapElement.appendChild(createPopup(data));
};

const removeCard = () => {
  const mapPopup = document.querySelector(`.map__card`);
  if (mapPopup) {
    mapPopup.remove();
  }
};

window.card = {renderCard, removeCard};
