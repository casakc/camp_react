import React from "react";
import RandomAnswer from "./RandomAnswer.js";
import { useNavigate } from "react-router-dom";
import "./AktuellesBodyAnswer.css";

const AktuellesBodyAnswer = ({ questionId }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/aktuelles");
  };

  return (
    <div className="AktuellesBodyAnswer">
      <div className="AktuellesBodyAnswer-container">
        <RandomAnswer questionId={questionId} />
        <button className="btn" onClick={handleButtonClick}>
          Frage des Tages
        </button>
      </div>
    </div>
  );
};

export default AktuellesBodyAnswer;

