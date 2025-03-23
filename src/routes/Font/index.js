import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import Switch from "../../components/Switch";
import "./index.css";

const Font = () => {
  const [fontSize, setFontSize] = useState(16); // Default preview size
  const [fontToggle, setFontToggle] = useState(false); // Switch status

  const handleApplyFontSize = () => {
    if (!fontToggle) {
      console.log("Font change is OFF. Skipping font size change.");
      return;
    }
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "changeFontSize", size: fontSize },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error("Message failed:", chrome.runtime.lastError.message);
          } else {
            console.log("Font size change success:", response);
          }
        }
      );
    });
  };

  return (
    <div className="body">
      <BackButton />
      <Switch label={"Font"} storageKey="fontToggle" onToggle={setFontToggle} />

      <div className="font-size-container">
        <label htmlFor="fontSlider">Font Size</label>
        <input
          type="range"
          id="fontSlider"
          min="10"
          max="40"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        />
        <div
          className="preview-text"
          id="previewText"
          style={{ fontSize: `${fontSize}px` }}
        >
          This is a preview text.
        </div>
      </div>

      <button className="applyBtn" onClick={handleApplyFontSize}>
        Apply Font Size
      </button>
    </div>
  );
};

export default Font;
