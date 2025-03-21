document.getElementById('apply').addEventListener('click', async () => {
    const type = document.getElementById('colorType').value;
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [type],
      func: (type) => {
        const linkId = 'colorblind-adjustment-style';
        let link = document.getElementById(linkId);
        if (link) link.remove();
  
        link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        link.href = chrome.runtime.getURL(`styles/${type}.css`);
        document.head.appendChild(link);
      }
    });
  });
  