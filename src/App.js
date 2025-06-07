import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Aktuelles from "./Aktuelles/Aktuelles";
import AktuellesAnswer from "./Aktuelles/AktuellesAnswer";

const App = () => {
  const [questionId, setQuestionId] = useState(null); // Store question ID globally

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />  {/* ✅ Home Page */}
        <Route path="/aktuelles" element={<Aktuelles setQuestionId={setQuestionId} questionId={questionId} />} />
        <Route path="/answer/:questionId" element={<AktuellesAnswer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;





