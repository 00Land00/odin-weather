import { cityManager } from "js/models/city.js";
import { inputCheckEH, addCityEH } from "js/controllers/form-controller";
import { displayInfoCard } from "js/views/info-card-view";

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

function createCityTextElement(city) {
  const cityText = document.createElement("p");
  cityText.classList.add("city-text");
  cityText.innerHTML = city.name;

  cityText.addEventListener("click", (event) => {
    event.stopPropagation();
    displayInfoCard(city);
  });

  return cityText;
}

function attachFormEventHandlers(formElement) {
  formElement.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const inputElement = formElement.querySelector("input");
    inputElement.setCustomValidity("");
    inputElement.reportValidity();

    const parentElement = formElement.parentNode;
    
    const { success, city, message } = await addCityEH(event, parentElement);
    if (!success) {
      inputElement.setCustomValidity(message);
      inputElement.reportValidity();
      return;
    }
    
    parentElement.className = "city-group";
    const cityText = createCityTextElement(city);
    parentElement.append(cityText);
    const cityMarker = parentElement.querySelector(".city-marker");
    cityMarker.addEventListener("click", (event) => {
      event.stopPropagation();
      displayInfoCard(city);
    });

    cityManager.updateCityPositions();

    formElement.remove();
  });

  formElement.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  const inputElement = formElement.querySelector("input");
  inputElement.addEventListener("input", (event) => {
    inputCheckEH(event, inputElement);
    inputElement.setCustomValidity("");
  });
}

function createForm() {
  const formElement = createFormElement();
  attachFormEventHandlers(formElement);
  formElement.classList.add("city-form");

  return formElement;
}

function createCityElement() {
  const cityElement = document.createElement("img");
  cityElement.src = City;
  cityElement.classList.add("city-marker");

  return cityElement;
}

function checkValidNewCityPos(xPosPercent, yPosPercent) {
  const minDistance = 10;
  const cities = cityManager.getCities();
  for (let city in cities) {
    city = cities[city];
    let cityXPosPercent = city.cityElement.style.left;
    cityXPosPercent = Number(
      cityXPosPercent.substring(0, cityXPosPercent.length - 1),
    );
    let cityYPosPercent = city.cityElement.style.top;
    cityYPosPercent = Number(
      cityYPosPercent.substring(0, cityYPosPercent.length - 1),
    );

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
    cityArea.querySelector(".input-form").focus();
  });

  document.addEventListener("click", (event) => {
    const cityFormGroup = document.querySelector(".city-form-group");
    if (cityFormGroup) {
      const cityArea = document.querySelector(".city-area");
      if (!cityArea.contains(event.target)) {
        cityFormGroup.remove();
      }
    }
  });
}

export { initializeClickableArea };
