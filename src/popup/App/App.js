import React from "react";
import "./App.css";
import ToggleSetting from "../../components/ToggleSetting";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ColorBlind, Font } from "../../routes";
import fontIcon from "../../images/font.png";
import fonticon from "../../images/color.png";
import appIcon from "../../images/logo-transparent.png";

const Home = () => {
  return (
    <div style={{ padding: "1rem", width: "220px" }}>
      <img
        src={appIcon}
        alt="logo"
        style={{
          margin: "24px 40px",
          height: "50px",
        }}
      />
      <ToggleSetting label="Font" route="/font" icon={fontIcon} />
      <ToggleSetting label="Colorblind" route="/colorblind" icon={fonticon} />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/colorblind" element={<ColorBlind />} />
        <Route path="/font" element={<Font />} />
      </Routes>
    </Router>
  );
};

export default App;
