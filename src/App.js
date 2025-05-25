/*import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Aktuelles from "./Aktuelles/Aktuelles";
import AktuellesAnswer from "./Aktuelles/AktuellesAnswer";



const App = () => {

  const [questionId, setQuestionId] = useState(null); // Store ID globally
  
  return (
    <BrowserRouter basename="/">
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aktuelles" element={<Aktuelles setQuestionId={setQuestionId} />} />
      <Route path="/answer" element={<AktuellesAnswer questionId={questionId} />} />


      </Routes>
    </BrowserRouter>
  );
};

export default App;*/

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Aktuelles from "./Aktuelles/Aktuelles";
import AktuellesAnswer from "./Aktuelles/AktuellesAnswer"; 
import RandomAnswer from "./Aktuelles/RandomAnswer";  // ✅ Import your answer component

const App = () => {
  const [questionId, setQuestionId] = useState(null); // Store question ID globally

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />  {/* ✅ Home Page */}
        <Route path="/aktuelles" element={<Aktuelles setQuestionId={setQuestionId} />} />
        <Route path="/answer/:questionId" element={<AktuellesAnswer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

