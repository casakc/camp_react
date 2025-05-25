import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";  // Import URL params hook

const RandomAnswer = () => {
  const { questionId } = useParams();  // Extract questionId from URL
  console.log(`🔎 Extracted question ID: ${questionId}`);  // ✅ Debugging Log

  const [answer, setAnswer] = useState(""); // Stores fetched answer
  const [error, setError] = useState("");   // Stores errors

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        if (!questionId) return;  // Prevent unnecessary calls
        const response = await axios.get(`https://camp-react.onrender.com/answer/${questionId}`);
        setAnswer(response.data.answer);
      } catch (err) {
        setError("Failed to fetch answer.");
        console.error("Fetch Answer Error:", err);
      }
    };

    fetchAnswer();
  }, [questionId]); // ✅ Fetch only when questionId updates

  return (
    <div>
      <h1>Antwort des Tages</h1>
      {error ? <p style={{ color: "red" }}>{error}</p> : <p>{answer}</p>}
    </div>
  );
};

export default RandomAnswer;
