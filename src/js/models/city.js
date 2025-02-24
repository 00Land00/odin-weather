const cityManager = (function () {
  let curId = 0;
  const maxCapacity = 3;
  const cities = [];

  function createCity(name, weatherData, cityElement) {
    if (cities.length >= maxCapacity) {
      cities[0].cityElement.remove();
      cities.shift();
    }

    return {
      id: curId++,
      name: name,
      weatherData: JSON.stringify(weatherData),
      cityElement: cityElement,
    };
  }

  function findCity(id) {
    return cities.find((city) => city.id === id);
  }

  function updateCity(id, newWeatherData) {
    const city = findCity(id);
    if (city) city.weatherData = JSON.stringify(newWeatherData);
  }

  function removeCity(id) {
    cities = cities.filter((city) => city.id !== id);
  }

  function getAllCities() {
    return [...cities];
  }

  return {
    addCity: (name, weatherData, cityElement) => cities.push(createCity(name, weatherData, cityElement)),
    findCity: findCity,
    updateCity: updateCity,
    removeCity: removeCity,
    getCities: getAllCities,
  };
})();

export { cityManager };
