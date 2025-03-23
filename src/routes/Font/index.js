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

  return (
    <div class="body">
      <BackButton />
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
      </div>
    </div>
  );
};

export default Font;
