function infoCardOnClickEH(event) {
  this.classList.toggle("minimized");
  this.style.removeProperty("bottom");

  if (this.classList.contains("minimized")) {
    this.scrollTop = 0;
  }
}

function infoCardMouseEnterEH(event) {
  if (this.classList.contains("minimized")) {
    this.style.bottom = "calc(-1 * (75vh - 100px))";
    return;
  }
  this.style.removeProperty("bottom");
}

function infoCardMouseLeaveEH(event) {
  this.style.removeProperty("bottom");
}

export { infoCardOnClickEH, infoCardMouseEnterEH, infoCardMouseLeaveEH };
