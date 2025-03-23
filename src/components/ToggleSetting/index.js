import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const ToggleSetting = ({ label, route, icon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <div className="container">
      <img src={icon} alt="" />
      <span>{label}</span>
      <button onClick={handleClick} className="side-button">
        &gt;
      </button>
    </div>
  );
};

export default ToggleSetting;
