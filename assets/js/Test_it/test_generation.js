const vh = window.innerHeight;
const vw = window.innerWidth;

let grayScale = [];
let grayScaleIndex = [];
const valueRange = 255;

// Buttons
const buttonActivateBuffer = document.getElementById("buttonActivateBuffer");
const buttonRemoveBuffer = document.getElementById("buttonRemoveBuffer");
const printButton = document.getElementById("printButton");
const buttonImageVisibility = document.getElementById("buttonImageVisibility");

//Other UI Elements
const uploadInput = document.getElementById("file-selector");
const fontUploadInput = document.getElementById("font-selector");
const uploadContainer = document.getElementById("uploadContainer");

const textAreas = document.getElementById("textAreas");
const canvasContainer = document.getElementById("canvasContainer");
const positionContainer = document.getElementById("positionContainer");

const inputControlsLeft = document.getElementById("inputControlsLeft");
const inputControlsRight = document.getElementById("inputControlsRight");

const stepSettings = document.getElementById("stepSettings");
const autoSettings = document.getElementById("autoSettings");

let dotMode = "steps";

let align = "left";

let isUploaded = false;

let ImageVisibility = false;

let isColors = true;

let isRect = false;

let points = [];

let font;
let isImageRedrawButton;
let isImageRedraw = 0;
let img;
let w;
let h;
let ImageHeight;
let ImageWidth;
let ImageRatio;
let resizeRatio;

let canvasContainerRect;
let canvasRect;

let sliderTextSize;
let inputTextSize;
var sliderLineHeight;
let inputLineHeight;

var sliderSizeDot1;
let inputSizeDot1;
var sliderSizeDot2;
let inputSizeDot2;
var sliderSizeDot3;
let inputSizeDot3;

var sliderDis;
let inputDis;
var sliderBrightnessThreshhold;
let inputBrightnessThreshhold;
var sliderBrightnessThreshhold2;
let inputBrightnessThreshhold2;
var sliderStrokeSize;
let inputStrokeSize;
var sliderYPos;
let inputYPos;
var sliderXPos;
let inputXPos;
var sliderTextBoxWidth;
let inputTextBoxWidth;
var sliderTextBoxHeight;
var inputTextBoxHeight;
let sliderTileGap;
let inputTileGap;
let inputGrayscale;
let sliderGrayscale;

let inputRTh;
let sliderRTh;
let inputGTh;
let sliderGTh;
let inputBTh;
let sliderBTh;
let inputRSize;
let sliderRSize;
let inputGSize;
let sliderGSize;
let inputBSize;
let sliderBSize;

let canvas;

function preload() {
  font = loadFont("assets/fonts/NotoSansJP-Medium.ttf");
  let newFont = new FontFace(
    "CustomFont",
    `url(assets/fonts/NotoSansJP-Medium.ttf)`
  );

  newFont.load().then((loadedFont) => {
    // Die Schriftart dem Dokument hinzufügen
    document.fonts.add(loadedFont);
  });
}

function setup() {
  uploadUi();

  defaultColor = color(0);

  angleMode(DEGREES);
  rectMode(CENTER);
  ellipseMode(CENTER);

  uploadInput.addEventListener("change", handleFileSelect, false);
  fontUploadInput.addEventListener("change", handleFontFileSelect, false);
}
function handleDemoFile() {
  let loaderContainer = document.getElementById("loader-container");
  loaderContainer.style.display = "flex";
  uploadInput.classList.add("invisible");
  uploadContainer.classList.add("invisible");
  loadImage("assets/img/demoImage.png", (loadedImage) => {
    img = loadedImage;
    img.loadPixels();
    // Prepare grayscale values
    for (let q = 0; q < valueRange; q++) {
      let grayScaleValue = floor(map(q, 0, valueRange - 1, 0, 255));
      grayScale[q] = grayScaleValue;
    }

    for (let i = 0; i < img.width; i++) {
      for (let j = 0; j < img.height; j++) {
        const pixelIndex = (i + j * img.width) * 4;
        const r = img.pixels[pixelIndex];
        const g = img.pixels[pixelIndex + 1];
        const b = img.pixels[pixelIndex + 2];
        let avg = floor((r + g + b) / 3);

        grayScaleIndex[pixelIndex] = floor(map(avg, 0, 255, 0, 255));
      }
    }

    canvas = createCanvas(ImageWidth, ImageHeight).parent(positionContainer);
    workUi();
    isUploaded = true;
    loadSliders();
    windowResized();
    canvasRect = document
      .getElementById("defaultCanvas0")
      .getBoundingClientRect();

    defaultWidth = canvasRect.width;
    defaultHeight = canvasRect.height;
    defaultContent =
      "This is a demo text. Here you can write what ever you'd like to write about. Just double click this textbox to edit. You can also drag this textbox around to reposition it. To resize it simply click and drag the bottom left corner. Feel free to add multible Textboxes.";
    defaultLineHeight = 70;
    addTextBox();
    generate();

    defaultContent = "Type here";
    defaultWidth = 550;
    defaultHeight = 250;
    defaultLineHeight = 70;
  });
}

function handleFileDrop(event) {
  let loaderContainer = document.getElementById("loader-container");
  loaderContainer.style.display = "flex";
  uploadInput.classList.add("invisible");
  uploadContainer.classList.add("invisible");

  const file = event.dataTransfer.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      loadImage(e.target.result, (loadedImage) => {
        img = loadedImage;
        img.loadPixels();
        // Prepare grayscale values
        for (let q = 0; q < valueRange; q++) {
          let grayScaleValue = floor(map(q, 0, valueRange - 1, 0, 255));
          grayScale[q] = grayScaleValue;
        }

        for (let i = 0; i < img.width; i++) {
          for (let j = 0; j < img.height; j++) {
            const pixelIndex = (i + j * img.width) * 4;
            const r = img.pixels[pixelIndex];
            const g = img.pixels[pixelIndex + 1];
            const b = img.pixels[pixelIndex + 2];
            let avg = floor((r + g + b) / 3);

            grayScaleIndex[pixelIndex] = floor(map(avg, 0, 255, 0, 255));
          }
        }

        canvas = createCanvas(ImageWidth, ImageHeight).parent(
          positionContainer
        );
        workUi();
        loadSliders();

        isUploaded = true;
        windowResized();
        canvasRect = document
          .getElementById("defaultCanvas0")
          .getBoundingClientRect();

        defaultWidth = canvasRect.width;
        defaultHeight = canvasRect.height;
        defaultContent =
          "This is a demo text. Here you can write what ever you'd like to write about. Just double click this textbox to edit. You can also drag this textbox around to reposition it. To resize it simply click and drag the bottom left corner. Feel free to add multible Textboxes.";
        defaultLineHeight = 70;
        addTextBox();
        generate();

        defaultContent = "Type here";
        defaultWidth = 550;
        defaultHeight = 250;
        defaultLineHeight = 70;
      });
    };
    reader.readAsDataURL(file);
  }
}

function handleFileSelect(event) {
  let loaderContainer = document.getElementById("loader-container");
  loaderContainer.style.display = "flex";

  uploadInput.classList.add("invisible");
  uploadContainer.classList.add("invisible");

  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      loadImage(e.target.result, (loadedImage) => {
        img = loadedImage;
        img.loadPixels();
        // Prepare grayscale values
        for (let q = 0; q < valueRange; q++) {
          let grayScaleValue = floor(map(q, 0, valueRange - 1, 0, 255));
          grayScale[q] = grayScaleValue;
        }

        for (let i = 0; i < img.width; i++) {
          for (let j = 0; j < img.height; j++) {
            const pixelIndex = (i + j * img.width) * 4;
            const r = img.pixels[pixelIndex];
            const g = img.pixels[pixelIndex + 1];
            const b = img.pixels[pixelIndex + 2];
            let avg = floor((r + g + b) / 3);

            grayScaleIndex[pixelIndex] = floor(map(avg, 0, 255, 0, 255));
          }
        }

        canvas = createCanvas(ImageWidth, ImageHeight).parent(
          positionContainer
        );
        workUi();
        isUploaded = true;
        loadSliders();
        windowResized();
        canvasRect = document
          .getElementById("defaultCanvas0")
          .getBoundingClientRect();

        defaultWidth = canvasRect.width;
        defaultHeight = canvasRect.height;
        defaultContent =
          "This is a demo text. Here you can write what ever you'd like to write about. Just double click this textbox to edit. You can also drag this textbox around to reposition it. To resize it simply click and drag the bottom left corner. Feel free to add multible Textboxes.";
        defaultLineHeight = 70;
        addTextBox();
        generate();

        defaultContent = "Type here";
        defaultWidth = 550;
        defaultHeight = 250;
        defaultLineHeight = 70;
      });
    };
    reader.readAsDataURL(file);
  }
}

function handleFontFileSelect(event) {
  const fontFile = event.target.files[0];
  if (fontFile) {
    const fontReader = new FileReader();
    fontReader.onload = function (e) {
      let fontDataUrl = e.target.result;
      let newFont = new FontFace("CustomFont", `url(${fontDataUrl})`);

      newFont.load().then((loadedFont) => {
        // Die Schriftart dem Dokument hinzufügen
        document.fonts.add(loadedFont);
      });

      loadFont(e.target.result, (loadedFont) => {
        font = loadedFont;
        generate();
      });
    };
    fontReader.readAsDataURL(fontFile);
  }
}

function uploadUi() {
  let p5Canvas = document.getElementById("defaultCanvas0");

  p5Canvas.classList.add("invisible");
}

function workUi() {
  p5Canvas = document.getElementById("defaultCanvas0");
  p5Canvas.classList.add("visible");
  inputControlsLeft.classList.add("visible");

  p5Canvas.classList.remove("invisible");
  inputControlsLeft.classList.remove("invisible");

  let loaderContainer = document.getElementById("loader-container");

  loaderContainer.classList.add("invisible");
}

function loadSliders() {
  // Text Settings
  inputTextSize = document.getElementById("inputTextSize");
  sliderTextSize = document.getElementById("sliderTextSize");
  inputTextSize.value = sliderTextSize.value;

  inputLineHeight = document.getElementById("inputLineHeight");
  sliderLineHeight = document.getElementById("sliderLineHeight");
  inputLineHeight.value = sliderLineHeight.value;

  // Image Settings

  inputTileGap = document.getElementById("inputTileGap");
  sliderTileGap = document.getElementById("sliderTileGap");
  inputTileGap.value = sliderTileGap.value;

  inputSizeDot1 = document.getElementById("inputSizeDot1");
  sliderSizeDot1 = document.getElementById("sliderSizeDot1");
  inputSizeDot1.value = sliderSizeDot1.value;

  inputBrightnessThreshhold = document.getElementById(
    "inputBrightnessThreshhold"
  );
  sliderBrightnessThreshhold = document.getElementById(
    "sliderBrightnessThreshhold"
  );
  inputBrightnessThreshhold.value = sliderBrightnessThreshhold.value;

  inputSizeDot2 = document.getElementById("inputSizeDot2");
  sliderSizeDot2 = document.getElementById("sliderSizeDot2");
  inputSizeDot2.value = sliderSizeDot2.value;

  inputBrightnessThreshhold2 = document.getElementById(
    "inputBrightnessThreshhold2"
  );
  sliderBrightnessThreshhold2 = document.getElementById(
    "sliderBrightnessThreshhold2"
  );
  inputBrightnessThreshhold2.value = sliderBrightnessThreshhold2.value;

  inputSizeDot3 = document.getElementById("inputSizeDot3");
  sliderSizeDot3 = document.getElementById("sliderSizeDot3");
  inputSizeDot3.value = sliderSizeDot3.value;

  inputGrayscale = document.getElementById("inputGrayscale");
  sliderGrayscale = document.getElementById("sliderGrayscale");
  inputGrayscale.value = sliderGrayscale.value;

  // color Step mode

  inputRTh = document.getElementById("inputRTh");
  sliderRTh = document.getElementById("sliderRTh");
  inputRTh.value = sliderRTh.value;

  inputGTh = document.getElementById("inputGTh");
  sliderGTh = document.getElementById("sliderGTh");
  inputGTh.value = sliderGTh.value;

  inputBTh = document.getElementById("inputBTh");
  sliderBTh = document.getElementById("sliderBTh");
  inputBTh.value = sliderBTh.value;

  inputRSize = document.getElementById("inputRSize");
  sliderRSize = document.getElementById("sliderRSize");
  inputRSize.value = sliderRSize.value;

  inputGSize = document.getElementById("inputGSize");
  sliderGSize = document.getElementById("sliderGSize");
  inputGSize.value = sliderGSize.value;

  inputBSize = document.getElementById("inputBSize");
  sliderBSize = document.getElementById("sliderBSize");
  inputBSize.value = sliderBSize.value;

  // Single Thumb Sliders
  let sliderContainerArray = document.querySelectorAll(".sliderContainer");
  sliderContainerArray.forEach((container) => {
    const range = container.querySelector('input[type="range"]');
    const hint = container.querySelector('input[type="number"]');

    // Thumb Colorchange

    range.addEventListener("mouseover", function (e) {
      hint.classList.add("thumbColor");
    });

    range.addEventListener("mouseout", function (e) {
      hint.classList.remove("thumbColor");
    });

    // Thumb Number input
    range.addEventListener("dblclick", (e) => {
      hint.style.pointerEvents = "all";
    });

    hint.addEventListener("mouseout", (e) => {
      hint.style.pointerEvents = "none";
    });

    range.addEventListener("mousemove", (e) => {
      hint.style.pointerEvents = "none";
    });

    //Slider Input Syncronisation
    range.addEventListener("input", (e) => {
      hint.value = range.value;
      generate();
    });

    hint.addEventListener("input", (e) => {
      range.value = hint.value;
      generate();
    });
  });

  // Double Thumb Sliders
  let threshRange1 = document.getElementById("sliderBrightnessThreshhold");
  let threshRange2 = document.getElementById("sliderBrightnessThreshhold2");

  let threshinput1 = document.getElementById("inputBrightnessThreshhold");
  let threshinput2 = document.getElementById("inputBrightnessThreshhold2");

  // Thumb Colorchange
  threshRange1.addEventListener("mouseover", function (e) {
    threshinput1.classList.add("thumbColor");
  });

  threshRange1.addEventListener("mouseout", function (e) {
    threshinput1.classList.remove("thumbColor");
  });

  threshRange2.addEventListener("mouseover", function (e) {
    threshinput2.classList.add("thumbColor");
  });

  threshRange2.addEventListener("mouseout", function (e) {
    threshinput2.classList.remove("thumbColor");
  });

  // Thumb Number input

  threshRange1.addEventListener("dblclick", function (e) {
    threshinput1.style.pointerEvents = "all";
  });

  threshRange2.addEventListener("dblclick", function (e) {
    threshinput2.style.pointerEvents = "all";
  });

  threshinput1.addEventListener("mouseout", function (e) {
    threshinput1.style.pointerEvents = "none";
  });

  threshinput2.addEventListener("mouseout", function (e) {
    threshinput2.style.pointerEvents = "none";
  });

  threshRange1.addEventListener("mousemove", (e) => {
    threshinput1.style.pointerEvents = "none";
  });

  threshRange2.addEventListener("mousemove", (e) => {
    threshinput2.style.pointerEvents = "none";
  });

  //Slider Input Syncronisation

  //Slider Input Syncronisation
  threshRange1.addEventListener("input", (e) => {
    threshinput1.value = threshRange1.value;
    generate();
  });

  threshinput1.addEventListener("input", (e) => {
    threshRange1.value = threshinput1.value;
    generate();
  });

  threshRange2.addEventListener("input", (e) => {
    threshinput2.value = threshRange2.value;
    generate();
  });

  threshinput2.addEventListener("input", (e) => {
    threshRange2.value = threshinput2.value;
    generate();
  });
}

function draw() {}

function saveImage() {
  let p5Canvas = document.getElementById("defaultCanvas0").remove();

  canvas = createCanvas(ImageWidth, ImageHeight, SVG).parent(positionContainer);
  rectMode(CENTER);
  ellipseMode(CENTER);

  windowResized();
  generate();
  window.print();

  save("my_type_of_image.svg");
}

function windowResized() {
  if (isUploaded) {
    canvasRect = document
      .getElementById("defaultCanvas0")
      .getBoundingClientRect();

    canvasContainerRect = document
      .getElementById("canvasContainer")
      .getBoundingClientRect();

    ImageHeight = canvasContainerRect.height;
    ImageRatio = img.width / img.height;
    ImageWidth = ImageHeight * ImageRatio;

    resizeCanvas(ImageWidth, ImageHeight);

    resizeRatio = img.width / ImageWidth;

    canvasContainer.style.minWidth = `${ImageWidth}px`;

    canvasContainerRect = document
      .getElementById("canvasContainer")
      .getBoundingClientRect();

    let clickHelperElement = document.getElementById("clickHelper");

    clickHelperElement.style.height = `${canvasContainerRect.height}px`;
    clickHelperElement.style.width = `${canvasContainerRect.width}px`;
    clickHelperElement.style.top = `${canvasContainerRect.top}px`;
    clickHelperElement.style.left = `${canvasContainerRect.left}px`;

    generate();
  }
}
function addTextBox() {
  settingsArray.push(defaultXPos);
  settingsArray.push(defaultYPos);
  settingsArray.push(defaultTextSize);
  settingsArray.push(defaultContent);
  settingsArray.push(defaultWidth);
  settingsArray.push(defaultHeight);
  settingsArray.push(defaultLineHeight);
  settingsArray.push(defaultSizeDot1);
  settingsArray.push(defaultSizeDot2);
  settingsArray.push(defaultSizeDot3);
  settingsArray.push(defaultDotGap);
  settingsArray.push(defaultDot1Thr);
  settingsArray.push(defaultDot2Thr);
  settingsArray.push(defaultGrayscale);

  settingsArray.push(defaultRTh);
  settingsArray.push(defaultGTh);
  settingsArray.push(defaultBTh);
  settingsArray.push(defaultRSize);
  settingsArray.push(defaultGSize);
  settingsArray.push(defaultBSize);
  settingsArray.push(defaultAlign);

  //Add a TextBox
  textBoxArray.push(
    new textBox(
      // function Values
      null,
      "Neutral",
      defaultColor,
      textBoxId * setAmm,
      // Array Values
      defaultXPos,
      defaultYPos,
      defaultTextSize,
      defaultContent,
      defaultWidth,
      defaultHeight,
      null,
      defaultLineHeight,
      defaultSizeDot1,
      defaultSizeDot2,
      defaultSizeDot3,
      defaultDotGap,
      defaultDot1Thr,
      defaultDot2Thr,
      defaultGrayscale,
      defaultRTh,
      defaultGTh,
      defaultBTh,
      defaultRSize,
      defaultGSize,
      defaultBSize,
      defaultAlign
    )
  );

  textBoxArray[textBoxId].generateTextBox();

  textBoxId = textBoxArray.length;

  generate();
}

function removeTextBox() {
  textBoxArray[textBoxId - 1].removeInput();
  textBoxArray.pop();

  for (let i = 0; i < setAmm; i++) {
    settingsArray.pop();
  }

  textBoxId = textBoxArray.length;

  generate();
}

function generate() {
  noStroke();
  sliderSync();

  if (ImageVisibility) {
    image(img, 0, 0, ImageWidth, ImageHeight);
  } else {
    background(255);
  }

  for (let i = 0; i < textBoxArray.length; i++) {
    textBoxArray[i].settingsArrayFromSlider();
    textBoxArray[i].textBoxSettingsFromSettingsArray();
    textBoxArray[i].updateTextBox();
  }
}
