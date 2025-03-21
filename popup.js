document.getElementById('testButton').addEventListener('click', () => {
  chrome.tabs.create({ url: "https://enchroma.com/pages/color-blindness-test" });
});
