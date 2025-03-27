import React from "react";
import RandomAnswer from "./RandomAnswer.js";
import { useNavigate } from "react-router-dom";
import "./AktuellesBodyAnswer.css";

const AktuellesBodyAnswer = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/aktuelles");
  };

  return (
    <div className="AktuellesBodyAnswer">
      <div className="AktuellesBodyAnswer-container">
      <RandomAnswer />
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <div className="btn" onClick={handleButtonClick}>
            Frage des Tages
            </div>
            </div>
            <div className="col-3"></div>
            </div>
            </div>
            </div>
            );
          };

export default AktuellesBodyAnswer;
