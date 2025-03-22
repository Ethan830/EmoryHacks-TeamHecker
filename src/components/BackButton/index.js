import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="back-button" onClick={() => navigate("/")}>
      &#8592; Back
    </button>
  );
};

export default BackButton;
