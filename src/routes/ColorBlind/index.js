import React, { useState } from "react";
import Option from "../../components/Option";
import BackButton from "../../components/BackButton";
import "./index.css";
import Switch from "../../components/Switch";

const ColorBlind = () => {
  const [selectedMode, setSelectedMode] = useState("protanopia");

  const handleApply = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "applyColorFilter", mode: selectedMode }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Message failed:", chrome.runtime.lastError.message);
        } else {
          console.log("Message success:", response);
        }
      });
    });
    
  };

  const handleClick = () => {
    window.open("https://enchroma.com/pages/color-blindness-test");
  };

  return (
    <div className="colorblind-page">
      <BackButton /><br></br>
      <Switch label={"Colorblind Filter"} storageKey="colorToggle" />

      <h1>Choose Your Type</h1>

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

      <div className="botButtons">
        <button className="applyBtn" onClick={handleApply}>
          Apply
        </button>
        <button className="testButton" onClick={handleClick}>
          Find Your Colorblindness!
        </button>
      </div>
    </div>
  );
};

export default ColorBlind;
