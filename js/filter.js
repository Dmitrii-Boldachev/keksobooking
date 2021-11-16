'use strict';


const MAX_PIN = 5;

const PRICE_RANGE = {
  LOW: 10000,
  HIGH: 50000
};

const mapFilters = document.querySelector(`.map__filters`);
const filterElements = mapFilters.querySelectorAll(`select, input`);
const typeHouseFilterElements = document.querySelector(`#housing-type`);
const priceFilterElements = document.querySelector(`#housing-price`);
const roomFilterElements = document.querySelector(`#housing-rooms`);
const guestFilterElements = document.querySelector(`#housing-guests`);
const featureFilterElements = document.querySelector(`#housing-features`);

let newData = [];

const filtrationItem = (elem, item, key) => {
  return elem.value === `any` ? true : elem.value === item[key].toString();
};

const filteringByType = (item) => {
  return filtrationItem(typeHouseFilterElements, item.offer, `type`);
};

const filtrationByPrice = (elem) => {
  if (priceFilterElements.value === `low`) {
    return elem.offer.price < PRICE_RANGE.LOW;
  } else if (priceFilterElements.value === `middle`) {
    return elem.offer.price >= PRICE_RANGE.LOW && elem.offer.price <= PRICE_RANGE.HIGH;
  } else if (priceFilterElements.value === `high`) {
    return elem.offer.price >= PRICE_RANGE.HIGH;
  } else {
    return elem.offer.price > 0;
  }
};

const filteringByRoom = (item) => {
  return filtrationItem(roomFilterElements, item.offer, `rooms`);
};

const filteringByGuest = (item) => {
  return filtrationItem(guestFilterElements, item.offer, `guests`);
};

const filteringByFeatures = (item) => {
  const checkedFeaturesItems = featureFilterElements.querySelectorAll(`input:checked`);
  return Array.from(checkedFeaturesItems).every((elem) => {
    return item.offer.features.includes(elem.value);
  });
};

const applyData = (data) => {
  return data.filter((elem) => {
    return (
      filteringByType(elem) && filtrationByPrice(elem) &&
      filteringByRoom(elem) && filteringByGuest(elem) && filteringByFeatures(elem)
    );
  })
    .slice(0, MAX_PIN);
};

const activateFilter = (data) => {
  newData = data;
  window.pin.renderPins(applyData(newData));
};

mapFilters.addEventListener(`change`, window.util.debounce(() => {
  window.card.removeCard();
  window.pin.removePins();
  window.pin.renderPins(applyData(newData));
}));


const resetFilter = () => {
  filterElements.forEach((elem) => {
    elem.value = `any`;
  });
};

window.filter = {resetFilter, activateFilter};
