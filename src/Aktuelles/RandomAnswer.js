import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Extract question ID from URL

const RandomAnswer = () => {
  const { questionId } = useParams(); // Extract questionId from route
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!questionId) {
      setError("⚠️ No question ID provided!");
      return;
    }

    console.log(`🔍 Fetching answer for questionId: ${questionId}`); // Debugging

    axios.get(`https://camp-react.onrender.com/answer/${questionId}`)
      .then(response => {
        console.log("✅ API Response:", response.data);

        if (response.data.Answer) {
          setAnswer(response.data.Answer);
        } else {
          setError("❌ No answer found for this question.");
        }
      })
      .catch(err => {
        console.error("❌ Fetch Answer Error:", err);
        setError("⚠️ Failed to fetch answer. Please try again.");
      });
  }, [questionId]);

  return (
    <div>
      <h1>Antwort des Tages</h1>
      {error ? <p style={{ color: "red" }}>{error}</p> : <p>{answer || "Lädt..."}</p>}
    </div>
  );
};

export default RandomAnswer;
