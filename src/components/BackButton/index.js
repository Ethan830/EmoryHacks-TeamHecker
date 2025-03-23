import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="back-button" onClick={() => navigate("/")}>
      &lt; Back
    </div>
  );
};

export default BackButton;
