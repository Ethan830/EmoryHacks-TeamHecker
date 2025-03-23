import React from "react";
import "./index.css";

const Option = ({ label, color }) => {
  return (
    <div className="option">
      <label for={color}>{label}</label>
      <input type="radio" name="foo" id={color} class="colorblind-checkbox" />
    </div>
  );
};

export default Option;
