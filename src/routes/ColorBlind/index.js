import React from "react";
import Option from "../../components/Option";
import BackButton from "../../components/BackButton";
import styles from "./index.css";

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

  };

  return (
    <div className="colorblind-page" style={styles}>
      <BackButton />

      <h1>Choose Your Type</h1>

      <Option label="Protanopia" color="red" onClick={() => setSelectedMode("protanopia")} />
      <Option label="Deuteranopia" color="green" onClick={() => setSelectedMode("deuteranopia")} />
      <Option label="Tritanopia" color="blue" onClick={() => setSelectedMode("tritanopia")} />

      <button className="applyBtn" onClick={handleApply}>Apply</button>
      <button id="testButton" onClick={handleClick}>
        Take Color Blind Test
      </button>

      <script src="popup.js"></script>
    </div>
  );
};

export default ColorBlind;
