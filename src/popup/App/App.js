import React from "react";
import "./App.css";
import ToggleSetting from "../../components/ToggleSetting";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ColorBlind, Font } from "../../routes";

const Home = () => {
  return (
    <div style={{ padding: "1rem", width: "220px" }}>
      <h1>Color Blind Adjuster</h1>
      <ToggleSetting label="Font" route="/font" storageKey="fontToggle" />
      <ToggleSetting
        label="Colorblind"
        route="/colorblind"
        storageKey="colorToggle"
      />
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
