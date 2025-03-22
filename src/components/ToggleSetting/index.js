import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const ToggleSetting = ({ label, route, storageKey,icon }) => {
  const navigate = useNavigate();

  const [switchState, setSwitch] = useState(
    () => JSON.parse(localStorage.getItem(storageKey)) || false
  );

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(switchState));
  }, [switchState, storageKey]);

  const handleClick = () => {
    navigate(route);
  };

  return (
    <div className="inline-container">
      <img src={icon}/>
      <span>{label}</span>
      <label className="switch">
        <input
          type="checkbox"
          checked={switchState}
          onChange={() => {
            setSwitch(!switchState);
          }}
        />
        <span className="slider round"></span>
      </label>
      <button onClick={handleClick} className="side-button">
        &gt;
      </button>
    </div>
  );
};

export default ToggleSetting;
