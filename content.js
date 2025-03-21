// Listen for messages from popup.js or background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'applyColorblindFilter') {
      const linkId = 'colorblind-adjustment-style';
      let existingLink = document.getElementById(linkId);
      if (existingLink) {
        existingLink.remove();
      }
  
      const newLink = document.createElement('link');
      newLink.id = linkId;
      newLink.rel = 'stylesheet';
      newLink.type = 'text/css';
      newLink.href = chrome.runtime.getURL(`styles/${request.filterType}.css`);
      document.head.appendChild(newLink);
  
      sendResponse({ success: true });
    }
  });
  