import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Extract question ID from URL

const RandomAnswer = () => {
  const { questionId } = useParams(); // Get question ID from URL
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!questionId) {
      setError("⚠️ No question ID provided!");
      return;
    }

    console.log(`🎯 Received questionId: ${questionId}`);

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
      {error ? <p style={{ color: "red" }}>{error}</p> : <p>{answer || "Lädt..."}</p>}
    </div>
  );
};

export default RandomAnswer;
