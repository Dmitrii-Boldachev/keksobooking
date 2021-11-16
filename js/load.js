'use strict';


const url = `https://21.javascript.pages.academy/keksobooking/data`;

const StatusCode = {
  OK: 200
};
const TIMEOUT_IN_MS = 1000;

window.load = (onSuccess, onError) => {

  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;


  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });
  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  xhr.open(`GET`, url);
  xhr.send();
};
