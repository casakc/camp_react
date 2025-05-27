import React, { useState } from "react";
import RandomQuestion from "./RandomQuestion.js";
import { useNavigate } from "react-router-dom";
import "./AktuellesBody.css";

const AktuellesBody = ({ setQuestionId }) => {
  const navigate = useNavigate();
  const [questionId, setLocalQuestionId] = useState(null);  // ✅ Store question ID locally

  const handleButtonClick = () => {
    if (questionId) {
      navigate(`/answer/${questionId}`); // ✅ Navigate using the stored ID
    } else {
      console.error("Question ID is undefined!"); // Debugging log
    }
  };

  return (
    <div className="AktuellesBody">
      <div className="AktuellesBody-container">
        <RandomQuestion setQuestionId={(id) => { 
          setQuestionId(id);  // ✅ Update global question ID
          setLocalQuestionId(id); // ✅ Store locally for button click
        }} />  
        
        <button className="btn" onClick={handleButtonClick}>
          Antwort des Tages
        </button>
      </div>
    </div>
  );
};

export default AktuellesBody;





