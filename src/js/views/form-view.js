import { inputCheckEH, addCityEH } from "js/controllers/api-controller";
import { cityManager } from "js/models/city.js";

import SubmitBtn from "media/chevron-right.svg";
import City from "media/city.svg";

function createFormElement() {
  const formElement = document.createElement("form");
  formElement.classList.add("form-component");

  const innerHTML = `
    <input 
      type="text"
      placeholder="Enter a city "
      name="city"
      class="input-form"
    >
    <button type="submit" class="submit-btn-form">
      <img
        src="${SubmitBtn}"
        alt="submit"
        class="submit-img-form"
      />
    </button>
    `;
  formElement.innerHTML = innerHTML;

  return formElement;
}

function createCityTextElement(cityInput) {
  const cityText = document.createElement("p");
  cityText.className = "city-text";
  cityText.innerHTML = cityInput;
  cityText.style.position = "absolute";
  cityText.style.transform = "translate(-50%, 0)";

  return cityText;
}

function attachFormEventHandlers(formElement) {
  formElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    const parentElement = formElement.parentNode;
    parentElement.className = "city-group";

    const { success, cityInput, message } = await addCityEH(event, parentElement);
    if (!success) {
      // form validation, display error message using message too
      return;
    }
    
    const cityText = createCityTextElement(cityInput);
    cityText.style.left = formElement.style.left;
    cityText.style.top = formElement.style.top;
    
    parentElement.append(cityText);

    formElement.remove();
  });

  formElement.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  const inputElement = formElement.querySelector("input");
  console.log(inputElement);
  inputElement.addEventListener("input", (event) => {
    inputCheckEH(event, inputElement);
  });
}

function createForm() {
  const formElement = createFormElement();
  attachFormEventHandlers(formElement);

  formElement.style.left = `0%`;
  formElement.style.top = `-40px`;
  formElement.style.transform = "translate(-50%, -50%)";

  return formElement;
}

function createCityElement() {
  const cityElement = document.createElement("img");
  cityElement.src = City;
  cityElement.style.position = "absolute";
  cityElement.style.left = `0%`;
  cityElement.style.top = `0%`;
  cityElement.style.transform = "translate(-50%, -50%)";
  return cityElement;
}

function checkValidNewCityPos(xPosPercent, yPosPercent) {
  const minDistance = 30;
  const cities = cityManager.getCities();
  for (let city in cities) {
    city = cities[city];
    let cityXPosPercent = city.cityElement.style.left;
    cityXPosPercent = Number(cityXPosPercent.substring(0, cityXPosPercent.length - 1));
    let cityYPosPercent = city.cityElement.style.top;
    cityYPosPercent = Number(cityYPosPercent.substring(0, cityYPosPercent.length - 1));

    const xDiff = xPosPercent - cityXPosPercent;
    const xDiffSquared = xDiff * xDiff;

    const yDiff = yPosPercent - cityYPosPercent;
    const yDiffSquared = yDiff * yDiff;

    const dist = Math.sqrt(xDiffSquared + yDiffSquared);
    if (dist < minDistance) {
      return false;
    }
  }
  return true;
}

function createCityGroup(event, domRect) {
  let containerGroup = document.querySelector(".city-form-group");

  const xPosPercent = ((event.pageX - domRect.x) / domRect.width) * 100;
  const yPosPercent = ((event.pageY - domRect.y) / domRect.height) * 100;

  if (!checkValidNewCityPos(xPosPercent, yPosPercent)) {
    return null;
  }

  if (containerGroup) {
    containerGroup.remove();
  } 

  containerGroup = document.createElement("div");
  containerGroup.classList.add("city-form-group");
  containerGroup.style.position = "relative";
  containerGroup.style.left = `${xPosPercent}%`;
  containerGroup.style.top = `${yPosPercent}%`;

  const formElement = createForm();
  const cityElement = createCityElement();

  containerGroup.append(formElement);
  containerGroup.append(cityElement);

  return containerGroup;
}

function initializeClickableArea() {
  const cityArea = document.querySelector(".city-area");
  cityArea.addEventListener("click", (event) => {
    const domRect = cityArea.getBoundingClientRect();
    const containerGroup = createCityGroup(event, domRect);
    if (!containerGroup) {
      return;
    }

    cityArea.append(containerGroup);
  });
}

export { initializeClickableArea };
