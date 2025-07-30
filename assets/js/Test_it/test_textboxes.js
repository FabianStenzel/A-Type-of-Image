let textBoxArray = [];
let settingsArray = [];
let textBoxId = 0;
let defaultXPos = 0;
let defaultYPos = 0;
let defaultTextSize = 80;

let defaultContent = "Type here";
let defaultWidth = 600;
let defaultHeight = 300;
let defaultLineHeight = 150;
let setAmm = 21;
let defaultSizeDot1 = 2;
let defaultSizeDot2 = 4;
let defaultSizeDot3 = 10;
let defaultDot1Thr = 240;
let defaultDot2Thr = 100;
let defaultDotGap = 4;
let defaultGrayscale = 60;
let defaultColor;

let defaultRTh = 220;
let defaultGTh = 0;
let defaultBTh = 0;
let defaultRSize = 18;
let defaultGSize = 3;
let defaultBSize = 3;
let defaultAlign = "left";

let moveTextbox = false;

let isMoving = false;

class textBox {
  constructor(
    inputElement,
    status,
    color,
    index,
    xPos,
    yPos,
    textSize,
    content,
    width,
    height,
    buffer,
    lineHeight,
    dot1,
    dot2,
    dot3,
    dotGap,
    dot1Thr,
    dot2Thr,
    grayscale,
    RTh,
    GTh,
    BTh,
    RSize,
    GSize,
    BSize,
    align
  ) {
    this.inputElement = inputElement;
    this.status = status;
    this.color = color;
    this.index = index;

    this.xPos = xPos;
    this.yPos = yPos;
    this.textSize = textSize;
    this.content = content;
    this.width = width;
    this.height = height;
    this.buffer = buffer;
    this.lineHeight = lineHeight;

    this.dot1 = dot1;
    this.dot2 = dot2;
    this.dot3 = dot3;

    this.dotGap = dotGap;

    this.dot1Thr = dot1Thr;
    this.dot2Thr = dot2Thr;
    this.grayscale = grayscale;

    this.RTh = RTh;
    this.GTh = GTh;
    this.BTh = BTh;

    this.RSize = RSize;
    this.GSize = GSize;
    this.BSize = BSize;

    this.align = align;
  }

  generateTextBox() {
    this.inputElement = document.createElement("textarea");
    this.inputElement.classList.add("transitions");
    this.inputElement.readOnly = true;
    this.inputElement.style.width = `${defaultWidth}px`;
    this.inputElement.style.height = `${defaultHeight}px`;
    this.inputElement.value = defaultContent;
    this.inputElement.addEventListener("input", generate);

    textAreas.appendChild(this.inputElement);

    this.buffer = createGraphics(this.width, this.height);
    for (let i = 0; i < textBoxArray.length; i++) {
      textBoxArray[i].deselect();
    }

    this.select();
    this.textboxStates();
  }

  updateTextBox() {
    // let newFont = new FontFace("MyCustomFont", font);

    this.inputElement.style.top = `${this.yPos}px`;
    this.inputElement.style.left = `${this.xPos}px`;
    this.inputElement.style.width = `${this.width}px`;
    this.inputElement.style.height = `${this.height}px`;
    this.inputElement.style.fontSize = `${this.textSize}px`;
    this.inputElement.style.lineHeight = `${this.lineHeight}px`;
    this.inputElement.style.fontFamily = "CustomFont";
    this.inputElement.wrap = "soft";
    this.inputElement.style.paddingTop = `${this.textSize / 2}px`;

    this.buffer.remove();
    this.buffer = createGraphics(this.width, this.height);

    this.buffer.background(0);
    this.buffer.fill(255);

    this.buffer.textSize(this.textSize);
    textSize(this.textSize);
    this.buffer.textFont(font);
    this.buffer.textWrap(WORD);
    this.buffer.textLeading(this.lineHeight);

    // Align
    if (this.align === "left") {
      this.buffer.textAlign(LEFT, TOP);
      this.inputElement.style.textAlign = "start";
    }
    if (this.align === "center") {
      this.buffer.textAlign(CENTER, TOP);
      this.inputElement.style.textAlign = "center";
    }
    if (this.align === "right") {
      this.buffer.textAlign(RIGHT, TOP);
      this.inputElement.style.textAlign = "end";
    }

    // Split content by newlines
    let paragraphs = this.content.split("\n");
    let lines = [];

    for (let paragraph of paragraphs) {
      let currentLine = "";

      for (let i = 0; i < paragraph.length; i++) {
        let char = paragraph[i];
        let testLine = currentLine + char;
        textSize(this.textSize);
        let testWidth = textWidth(testLine) + 40;

        // Check if the testLine exceeds maxWidth
        if (testWidth >= this.width && currentLine.length > 0) {
          let lastSpaceIndex = currentLine.lastIndexOf(" ");

          if (lastSpaceIndex !== -1) {
            // Move the entire word to the next line
            let word = currentLine.substring(lastSpaceIndex + 1);
            currentLine = currentLine.substring(0, lastSpaceIndex);
            lines.push(currentLine); // Push the current line without the word

            currentLine = word + char; // Start new line with the word and current character
          } else {
            // No space in currentLine, just break at the character
            lines.push(currentLine); // Push the entire line
            currentLine = char; // Start new line with the current character
          }
        } else {
          currentLine = testLine; // Continue adding characters to the current line
        }
      }

      lines.push(currentLine); // Push the last line
    }

    // Draw the lines with correct alignment
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      let lineWidth = textWidth(line);

      if (this.align === "center") {
        this.buffer.text(
          line,
          0 + this.width / 2,
          this.lineHeight / 2 + i * this.lineHeight
        );
      } else if (this.align === "right") {
        this.buffer.text(
          line,
          0 + this.width,
          this.lineHeight / 2 + i * this.lineHeight
        );
      } else {
        this.buffer.text(line, 0, this.lineHeight / 2 + i * this.lineHeight);
      }
    }

    stroke(0);
    strokeWeight(0);

    //Steps Mode
    if (dotMode === "steps") {
      for (let x = this.xPos; x < this.width + this.xPos; x += this.dotGap) {
        for (let y = this.yPos; y < this.height + this.yPos; y += this.dotGap) {
          let pixel = this.buffer.get(x - this.xPos, y - this.yPos);
          let isTEXT =
            pixel[0] !== 0 ||
            pixel[1] !== 0 ||
            pixel[2] !== 0 ||
            pixel[3] !== 255;

          if (isTEXT) {
            // Calculate X and Y Coordinates in relation to Image dimentions
            let XR = floor(x * resizeRatio);
            let YR = floor(y * resizeRatio);
            // COLORS
            if (isColors) {
              fill(
                img.pixels[(XR + YR * img.width) * 4],
                img.pixels[(XR + YR * img.width) * 4 + 1],
                img.pixels[(XR + YR * img.width) * 4 + 2]
              );
            } else {
              fill(this.color);
            }
            //First Brightness Value
            if (
              grayScale[grayScaleIndex[(XR + YR * img.width) * 4]] >
              this.dot1Thr
            ) {
              if (isRect) {
                rect(x, y, this.dot1);
              } else {
                ellipse(x, y, this.dot1);
              }
            }

            //Second Brightness Value
            else if (
              grayScale[grayScaleIndex[(XR + YR * img.width) * 4]] >
              this.dot2Thr
            ) {
              if (isRect) {
                rect(x, y, this.dot2);
              } else {
                ellipse(x, y, this.dot2);
              }
            }
            //Third Brightness Value
            else {
              if (isRect) {
                rect(x, y, this.dot3);
              } else {
                ellipse(x, y, this.dot3);
              }
            }
          }
        }
      }
    }
    //Auto Mode
    if (dotMode === "auto") {
      for (let x = this.xPos; x < this.width + this.xPos; x += this.dotGap) {
        for (let y = this.yPos; y < this.height + this.yPos; y += this.dotGap) {
          let pixel = this.buffer.get(x - this.xPos, y - this.yPos);
          let isTEXT =
            pixel[0] !== 0 ||
            pixel[1] !== 0 ||
            pixel[2] !== 0 ||
            pixel[3] !== 255;

          if (isTEXT) {
            // Calculate X and Y Coordinates in relation to Image dimentions
            let XR = floor(x * resizeRatio);
            let YR = floor(y * resizeRatio);
            // COLORS
            if (isColors) {
              fill(
                img.pixels[(XR + YR * img.width) * 4],
                img.pixels[(XR + YR * img.width) * 4 + 1],
                img.pixels[(XR + YR * img.width) * 4 + 2]
              );
            } else {
              fill(this.color);
            }

            if (isRect) {
              rect(
                x,
                y,
                this.dotGap -
                  grayScale[grayScaleIndex[(XR + YR * img.width) * 4]] /
                    this.grayscale
              );
            } else {
              ellipse(
                x,
                y,
                this.dotGap -
                  grayScale[grayScaleIndex[(XR + YR * img.width) * 4]] /
                    this.grayscale
              );
            }
          }
        }
      }
    }
    //Colors Mode
    if (dotMode === "color") {
      for (let x = this.xPos; x < this.width + this.xPos; x += this.dotGap) {
        for (let y = this.yPos; y < this.height + this.yPos; y += this.dotGap) {
          let pixel = this.buffer.get(x - this.xPos, y - this.yPos);
          let isTEXT =
            pixel[0] !== 0 ||
            pixel[1] !== 0 ||
            pixel[2] !== 0 ||
            pixel[3] !== 255;

          if (isTEXT) {
            // Calculate X and Y Coordinates in relation to Image dimentions
            let XR = floor(x * resizeRatio);
            let YR = floor(y * resizeRatio);

            let pixelIndex = (XR + YR * img.width) * 4;

            let r = img.pixels[pixelIndex];
            let g = img.pixels[pixelIndex + 1];
            let b = img.pixels[pixelIndex + 2];

            // COLORS
            if (isColors) {
              fill(
                img.pixels[(XR + YR * img.width) * 4],
                img.pixels[(XR + YR * img.width) * 4 + 1],
                img.pixels[(XR + YR * img.width) * 4 + 2]
              );
            } else {
              fill(this.color);
            }

            // RED
            if (r > this.RTh) {
              if (isRect) {
                rect(x, y, this.RSize);
              } else {
                ellipse(x, y, this.RSize);
              }
            }

            // GREEN
            if (g > this.GTh) {
              if (isRect) {
                rect(x, y, this.GSize);
              } else {
                ellipse(x, y, this.GSize);
              }
            }

            //BLUE
            if (b > this.BTh) {
              if (isRect) {
                rect(x, y, this.BSize);
              } else {
                ellipse(x, y, this.BSize);
              }
            }
          }
        }
      }
    }
  }

  textBoxSettingsFromSettingsArray() {
    this.xPos = settingsArray[this.index];
    this.yPos = settingsArray[this.index + 1];
    this.textSize = settingsArray[this.index + 2];
    this.content = settingsArray[this.index + 3];
    this.width = settingsArray[this.index + 4];
    this.height = settingsArray[this.index + 5];
    this.lineHeight = settingsArray[this.index + 6];
    this.dot1 = settingsArray[this.index + 7];
    this.dot2 = settingsArray[this.index + 8];
    this.dot3 = settingsArray[this.index + 9];
    this.dotGap = settingsArray[this.index + 10];
    this.dot1Thr = settingsArray[this.index + 11];
    this.dot2Thr = settingsArray[this.index + 12];
    this.grayscale = settingsArray[this.index + 13];
    this.RTh = settingsArray[this.index + 14];
    this.GTh = settingsArray[this.index + 15];
    this.BTh = settingsArray[this.index + 16];
    this.RSize = settingsArray[this.index + 17];
    this.GSize = settingsArray[this.index + 18];
    this.BSize = settingsArray[this.index + 19];
    this.align = settingsArray[this.index + 20];
  }

  settingsArrayFromSlider() {
    // Repeating

    if (
      this.status === "Select" ||
      this.status === "Move" ||
      this.status === "Edit"
    ) {
      inputControlsLeft.style.opacity = "100%";
    }

    if (this.status === "Select") {
      this.inputElement.style.border = "1px dashed black";
    }

    if (
      this.status === "Select" ||
      this.status === "Move" ||
      this.status === "Edit"
    ) {
      settingsArray[this.index + 2] = Number(sliderTextSize.value);
      settingsArray[this.index + 3] = this.inputElement.value;

      let inputElementRect = this.inputElement.getBoundingClientRect();

      settingsArray[this.index + 4] = floor(inputElementRect.width);
      settingsArray[this.index + 5] = floor(inputElementRect.height);

      settingsArray[this.index + 6] = Number(sliderLineHeight.value);
      settingsArray[this.index + 7] = Number(sliderSizeDot1.value);
      settingsArray[this.index + 8] = Number(sliderSizeDot2.value);
      settingsArray[this.index + 9] = Number(sliderSizeDot3.value);
      settingsArray[this.index + 10] = Number(sliderTileGap.value);
      settingsArray[this.index + 11] = Number(sliderBrightnessThreshhold.value);
      settingsArray[this.index + 12] = Number(
        sliderBrightnessThreshhold2.value
      );
      settingsArray[this.index + 13] = Number(sliderGrayscale.value);

      settingsArray[this.index + 14] = Number(sliderRTh.value);
      settingsArray[this.index + 15] = Number(sliderGTh.value);
      settingsArray[this.index + 16] = Number(sliderBTh.value);
      settingsArray[this.index + 17] = Number(sliderRSize.value);
      settingsArray[this.index + 18] = Number(sliderGSize.value);
      settingsArray[this.index + 19] = Number(sliderBSize.value);
      settingsArray[this.index + 20] = align;
    }
  }

  textboxStates() {
    // Once for every textbox added

    var mousePosition;
    var offset = [0, 0];

    let resizing = false;

    let clickTimer = null;

    const dragThreshold = 0; // Minimum movement to consider as a drag
    let startX, startY;
    let moveTimer = null;

    // ____________________MOUSEDOWN
    this.inputElement.addEventListener("mousedown", (e) => {
      if (this.status === "Neutral") {
        for (let i = 0; i < textBoxArray.length; i++) {
          textBoxArray[i].deselect();
        }
        this.select();
      }

      startX = e.clientX;
      startY = e.clientY;

      let rect = e.target.getBoundingClientRect();
      let offsetX = e.clientX - rect.left;
      let offsetY = e.clientY - rect.top;
      let nearRightEdge = offsetX > rect.width - 20;
      let nearBottomEdge = offsetY > rect.height - 20;

      if (nearRightEdge && nearBottomEdge) {
        resizing = true; // Assume the user intends to resize
      } else {
        resizing = false;
      } // Otherwise, assume it's a normal mouse action}

      offset = [
        this.inputElement.offsetLeft - e.clientX,
        this.inputElement.offsetTop - e.clientY,
      ];

      // Set a timer to detect if movement happens shortly after mousedown
      moveTimer = setTimeout(() => {
        moveTimer = null;
      }, 300);
    });
    // ____________________MOUSEMOVE
    this.inputElement.addEventListener("mousemove", (event) => {
      if (
        this.status === "Neutral" ||
        this.status === "Select" ||
        this.status === "Edit"
      ) {
        if (moveTimer && resizing == false) {
          if (
            Math.abs(event.clientX - startX) > 1 ||
            Math.abs(event.clientY - startY) > 1
          ) {
            this.move();
            clearTimeout(moveTimer); // Clear the timer as movement has been detected
            moveTimer = null;
          }
        }
      }

      if (this.status === "Move") {
        this.move();
        if (!isMoving) {
          clearTimeout(moveTimer); // Clear the timer as movement has been detected
          mousePosition = {
            x: event.clientX,
            y: event.clientY,
          };

          settingsArray[this.index] = Number(
            floor(mousePosition.x + offset[0])
          );
          settingsArray[this.index + 1] = Number(
            floor(mousePosition.y + offset[1])
          );

          isMoving = true;

          generate();

          // Setze eine Verzögerung, um die Aufrufe zu drosseln
          setTimeout(() => {
            isMoving = false;
          }, 10);
        }
      }

      if (resizing && !isMoving) {
        generate();
        isMoving = true;

        // Setze eine Verzögerung, um die Aufrufe zu drosseln
        setTimeout(() => {
          isMoving = false;
        }, 10);
      }
    });

    // ____________________MOUSEUP

    this.inputElement.addEventListener("mouseup", (e) => {
      if (this.status === "Move") {
        this.select();
      } else {
        if (this.status === "Neutral" || this.status === "Select") {
          if (clickTimer) {
            clearTimeout(clickTimer);
            clickTimer = null;
            this.edit();
          } else {
            clickTimer = setTimeout(() => {
              clickTimer = null;
            }, 300);
          }
        }
      }
      clearTimeout(moveTimer); // Ensure moveTimer is cleared on mouseup
      moveTimer = null;
    });

    // ____________________CLICK OUTSIDE
    document.getElementById("clickHelper").addEventListener("click", (e) => {
      this.status = "Neutral";

      inputControlsLeft.style.opacity = "10%";
      if (!e.target.classList.contains("selectable")) {
        this.deselect();
      }
    });
  }

  select() {
    this.status = "Select";
    this.inputElement.style.resize = "both";
    this.inputElement.style.border = "1px dashed black";

    this.inputElement.readOnly = true;
    this.inputElement.style.zIndex = 100;

    sliderTextSize.value = settingsArray[this.index + 2];
    inputTextSize.value = settingsArray[this.index + 2];

    this.inputElement.value = settingsArray[this.index + 3];

    sliderLineHeight.value = settingsArray[this.index + 6];
    inputLineHeight.value = settingsArray[this.index + 6];

    sliderSizeDot1.value = settingsArray[this.index + 7];
    inputSizeDot1.value = settingsArray[this.index + 7];

    sliderSizeDot2.value = settingsArray[this.index + 8];
    inputSizeDot2.value = settingsArray[this.index + 8];

    sliderSizeDot3.value = settingsArray[this.index + 9];
    inputSizeDot3.value = settingsArray[this.index + 9];

    sliderTileGap.value = settingsArray[this.index + 10];
    inputTileGap.value = settingsArray[this.index + 10];

    sliderBrightnessThreshhold.value = settingsArray[this.index + 11];
    inputBrightnessThreshhold.value = settingsArray[this.index + 11];

    sliderBrightnessThreshhold2.value = settingsArray[this.index + 12];
    inputBrightnessThreshhold2.value = settingsArray[this.index + 12];

    sliderGrayscale.value = settingsArray[this.index + 13];
    inputGrayscale.value = settingsArray[this.index + 13];

    sliderRTh.value = settingsArray[this.index + 14];
    inputRTh.value = settingsArray[this.index + 14];

    sliderGTh.value = settingsArray[this.index + 15];
    inputGTh.value = settingsArray[this.index + 15];

    sliderBTh.value = settingsArray[this.index + 16];
    inputBTh.value = settingsArray[this.index + 16];

    sliderRSize.value = settingsArray[this.index + 17];
    inputRSize.value = settingsArray[this.index + 17];

    sliderGSize.value = settingsArray[this.index + 18];
    inputGSize.value = settingsArray[this.index + 18];

    sliderBSize.value = settingsArray[this.index + 19];
    inputBSize.value = settingsArray[this.index + 19];

    align = settingsArray[this.index + 20];

    if (this.align === "left") {
      toggleLeft();
      this.inputElement.style.textAlign = "start";
    }
    if (this.align === "center") {
      toggleCenter();
      this.inputElement.style.textAlign = "center";
    }
    if (this.align === "right") {
      toggleRight();
      this.inputElement.style.textAlign = "end";
    }
  }

  deselect() {
    this.status = "Neutral";
    this.inputElement.style.border = "none";
    this.inputElement.style.resize = "none";
    this.inputElement.style.zIndex = 99;

    this.inputElement.classList.remove("selectionColor");
    this.inputElement.style.cursor = "pointer";
    this.inputElement.readOnly = true;
  }

  move() {
    this.status = "Move";
    this.inputElement.style.border = "1px dashed black";
    this.inputElement.classList.remove("selectionColor");
    this.inputElement.style.cursor = "move";
    this.inputElement.readOnly = true;
  }

  edit() {
    this.status = "Edit";
    this.inputElement.style.cursor = "text";
    this.inputElement.style.border = "1px solid black";
    this.inputElement.classList.add("selectionColor");
    this.inputElement.readOnly = false;
  }

  removeInput() {
    this.inputElement.remove();
  }
}
