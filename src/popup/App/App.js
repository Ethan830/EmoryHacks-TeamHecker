import React, { useState } from "react";
import "./App.css";
import ToggleSetting from "../../components/ToggleSetting";

const App = () => {
  const [fontEnabled, setFontEnabled] = useState(false);
  const [colorEnabled, setColorEnabled] = useState(false);
  const [colorType, setColorType] = useState("protanopia");

  const applyColorFilter = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [colorType],
      func: (type) => {
        const linkId = "colorblind-adjustment-style";
        let link = document.getElementById(linkId);
        if (link) link.remove();

        link = document.createElement("link");
        link.id = linkId;
        link.rel = "stylesheet";
        link.href = chrome.runtime.getURL(`styles/${type}.css`);
        document.head.appendChild(link);
      },
    });
  };

  return (
    <div style={{ padding: "1rem", width: "220px" }}>
      <h1>Color Blind Adjuster</h1>

      <ToggleSetting
        label="Font"
        link="font_option.html"
        checked={fontEnabled}
        onToggle={() => setFontEnabled(!fontEnabled)}
      />

      <ToggleSetting
        label="Colorblind"
        link="colorblind_option.html"
        checked={colorEnabled}
        onToggle={() => setColorEnabled(!colorEnabled)}
      />

      <div style={{ marginTop: "1rem" }}>
        <label htmlFor="colorType">Color Type:</label>
        <select
          id="colorType"
          value={colorType}
          onChange={(e) => setColorType(e.target.value)}
        >
          <option value="protanopia">Protanopia</option>
          <option value="deuteranopia">Deuteranopia</option>
          <option value="tritanopia">Tritanopia</option>
        </select>

        <button
          id="apply"
          onClick={applyColorFilter}
          style={{ marginTop: "10px" }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default App;
