console.log("✅ Color Blind Filter Content Script Loaded");

function applyFilter(mode) {
  const body = document.body;


  body.style.filter = "none";

  // Apply the desired filter
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
    if (el.innerText.trim().length > 0) {
      const computedStyle = window.getComputedStyle(el);
      const currentSize = parseFloat(computedStyle.fontSize);

      if (currentSize < desiredSize) {
        el.style.fontSize = `${desiredSize}px`;
        console.log(`✅ Increased font size for`, el);
      }
    }
  });
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("✅ Content script received message:", request);
  
  if (request.action === "applyColorFilter" && request.mode) {
    applyFilter(request.mode);
    sendResponse({ status: "Filter applied" });
  }

  if (request.action === "changeFontSize" && request.size) {
    console.log(`Changing font size to ${request.size}px`);
    changeFontSize(request.size);
    sendResponse({ status: "Font size changed" });
  }
});
