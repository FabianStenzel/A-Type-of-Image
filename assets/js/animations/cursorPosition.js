let isGenerating = false;

function getCursor(event) {
  // cursorX = event.clientX;
  // cursorY = event.clientY;
  if (!isGenerating) {
    console.log("hi");
    generate(); // Aufruf von generate()
    isGenerating = true;

    // Setze eine Verzögerung, um die Aufrufe zu drosseln
    setTimeout(() => {
      isGenerating = false;
    }, 30);
  }
}
