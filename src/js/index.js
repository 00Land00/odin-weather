import "styles/supreme.css";
import "styles/reset.css";
import "styles/layout.css";
import "styles/form.css";

import { initializeClickableArea } from "js/views/form-view";
import { initializeInfoCards } from "js/views/info-card-view";

window.addEventListener("DOMContentLoaded", () => {
  initializeClickableArea();
  initializeInfoCards();
});

/*
    TODO: info card - data display
    TODO: form error validation
    TODO: mobile view
*/
