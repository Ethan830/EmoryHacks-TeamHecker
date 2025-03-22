import React, { useState } from "react";
import "./App.css";
import ToggleSetting from "../../components/ToggleSetting";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ColorBlind, Font } from "../../routes";

const Home = () => {
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
        route="/font"
        checked={fontEnabled}
        onToggle={() => setFontEnabled(!fontEnabled)}
      />

      <ToggleSetting
        label="Colorblind"
        route="/colorblind"
        checked={colorEnabled}
        onToggle={() => setColorEnabled(!colorEnabled)}
      />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/colorblind" element={<ColorBlind />} />
        <Route path="/font" element={<Font />} />
      </Routes>
    </Router>
  );
};

export default App;
