console.log("✅ Color Blind Filter Content Script Loaded");

// Store original font sizes
const originalFontSizes = new Map();

function saveOriginalFonts() {
  const elements = document.querySelectorAll("body *:not(script):not(style)");
  elements.forEach((el) => {
    if (!originalFontSizes.has(el)) {
      const computedStyle = window.getComputedStyle(el);
      originalFontSizes.set(el, computedStyle.fontSize);
    }
  });
}

function resetFontSizes() {
  console.log("🔄 Resetting all fonts...");
  originalFontSizes.forEach((size, el) => {
    el.style.fontSize = size;
    el.style.wordSpacing = "normal"; // Reset word spacing
  });
}

function changeFontSize(desiredSize) {
  console.log(`🔠 Applying font size change, min ${desiredSize}px...`);
  saveOriginalFonts(); // Ensure originals saved once

  const elements = document.querySelectorAll("body *:not(script):not(style)");
  elements.forEach((el) => {
    const text = el.innerText;
    if (typeof text === 'string' && text.trim().length > 0) {
      const computedStyle = window.getComputedStyle(el);
      const currentSize = parseFloat(computedStyle.fontSize);

      if (currentSize < desiredSize) {
        el.style.fontSize = `${desiredSize}px`;
        el.style.wordSpacing = "2px"; 
        el.style.padding = "10px";
        console.log(`✅ Increased font size for`, el);
      }
    }
  });
}

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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("✅ Content script received message:", request);

  if (request.action === "applyColorFilter" && request.mode) {
    applyFilter(request.mode);
    sendResponse({ status: "Filter applied" });
  }

  if (request.action === "changeFontSize" && request.size) {
    resetFontSizes();  // ✅ Reset before applying new size
    changeFontSize(request.size);
    sendResponse({ status: "Font size changed" });
  }

  if (request.action === "resetFontSize") {
    resetFontSizes();  // ✅ Reset when toggle is OFF
    sendResponse({ status: "Font size reset" });
  }
});
