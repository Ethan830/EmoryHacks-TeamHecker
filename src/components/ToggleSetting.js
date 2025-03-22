import React from "react";
import "./toggle.css";

const ToggleSetting = ({ label, link, checked, onToggle }) => {
  return (
    <div className="inline-container">
      <span>{label}</span>
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={onToggle} />
        <span className="slider round"></span>
      </label>
      <a href={link} className="side-button">
        &gt;
      </a>
    </div>
  );
};

export default ToggleSetting;
