/*import React from "react";
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

export default App;*/


/*import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AktuellesBody from "./Aktuelles/AktuellesBody";
import AktuellesBodyAnswer from "./Aktuelles/AktuellesBodyAnswer";

const App = () => {
  const [questionId, setQuestionId] = useState(null); // Store ID globally

  return (
    <Router>
      <Routes>
        <Route path="/aktuelles" element={<AktuellesBody setQuestionId={setQuestionId} />} />
        <Route path="/answer" element={<AktuellesBodyAnswer questionId={questionId} />} />
      </Routes>
    </Router>
  );
};

export default App;*/

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Aktuelles from "./Aktuelles/Aktuelles";
import AktuellesBodyAnswer from "./Aktuelles/AktuellesBodyAnswer";



const App = () => {

  const [questionId, setQuestionId] = useState(null); // Store ID globally
  
  return (
    <BrowserRouter basename="/">
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aktuelles" element={<Aktuelles setQuestionId={setQuestionId} />} />
      <Route path="/answer" element={<AktuellesBodyAnswer questionId={questionId} />} />


      </Routes>
    </BrowserRouter>
  );
};

export default App;
