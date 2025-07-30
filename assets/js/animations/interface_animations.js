// BUTTONS

function toggleImageVisibilityOn() {
  var imageBtnOn = document.getElementById("buttonImageOn");
  var imageBtnOff = document.getElementById("buttonImageOff");

  imageBtnOn.style.color = "var(--lightgray)";
  imageBtnOn.style.background = "var(--black)";

  imageBtnOff.style.color = "";
  imageBtnOff.style.background = "";
  ImageVisibility = true;
  generate();
}

function toggleImageVisibilityOff() {
  var imageBtnOn = document.getElementById("buttonImageOn");
  var imageBtnOff = document.getElementById("buttonImageOff");
  imageBtnOff.style.color = "var(--lightgray)";
  imageBtnOff.style.background = "var(--black)";

  imageBtnOn.style.color = "";
  imageBtnOn.style.background = "";
  ImageVisibility = false;

  generate();
}

function toggleStep() {
  var stepBtn = document.getElementById("stepBtn");
  var autoBtn = document.getElementById("autoBtn");
  var colorModeBtn = document.getElementById("colorModeBtn");

  colorModeBtn.style.color = "";
  colorModeBtn.style.background = "";

  stepBtn.style.color = "var(--lightgray)";
  stepBtn.style.background = "var(--black)";

  autoBtn.style.color = "";
  autoBtn.style.background = "";

  dotMode = "steps";

  document.getElementById("colorModeSettings").style.display = "none";
  document.getElementById("stepSettings").style.display = "flex";
  document.getElementById("autoSettings").style.display = "none";

  generate();
}

function toggleAuto() {
  var stepBtn = document.getElementById("stepBtn");
  var autoBtn = document.getElementById("autoBtn");
  var colorModeBtn = document.getElementById("colorModeBtn");

  colorModeBtn.style.color = "";
  colorModeBtn.style.background = "";

  stepBtn.style.color = "";
  stepBtn.style.background = "";

  autoBtn.style.color = "var(--lightgray)";
  autoBtn.style.background = "var(--black)";

  dotMode = "auto";

  document.getElementById("colorModeSettings").style.display = "none";
  document.getElementById("autoSettings").style.display = "flex";
  document.getElementById("stepSettings").style.display = "none";

  generate();
}

function toggleColorMode() {
  var stepBtn = document.getElementById("stepBtn");
  var autoBtn = document.getElementById("autoBtn");
  var colorModeBtn = document.getElementById("colorModeBtn");

  stepBtn.style.color = "";
  stepBtn.style.background = "";

  autoBtn.style.color = "";
  autoBtn.style.background = "";

  colorModeBtn.style.color = "var(--lightgray)";
  colorModeBtn.style.background = "var(--black)";

  dotMode = "color";

  document.getElementById("colorModeSettings").style.display = "flex";
  document.getElementById("autoSettings").style.display = "none";
  document.getElementById("stepSettings").style.display = "none";

  generate();
}

function toggleColor() {
  var colorBtn = document.getElementById("colorBtn");
  var bwBtn = document.getElementById("bwBtn");

  colorBtn.style.color = "var(--lightgray)";
  colorBtn.style.background = "var(--black)";

  bwBtn.style.color = "";
  bwBtn.style.background = "";
  isColors = true;
  generate();
}

function toggleBW() {
  var colorBtn = document.getElementById("colorBtn");
  var bwBtn = document.getElementById("bwBtn");

  colorBtn.style.color = "";
  colorBtn.style.background = "";

  bwBtn.style.color = "var(--lightgray)";
  bwBtn.style.background = "var(--black)";
  isColors = false;

  generate();
}

function toggleEllipse() {
  var ellipseBtn = document.getElementById("ellipseBtn");
  var rectBtn = document.getElementById("rectBtn");

  ellipseBtn.style.color = "var(--lightgray)";
  ellipseBtn.style.background = "var(--black)";

  rectBtn.style.color = "";
  rectBtn.style.background = "";
  isRect = false;
  generate();
}

function toggleRect() {
  var ellipseBtn = document.getElementById("ellipseBtn");
  var rectBtn = document.getElementById("rectBtn");

  ellipseBtn.style.color = "";
  ellipseBtn.style.background = "";

  rectBtn.style.color = "var(--lightgray)";
  rectBtn.style.background = "var(--black)";
  isRect = true;

  generate();
}

function toggleLeft() {
  var leftBtn = document.getElementById("leftBtn");
  var centerBtn = document.getElementById("centerBtn");
  var rightBtn = document.getElementById("rightBtn");

  leftBtn.style.color = "var(--lightgray)";
  leftBtn.style.background = "var(--black)";

  centerBtn.style.color = "";
  centerBtn.style.background = "";

  rightBtn.style.color = "";
  rightBtn.style.background = "";
  align = "left";
  generate();
}
function toggleCenter() {
  var leftBtn = document.getElementById("leftBtn");
  var centerBtn = document.getElementById("centerBtn");
  var rightBtn = document.getElementById("rightBtn");

  leftBtn.style.color = "";
  leftBtn.style.background = "";

  centerBtn.style.color = "var(--lightgray)";
  centerBtn.style.background = "var(--black)";

  rightBtn.style.color = "";
  rightBtn.style.background = "";

  align = "center";
  generate();
}
function toggleRight() {
  var leftBtn = document.getElementById("leftBtn");
  var centerBtn = document.getElementById("centerBtn");
  var rightBtn = document.getElementById("rightBtn");

  leftBtn.style.color = "";
  leftBtn.style.background = "";

  centerBtn.style.color = "";
  centerBtn.style.background = "";

  rightBtn.style.color = "var(--lightgray)";
  rightBtn.style.background = "var(--black)";

  align = "right";
  generate();
}

function sliderSync() {
  let sliderContainerArray = document.querySelectorAll(".sliderContainer");
  var thumbnWidth = 50;

  sliderContainerArray.forEach((container) => {
    const range = container.querySelector('input[type="range"]');

    const hint = container.querySelector('input[type="number"]');

    let offset =
      range.clientWidth / (parseInt(range.max) - parseInt(range.min));

    hint.style.left =
      (range.valueAsNumber - parseInt(range.min)) * offset -
      hint.offsetWidth / 2 -
      (range.valueAsNumber / (parseInt(range.max) - parseInt(range.min)) -
        0.5) *
        thumbnWidth +
      "px";
  });

  let threshRange1 = document.getElementById("sliderBrightnessThreshhold");
  let threshRange2 = document.getElementById("sliderBrightnessThreshhold2");

  let threshinput1 = document.getElementById("inputBrightnessThreshhold");
  let threshinput2 = document.getElementById("inputBrightnessThreshhold2");

  let R1offset =
    threshRange1.clientWidth /
    (parseInt(threshRange1.max) - parseInt(threshRange1.min));

  threshinput1.style.left =
    (threshRange1.valueAsNumber - parseInt(threshRange1.min)) * R1offset -
    threshinput1.offsetWidth / 2 -
    (threshRange1.valueAsNumber / parseInt(threshRange1.max) -
      parseInt(threshRange1.min) -
      0.5) *
      thumbnWidth +
    "px";

  let R2offset =
    threshRange2.clientWidth /
    (parseInt(threshRange2.max) - parseInt(threshRange2.min));

  threshinput2.style.left =
    (threshRange2.valueAsNumber - parseInt(threshRange2.min)) * R2offset -
    threshinput2.offsetWidth / 2 -
    (threshRange2.valueAsNumber / parseInt(threshRange2.max) -
      parseInt(threshRange2.min) -
      0.5) *
      thumbnWidth +
    "px";
}

const dropzone = document.getElementById("dropZone");
const uploadBtns = document.getElementById("uploadBtns");
const welcomeText = document.getElementById("welcomeText");

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropzone.addEventListener(eventName, preventDefaults, false);
  uploadBtns.addEventListener(eventName, preventDefaults, false);
  welcomeText.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(evt) {
  evt.preventDefault();
  evt.stopPropagation();
}

["dragenter", "dragover"].forEach((eventName) => {
  dropzone.addEventListener(eventName, markzone, false);
});

["dragleave", "drop"].forEach((eventName) => {
  dropzone.addEventListener(eventName, unmarkzone, false);
});

function markzone(evt) {
  dropzone.classList.add("markzone");
  uploadBtns.classList.add("markBtns");
  welcomeText.classList.add("markBtns");
}

function unmarkzone(evt) {
  dropzone.classList.remove("markzone");
  uploadBtns.classList.remove("markBtns");
  welcomeText.classList.remove("markBtns");
}
