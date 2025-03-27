import React from "react";
import RandomQuestion from "./RandomQuestion.js";
import { useNavigate } from "react-router-dom";
import "./AktuellesBody.css";

const AktuellesBody = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/answer");
  };

  return (
    <div className="AktuellesBody">

      <div className="AktuellesBody-container">

      <RandomQuestion />
        
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
          <div className="btn" onClick={handleButtonClick}>
        Antwort des Tages
     </div>
     </div>
          <div className="col-3"></div>
        
        </div>  
    

</div>
          </div>

      
      
    
  );
};

export default AktuellesBody;
