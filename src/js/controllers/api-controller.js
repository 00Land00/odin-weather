import { cityManager } from "js/models/city.js";

function inputCheckEH(event, inputElement) {
  const letterRegex = /^[A-Za-z]+$/g;
  if (!letterRegex.test(event.target.value)) {
    inputElement.value = inputElement.value.substring(0, inputElement.value.length - 1);
  }
}

function processResponseData(weatherData) {}

async function addCityEH(event, cityElement) {
  const formData = new FormData(event.target);
  const cityInput = formData.get('city');
  
  // make api call
  // processResponseData

  cityManager.addCity(cityInput, {}, cityElement);

  return { success: true, cityInput, message: '', };
}

async function updateCurrentCityEH(event) {
  // this will be used later on when we display the weather data
  // this will require a refresh/update icon somewhere though.
}

// updateAllCitiesEH
async function updateAllCitiesEH(event) {}

export { inputCheckEH, addCityEH, updateCurrentCityEH, updateAllCitiesEH };
