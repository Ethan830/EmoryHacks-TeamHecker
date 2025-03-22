import React from "react";
import { useNavigate } from "react-router-dom";
import "./toggle.css";

const ToggleSetting = ({ label, route, checked, onToggle }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <div className="inline-container">
      <span>{label}</span>
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={onToggle} />
        <span className="slider round"></span>
      </label>
      <button onClick={handleClick} className="side-button">
        &gt;
      </button>
    </div>
  );
};

export default ToggleSetting;
