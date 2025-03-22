import React from "react";
import BackButton from "../../components/BackButton";

const Font = () => {
  const handleSlide = () => {
    // use useEffect, edit later
    const slider = document.getElementById("fontSlider");
    const preview = document.getElementById("previewText");
    slider.addEventListener("input", () => {
      preview.style.fontSize = slider.value + "px";
    });
  };

  return (
    <div>
      <BackButton />
      <div class="font-size-container" onClick={handleSlide}>
        <label for="fontSlider">Font Size</label>
        <input type="range" id="fontSlider" min="10" max="40" value="16" />
        <div class="preview-text" id="previewText">
          This is a preview text.
        </div>
      </div>
    </div>
  );
};

export default Font;
