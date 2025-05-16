import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Aktuelles from "./Aktuelles/Aktuelles";
import AktuellesAnswer from "./Aktuelles/AktuellesAnswer";


const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aktuelles" element={<Aktuelles />} />
      <Route path="/answer" element={<AktuellesAnswer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
