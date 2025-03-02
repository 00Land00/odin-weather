const cityManager = (function () {
  let curId = 0;
  const maxCapacity = 5;
  let cities = [];
  let latMinMax = [];
  let lonMinMax = [];

  function updateLatLonMinMax() {
    const cityList = getAllCities();
    const { minLat, maxLat, minLon, maxLon } = cityList.reduce(
      (acc, city) => ({
        minLat: Math.min(acc.minLat, city.weatherData.latitude),
        maxLat: Math.max(acc.maxLat, city.weatherData.latitude),
        minLon: Math.min(acc.minLon, city.weatherData.longitude),
        maxLon: Math.max(acc.maxLon, city.weatherData.longitude),
      }),
      {
        minLat: Infinity,
        maxLat: -Infinity,
        minLon: Infinity,
        maxLon: -Infinity,
      },
    );
    latMinMax = [minLat, maxLat];
    lonMinMax = [minLon, maxLon];
  }

  function createCity(name, weatherData, cityElement) {
    if (cities.length >= maxCapacity) {
      cities[0].cityElement.remove();
      cities.shift();
    }

    return {
      id: curId++,
      name: name,
      weatherData: weatherData,
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
    cities = cities.filter((city) => {
      if (city.id === id) {
        city.cityElement.remove();
      }
      return city.id !== id;
    });
  }

  function getAllCities() {
    return [...cities];
  }

  function updateCityPositions() {
    if (cities.length === 1) {
      cities[0].cityElement.style.top = `50%`;
      cities[0].cityElement.style.left = `50%`;
      return;
    }

    cities.forEach(city => {
      const latRange = latMinMax[1] - latMinMax[0];
      const latNormalized = (city.weatherData.latitude - latMinMax[0]) / latRange;

      const lonRange = lonMinMax[1] - lonMinMax[0];
      const lonNormalized = (city.weatherData.longitude - lonMinMax[0]) / lonRange;

      city.cityElement.style.left = `${lonNormalized * 100}%`;
      city.cityElement.style.top = `${(1 - latNormalized) * 100}%`;
    });
  }

  return {
    addCity: (name, weatherData, cityElement) => {
      for (let i in cities) {
        if (cities[i].name === name) {
          removeCity(cities[i].id);
          break;
        }
      }

      const city = createCity(name, weatherData, cityElement);
      cities.push(city);

      updateLatLonMinMax();

      return city;
    },
    findCity: findCity,
    updateCity: updateCity,
    removeCity: removeCity,
    getCities: getAllCities,
    updateCityPositions: updateCityPositions,
  };
})();

export { cityManager };
