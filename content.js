console.log("Color Blind Filter Content Script Loaded");

function applyFilter(mode) {
    const elements = document.querySelectorAll('*');

    elements.forEach(el => {
        const style = window.getComputedStyle(el);


        const textColor = style.color;
        const bgColor = style.backgroundColor;


        if (mode === "protanopia") {
            if (textColor.includes('rgb(255, 0, 0)') || textColor.includes('red')) {
                el.style.color = '#3366cc';
            }
            if (bgColor.includes('rgb(255, 0, 0)') || bgColor.includes('red')) {
                el.style.backgroundColor = '#ccccff';
            }
        } else if (mode === "deuteranopia") {
            if (textColor.includes('rgb(0, 128, 0)') || textColor.includes('green')) {
                el.style.color = '#0099cc';
            }
            if (bgColor.includes('rgb(0, 128, 0)') || bgColor.includes('green')) {
                el.style.backgroundColor = '#ccffff';
            }
        } else if (mode === "tritanopia") {
            if (textColor.includes('rgb(0, 0, 255)') || textColor.includes('blue')) {
                el.style.color = '#663399'; 
            }
            if (bgColor.includes('rgb(0, 0, 255)') || bgColor.includes('blue')) {
                el.style.backgroundColor = '#e6ccff';
            }
            if (textColor.includes('rgb(255, 255, 0)') || textColor.includes('yellow')) {
                el.style.color = '#ff9900'; 
            }
        }
    });
}

function textSize(mode){
  const elements = document.querySelectorAll('*');
  elements.forEach(el => {
      el.style.fontSize = `${size}px`;
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "applyColorFilter" && request.mode) {
        console.log(`Applying ${request.mode} filter...`);
        applyFilter(request.mode);
        sendResponse({ status: "Filter applied" });
    }
    if (request.action === "changeFontSize" && request.size) {
      console.log(`Changing font size to ${request.size}px`);
      textSizeSize(request.size);
      sendResponse({ status: "Font size changed" });
  }

});
