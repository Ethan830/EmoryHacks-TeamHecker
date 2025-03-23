import React, { useState, useEffect } from "react";
import Option from "../../components/Option";
import BackButton from "../../components/BackButton";
import "./index.css";
import Switch from "../../components/Switch";

const ColorBlind = () => {
  const [selectedMode, setSelectedMode] = useState("");
  const [colorToggle, setColorToggle] = useState(true);

  useEffect(() => {
    // Initialize toggle state from localStorage
    const savedToggle = localStorage.getItem("colorToggle");
    if (savedToggle !== null) {
      setColorToggle(JSON.parse(savedToggle));
    }
    const savedMode = localStorage.getItem("selectedMode");
    if (savedMode) {
      setSelectedMode(savedMode);
    }
  }, []);

  useEffect(() => {
    // If toggled OFF, reset the color filter immediately
    if (!colorToggle) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "applyColorFilter", mode: "none" },
          (response) => {
            if (chrome.runtime.lastError) {
              console.error(
                "Message failed:",
                chrome.runtime.lastError.message
              );
            } else {
              console.log("✅ Color filter reset:", response);
            }
          }
        );
      });
    }
  }, [colorToggle]);

  const handleApply = () => {
    console.log("Selected mode is:", selectedMode);
    console.log("Color toggle is:", colorToggle);

    if (!colorToggle) {
      console.log("Color filter is OFF. Skipping filter application.");
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "applyColorFilter", mode: selectedMode },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error("Message failed:", chrome.runtime.lastError.message);
          } else {
            console.log("Message success:", response);
          }
        }
      );
    });
  };

  const handleClick = () => {
    window.open("https://enchroma.com/pages/color-blindness-test");
  };

  return (
    <div className="colorblind-page">
      <BackButton />
      <Switch
        label={"Colorblind Filter"}
        storageKey="colorToggle"
        onToggle={setColorToggle}
        description={
          "Apply a color filter that adapts webpage colors for different types of colorblindness."
        }
      />

      <div className="selectContainer">
        <h1>Select Your Colorblindness</h1>
        <Option
          label="Protanopia"
          color="red"
          isSelected={selectedMode === "protanopia"}
          onClick={() => setSelectedMode("protanopia")}
        />
        <Option
          label="Deuteranopia"
          color="green"
          isSelected={selectedMode === "deuteranopia"}
          onClick={() => setSelectedMode("deuteranopia")}
        />
        <Option
          label="Tritanopia"
          color="blue"
          isSelected={selectedMode === "tritanopia"}
          onClick={() => setSelectedMode("tritanopia")}
        />
      </div>

      <div className="botButtons">
        <button className="CBapplyBtn" onClick={handleApply}>
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
