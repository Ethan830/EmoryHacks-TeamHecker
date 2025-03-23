import React from "react";
import "./index.css";

  const Option = ({ label, color, onClick, isSelected }) => {
    return (
      <div
        className={`option ${isSelected ? "selected" : ""}`}
        style={{ borderColor: color }}
        onClick={onClick}
      >
        <label for={color}>{label}</label>
        <input type="checkbox" id={color} class="colorblind-checkbox" />
      </div>
    );
  };

export default Option;
