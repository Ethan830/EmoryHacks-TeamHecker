import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import Switch from "../../components/Switch";
import "./index.css";

const Font = () => {
  const [fontSize, setFontSize] = useState(16);
  const [fontToggle, setFontToggle] = useState(false);

  // ONLY runs when toggle is switched (OFF triggers reset)
  const handleToggleFont = (newState) => {
    setFontToggle(newState);

    if (!newState && chrome?.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, { action: "resetFontSize" }, (response) => {
            console.log("✅ Font reset due to toggle OFF:", response);
          });
        }
      });
    }
  };

  // Only runs when APPLY button is clicked
  const handleApplyFontSize = () => {
    if (!chrome?.tabs) {
      console.error("❌ chrome.tabs is not available.");
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        console.error("❌ No active tab found.");
        return;
      }

      const tabId = tabs[0].id;

      // Always reset first when Apply is clicked (once)
      chrome.tabs.sendMessage(tabId, { action: "resetFontSize" }, (resetResponse) => {
        console.log("✅ Reset done before applying:", resetResponse);

        // Only apply font size if toggle is ON
        if (fontToggle) {
          chrome.tabs.sendMessage(
            tabId,
            { action: "changeFontSize", size: Number(fontSize) },
            (applyResponse) => {
              if (chrome.runtime.lastError) {
                console.error("❌ Message failed:", chrome.runtime.lastError.message);
              } else {
                console.log("✅ Font size change success:", applyResponse);
              }
            }
          );
        } else {
          console.log("✅ Toggle OFF. Skipped applying new font size.");
        }
      });
    });
  };

  return (
    <div className="body">
      <BackButton />
      <Switch
        label={"Font"}
        storageKey="fontToggle"
        onToggle={handleToggleFont}
        description="Make small text easier to read — upgrades small fonts to your selected size."
      />

      <div className="font-size-container">
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
        Apply
      </button>
    </div>
  );
};

export default Font;
