import React, { useState, useEffect } from "react";
import axios from "axios";

const RandomQuestion = ({ setQuestionId }) => {
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get("https://camp-react.onrender.com/random-question");

        if (!response.data || !response.data.Question) {
          return;
        }

        setQuestion(response.data.Question);  // ✅ Stores question
        setQuestionId(response.data.ID);      // ✅ Sends ID to AktuellesBody

      } catch (err) {
        setError("⚠️ Failed to load question!");
      }
    };

    fetchQuestion();  // ✅ Call fetch function inside `useEffect`
  }, [setQuestionId]);

  return (
    <div>
      <h1>Frage des Tages</h1>
      {error ? <p style={{ color: "red" }}>{error}</p> : <p>{question || "❌ Frage nicht geladen!"}</p>}
    </div>
  );
};

export default RandomQuestion;


