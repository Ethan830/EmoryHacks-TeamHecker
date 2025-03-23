import React, { useState, useEffect } from "react";
import "./index.css";

const Switch = ({ label, storageKey, onToggle, description }) => {
  const [isOn, setIsOn] = useState(false); // Default OFF

  // Load toggle state once on mount (NO onToggle call here)
  useEffect(() => {
    const savedValue = localStorage.getItem(storageKey);
    if (savedValue !== null) {
      setIsOn(JSON.parse(savedValue));  // ✅ Just set the state
    }
  }, [storageKey]);

  // Save toggle state to localStorage when user toggles
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(isOn));
  }, [isOn, storageKey]);

  // ✅ Only trigger reset logic on actual user interaction
  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onToggle) onToggle(newState);  // ✅ ONLY fires on user click
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
      {description && <span className="description">{description}</span>}
    </div>
  );
};

export default Switch;
