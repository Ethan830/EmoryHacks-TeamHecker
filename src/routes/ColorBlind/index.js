import React from "react";
import Option from "../../components/Option";
import BackButton from "../../components/BackButton";
import styles from "./index.css";

const ColorBlind = () => {
  const handleClick = () => {
    window.open = "https://enchroma.com/pages/color-blindness-test";
  };

  return (
    <div className="colorblind-page" style={styles}>
      <BackButton />

      <h1>Choose Your Type</h1>

      <Option label="Protanopia" color="red" />
      <Option label="Deuteranopia" color="green" />
      <Option label="Tritanopia" color="blue" />

      <button className="applyBtn">Apply</button>
      <button id="testButton" onClick={handleClick}>
        Take Color Blind Test
      </button>

      <script src="popup.js"></script>
    </div>
  );
};

export default ColorBlind;
