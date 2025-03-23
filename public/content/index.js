console.log("✅ Color Blind Filter Content Script Loaded");

function applyFilter(mode) {
  const body = document.body;
  body.style.filter = "none";
  if (mode === "protanopia") {
    console.log("🎯 Applying Protanopia filter...");
    body.style.filter = "grayscale(0.5) brightness(1.1) contrast(1.2)";
  } else if (mode === "deuteranopia") {
    console.log("🎯 Applying Deuteranopia filter...");
    body.style.filter = "grayscale(0.4) contrast(1.2)";
  } else if (mode === "tritanopia") {
    console.log("🎯 Applying Tritanopia filter...");
    body.style.filter = "hue-rotate(30deg) saturate(0.7)";
  } else if (mode === "none") {
    console.log("✅ Resetting filter...");
    body.style.filter = "none";
  }
}

function changeFontSize(desiredSize) {
  console.log(`🔠 Adjusting font size to minimum ${desiredSize}px where needed...`);
  const elements = document.querySelectorAll("body *:not(script):not(style)");

  elements.forEach((el) => {
    if (el.innerText && el.innerText.trim().length > 0) {
      const computedStyle = window.getComputedStyle(el);
      const currentSize = parseFloat(computedStyle.fontSize);

      if (currentSize < desiredSize) {
        el.style.fontSize = `${desiredSize}px`;
        el.style.wordSpacing = "5px";
        el.style.padding = "10px";
        el.setAttribute('data-font-modified', 'true'); // Mark it
        console.log(`✅ Increased font size for`, el);
      }
    }
  });
}

function resetFontSize() {
  console.log("🔄 Resetting all modified font styles...");
  const modifiedElements = document.querySelectorAll("[data-font-modified='true']");
  modifiedElements.forEach((el) => {
    el.style.fontSize = "";
    el.style.wordSpacing = "";
    el.style.padding = "";
    el.removeAttribute('data-font-modified');
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("✅ Content script received message:", request);

  if (request.action === "applyColorFilter" && request.mode) {
    applyFilter(request.mode);
    sendResponse({ status: "Filter applied" });
  }

  if (request.action === "changeFontSize" && request.size) {
    resetFontSize();  // Reset first
    changeFontSize(request.size);
    sendResponse({ status: "Font size changed" });
  }

  if (request.action === "resetFontSize") {
    resetFontSize();
    sendResponse({ status: "Font reset" });
  }
});
