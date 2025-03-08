import {
  infoCardOnClickEH,
  infoCardMouseEnterEH,
  infoCardMouseLeaveEH,
} from "js/controllers/info-card-controller.js";

import HumidityIcon from "media/water-percent.svg";
import WindSpeedIcon from "media/weather-windy.svg";
import PrecipitationIcon from "media/weather-pouring.svg";
import PrecipProbIcon from "media/cloud-percent-outline.svg";

function populateInfoCardValues(city) {
  const infoCards = document.querySelectorAll(".info-card");
  const innerHTML = `
    <div class="handle-bar"></div>
    <div class="info-content">
      <div class="basic-group">
        <div class="today">
          <div class="city-name">${city.name}</div>
          <div class="temp">${Math.round(city.weatherData.temp)}&deg;</div>
          <div class="weather-desc">${city.weatherData.description}</div>
        </div>
        <div class="future">
          <div class="tomorrow">
            <div>Tomorrow</div>
            <div class="temp">${Math.round(city.weatherData.tomorrow.temp)}&deg;</div>
          </div>
          <div class="day-after">
            <div>Day after Tomorrow</div>
            <div class="temp">${Math.round(city.weatherData.dayAfter.temp)}&deg;</div>
          </div>
        </div>
      </div>
      <div class="extra-group">
        <div class="grid-section">
          <div class="grid">
            <div class="cell">
              <img
                src="${HumidityIcon}"
                alt="humidity"
              />
              <div class="details">
                <div class="value">${city.weatherData.humidity}<small>%</small></div>
                <div class="title">Humidity</div>
              </div>
            </div>
            <div class="cell">
              <img
                src="${WindSpeedIcon}"
                alt="wind speed"
              />
              <div class="details">
                <div class="value">${city.weatherData.windspeed}<small>kph</small></div>
                <div class="title">Wind Speed</div>
              </div>
            </div>
            <div class="cell">
              <img
                src="${PrecipitationIcon}"
                alt="precipitation"
              />
              <div class="details">
                <div class="value">${city.weatherData.precip}<small>mm</small></div>
                <div class="title">Precipitation</div>
              </div>
            </div>
            <div class="cell">
              <img
                src="${PrecipProbIcon}"
                alt="precipitation probability"
              />
              <div class="details">
                <div class="value">${city.weatherData.precipprob}<small>%</small></div>
                <div class="title">Precip. Prob.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  infoCards.forEach((infoCard) => {
    infoCard.innerHTML = innerHTML;
  });
}

function initializeInfoCards() {
  const leftInfoCard = document.querySelector(".info-card.left");
  const rightInfoCard = document.querySelector(".info-card.right");

  leftInfoCard.addEventListener("click", infoCardOnClickEH.bind(leftInfoCard));
  leftInfoCard.addEventListener(
    "mouseenter",
    infoCardMouseEnterEH.bind(leftInfoCard),
  );
  leftInfoCard.addEventListener(
    "mouseleave",
    infoCardMouseLeaveEH.bind(leftInfoCard),
  );

  rightInfoCard.addEventListener(
    "click",
    infoCardOnClickEH.bind(rightInfoCard),
  );
  rightInfoCard.addEventListener(
    "mouseenter",
    infoCardMouseEnterEH.bind(rightInfoCard),
  );
  rightInfoCard.addEventListener(
    "mouseleave",
    infoCardMouseLeaveEH.bind(rightInfoCard),
  );

  document.addEventListener("click", (event) => {
    if (
      !leftInfoCard.contains(event.target) &&
      !rightInfoCard.contains(event.target)
    ) {
      leftInfoCard.classList.add("hidden");
      rightInfoCard.classList.add("hidden");
    }
  });
}

function addGradient(temp) {
  let tempWord = '';
  if (temp >= 30) tempWord = 'hot';
  else if (temp >= 20) tempWord = 'warm';
  else if (temp >= 10) tempWord = 'mild';
  else if (temp >= 0) tempWord = 'cool';
  else if (temp >= -20) tempWord = 'cold';
  else tempWord = 'frigid';

  const infoCards = document.querySelectorAll(".info-card");
  infoCards.forEach((infoCard) => {
    if (tempWord !== 'frigid') {
      const handleBar = infoCard.querySelector(".handle-bar");
      handleBar.style.backgroundColor = "#FFFFFF";
      infoCard.style.color = '#FFFFFF';
      const imgs = infoCard.querySelectorAll("img");
      imgs.forEach(img => {
        img.classList.add("white-svg");
      });

      infoCard.style.setProperty("--border-color", "white");
    }
    infoCard.classList.add(tempWord);
  });
}

function displayInfoCard(city) {
  const leftInfoCard = document.querySelector(".info-card.left");
  const rightInfoCard = document.querySelector(".info-card.right");

  populateInfoCardValues(city);
  addGradient(Math.round(city.weatherData.temp));

  const leftPos = parseFloat(city.cityElement.style.left) / 100;
  if (leftPos > 0.5) {
    leftInfoCard.classList.remove("hidden");
    leftInfoCard.classList.add("minimized");
    leftInfoCard.scrollTop = 0;
    rightInfoCard.classList.add("hidden");
  } else {
    leftInfoCard.classList.add("hidden");
    rightInfoCard.classList.remove("hidden");
    rightInfoCard.scrollTop = 0;
    rightInfoCard.classList.add("minimized");
  }
}

export { initializeInfoCards, displayInfoCard };
