import {
  infoCardOnClickEH,
  infoCardMouseEnterEH,
  infoCardMouseLeaveEH,
} from "js/controllers/info-card-controller.js";

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
    if (!leftInfoCard.contains(event.target) && !rightInfoCard.contains(event.target)) {
      leftInfoCard.classList.add("hidden");
      rightInfoCard.classList.add("hidden");
    }
  })
}

function displayInfoCard(city) {
  const leftInfoCard = document.querySelector(".info-card.left");
  const rightInfoCard = document.querySelector(".info-card.right");

  // set values to display to both cards

  const leftPos = parseFloat(city.cityElement.style.left) / 100;
  if (leftPos > 0.5) {
    leftInfoCard.classList.remove("hidden");
    rightInfoCard.classList.add("hidden");
  } else {
    leftInfoCard.classList.add("hidden");
    rightInfoCard.classList.remove("hidden");
  }
}

export { initializeInfoCards, displayInfoCard };
