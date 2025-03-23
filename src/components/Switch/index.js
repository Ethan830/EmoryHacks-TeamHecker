import React, { useState, useEffect } from "react";
import "./index.css";

const Switch = ({ label, storageKey, onToggle, description }) => {
  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    const savedValue = localStorage.getItem(storageKey);
    if (savedValue !== null) {
      const parsed = JSON.parse(savedValue);
      setIsOn(parsed);
      if (onToggle) onToggle(parsed);
    }
  }, [storageKey, onToggle]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(isOn));
  }, [isOn, storageKey]);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <div className="inline-container">
      <div>
        <span className="label">{label}</span>
        <label className="switch">
          <input type="checkbox" checked={isOn} onChange={handleToggle} />
          <span className="slider round"></span>
        </label>
      </div>
      <span className="description">{description}</span>
    </div>
  );
};

export default Switch;
