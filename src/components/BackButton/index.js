import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="back-button" onClick={() => navigate("/")}>
      &lt; Back
    </button>
  );
};

export default BackButton;
