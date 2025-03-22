import React, { useState } from "react";
import Option from "../../components/Option";
import BackButton from "../../components/BackButton";
import styles from "./index.css";

<<<<<<< HEAD
  const ColorBlind = () => {
    const [selectedMode, setSelectedMode] = useState("protanopia");
  
    const handleApply = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "applyColorFilter",
          mode: selectedMode,
        });
      });
    };
  const handleClick = () => {
    window.open("https://enchroma.com/pages/color-blindness-test");

=======
const ColorBlind = () => {
  const [selectedMode, setSelectedMode] = useState("protanopia");

  const handleApply = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "applyColorFilter",
        mode: selectedMode,
      });
    });
  };
  const handleClick = () => {
    window.open("https://enchroma.com/pages/color-blindness-test");
>>>>>>> fe08fb7aaaea663399a422ee691d4c0d5abdcb38
  };

  return (
    <div className="colorblind-page" style={styles}>
      <BackButton />

      <h1>Choose Your Type</h1>

<<<<<<< HEAD
      <Option label="Protanopia" color="red" onClick={() => setSelectedMode("protanopia")} />
      <Option label="Deuteranopia" color="green" onClick={() => setSelectedMode("deuteranopia")} />
      <Option label="Tritanopia" color="blue" onClick={() => setSelectedMode("tritanopia")} />

      <button className="applyBtn" onClick={handleApply}>Apply</button>
=======
      <Option
        label="Protanopia"
        color="red"
        onClick={() => setSelectedMode("protanopia")}
      />
      <Option
        label="Deuteranopia"
        color="green"
        onClick={() => setSelectedMode("deuteranopia")}
      />
      <Option
        label="Tritanopia"
        color="blue"
        onClick={() => setSelectedMode("tritanopia")}
      />

      <button className="applyBtn" onClick={handleApply}>
        Apply
      </button>
>>>>>>> fe08fb7aaaea663399a422ee691d4c0d5abdcb38
      <button id="testButton" onClick={handleClick}>
        Take Color Blind Test
      </button>

      <script src="popup.js"></script>
    </div>
  );
};

export default ColorBlind;
