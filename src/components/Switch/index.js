import React, { useState, useEffect } from "react";
import "./index.css";

const Switch = (storageKey) => {
  const [switchState, setSwitch] = useState(
    () => JSON.parse(localStorage.getItem(storageKey)) || false
  );

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(switchState));
  }, [switchState, storageKey]);
  return (
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
  );
};

export default Switch;
