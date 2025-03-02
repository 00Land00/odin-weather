import { getLocationWeatherData } from "js/services/weather-service.js";
import { cityManager } from "js/models/city.js";

function inputCheckEH(event, inputElement) {
  const letterRegex = /^[A-Za-z]+$/g;
  if (!letterRegex.test(event.target.value)) {
    inputElement.value = inputElement.value.substring(
      0,
      inputElement.value.length - 1,
    );
  }
}

function processResponseData(responseJson) {
  return {
    name: responseJson.resolvedAddress,
    latitude: responseJson.latitude,
    longitude: responseJson.longitude,
    temp: responseJson.currentConditions.temp,
    humidity: responseJson.currentConditions.humidity,
    windspeed: responseJson.currentConditions.windspeed,
    precipprob: responseJson.currentConditions.precipprob,
    precip: responseJson.currentConditions.precip,
    description: responseJson.description,
    tomorrow: {
      date: responseJson.days[1].datetime,
      temp: responseJson.days[1].temp,
    },
    dayAfter: {
      date: responseJson.days[2].datetime,
      temp: responseJson.days[2].temp,
    },
  };
}

async function addCityEH(event, cityElement) {
  const formData = new FormData(event.target);
  const cityInput = formData.get("city");

  try {
    const responseJson = await getLocationWeatherData(cityInput);
    const weatherData = processResponseData(responseJson);
    const city = cityManager.addCity(weatherData.name, weatherData, cityElement);
    return { success: true, city: city, message: "" };
  } catch (error) {
    console.error(error);
    return { success: false, city: null, message: error.message };
  }
}

async function updateCurrentCityEH(event) {
  // this will be used later on when we display the weather data
  // this will require a refresh/update icon somewhere though.
}

// updateAllCitiesEH
async function updateAllCitiesEH(event) {}

export { inputCheckEH, addCityEH, updateCurrentCityEH, updateAllCitiesEH };
