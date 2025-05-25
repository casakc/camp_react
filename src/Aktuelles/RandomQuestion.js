import React, { useState, useEffect } from "react";
import axios from "axios";

const RandomQuestion = ({ setQuestionId }) => {
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchQuestion = async () => {
    try {
      const response = await axios.get("http://localhost:5000/random-question");
      setQuestion(response.data.question);

      // Check before calling setQuestionId
      if (typeof setQuestionId === "function") {
        setQuestionId(response.data.id);
      } else {
        console.error("setQuestionId is undefined or not a function");
      }
    } catch (err) {
      setError("Failed to fetch question.");
      console.error(err);
    }
  };

  fetchQuestion();
}, [setQuestionId]);


  return (
    <div>
      <h1>Frage des Tages</h1>
      {error ? <p style={{ color: "red" }}>{error}</p> : <p>{question}</p>}
    </div>
  );
};

export default RandomQuestion;


