import React, {useState, useEffect} from "react";
import BackButton from "../../components/BackButton";
import Switch from "../../components/Switch";
import './index.css'

const Font = () => {
  const [fontSize, setFontSize] = useState(16);
  const handleSlide = () => {
    // use useEffect, edit later
    const slider = document.getElementById("fontSlider");
    const preview = document.getElementById("previewText");
    slider.addEventListener("input", () => {
      preview.style.fontSize = slider.value + "px";
      
    });
    
  };
  const handleApply = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {}, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Message failed:", chrome.runtime.lastError.message);
        } else {
          console.log("Message success:", response);
        }
      });
    });
    
  };
  return (
    <div class="body">
      <BackButton /><br></br>
      <Switch label={"Font"} storageKey="fontToggle" />
      <div className="font-size-container" onClick={handleSlide}>
        <label for="fontSlider">Font Size</label>
        <input
          type="range"
          id="fontSlider"
          min="10"
          max="40"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
        />
        <div className="preview-text" id="previewText">
          This is a preview text.
        </div>
      </div><br></br>
      <button className="applyBtn" onClick={handleApply}>
        Apply
      </button>
    </div>
  );
};

export default Font;
