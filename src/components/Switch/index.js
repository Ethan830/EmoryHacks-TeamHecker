import React, { useState, useEffect } from "react";
import "./index.css";

const Switch = ({ label, storageKey }) => {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    const savedValue = localStorage.getItem(storageKey);
    if (savedValue !== null) {
      setIsOn(JSON.parse(savedValue));
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(isOn));
  }, [isOn, storageKey]);

  return (
    <div className="inline-container">
      <span>{label}</span>
      <label className="switch">
        <input type="checkbox" checked={isOn} onChange={() => setIsOn(!isOn)} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Switch;
