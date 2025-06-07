import React, { useState, useEffect } from "react";
import axios from "axios";

const RandomQuestion = ({ setQuestionId }) => {
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");

useEffect(() => {
  const fetchQuestion = async () => {
    try {
      const response = await axios.get("https://camp-react.onrender.com/random-question");

      if (!response.data || !response.data.ID || !response.data.Question) {
        setError("⚠️ Invalid response from server!");
        return;
      }

      setQuestion(response.data.Question);
      setQuestionId(response.data.ID);

    } catch (err) {
      setError("⚠️ Failed to load question!");
    }
  };

  fetchQuestion();
}, [setQuestionId]);

  return (
    <div>
      <h1>Frage des Tages</h1>
      {error ? <p style={{ color: "red" }}>{error}</p> : <p>{question || "❌ Frage nicht geladen!"}</p>}
    </div>
  );
};

export default RandomQuestion;


