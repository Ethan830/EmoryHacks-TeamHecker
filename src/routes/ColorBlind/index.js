import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.css";

const ColorBlind = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    window.open = "https://enchroma.com/pages/color-blindness-test";
  };

  const returnHome = () => {
    navigate("/");
  };

  return (
    <div className="colorblind-page" style={styles}>
      <button className="back-button" onClick={returnHome}>
        &#8592; Back
      </button>

      <h1>Choose Your Type</h1>

      <div className="option">
        <label for="red">Protanopia</label>
        <input type="checkbox" id="red" class="colorblind-checkbox" />
      </div>

      <div className="option">
        <label for="green">Deuteranopia</label>
        <input type="checkbox" id="green" class="colorblind-checkbox" />
      </div>

      <div className="option">
        <label for="blue">Tritanopia</label>
        <input type="checkbox" id="blue" class="colorblind-checkbox" />
      </div>

      <button>Apply</button>
      <button id="testButton" onClick={handleClick}>
        Take Color Blind Test
      </button>

      <script src="popup.js"></script>
    </div>
  );
};

export default ColorBlind;
