import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Aktuelles from "./Aktuelles/Aktuelles";
import RandomAnswer from "./Aktuelles/RandomAnswer";

const App = () => {
  const [questionId, setQuestionId] = useState(null); // Store question ID globally

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />  {/* ✅ Home Page */}
        <Route path="/aktuelles" element={<Aktuelles setQuestionId={setQuestionId} questionId={questionId} />} />

        <Route path="/answer/:questionId" element={<RandomAnswer />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;





