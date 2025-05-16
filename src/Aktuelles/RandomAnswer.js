import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCallback } from "react";

const RandomAnswer = () => {
  const [answer, setAnswer] = useState(""); // Stores the fetched answer
  const [error, setError] = useState("");   // Stores errors
  const [questionId, setQuestionId] = useState(null); // Stores question ID

  const fetchAnswer = useCallback(async () => {
    try {
      if (!questionId) return;
      const response = await axios.get(`https://camp-react.onrender.com/answer/${questionId}`);
      setAnswer(response.data.answer);
      setError(""); 
    } catch (err) {
      setError("Failed to fetch answer. Please try again.");
      console.error("Fetch Answer Error:", err);
    }
  }, [questionId]);
  

  const fetchQuestionId = async () => {
  try {
    const response = await axios.get("https://camp-react.onrender.com/random-question");
    setTimeout(() => setQuestionId(response.data.id), 500); // Small delay to stabilize updates
  } catch (err) {
    setError("Failed to fetch question ID. Please try again.");
    console.error(err);
  }
};


useEffect(() => {
  fetchQuestionId(); // First, fetch the latest question ID

  const interval = setInterval(() => {
    fetchQuestionId(); // Fetch a new question every 30 seconds
    setTimeout(fetchAnswer, 500); // Fetch answer after 0.5 sec delay
  }, 30000); // Refresh cycle every 30 sec

  return () => clearInterval(interval);
}, [fetchAnswer]); // Include fetchAnswer here

  

  useEffect(() => {
    if (questionId) {
      fetchAnswer();
    }
  }, [questionId, fetchAnswer]); // Include fetchAnswer here
   
  return (
    <div>
      <h1>Antwort des Tages</h1>
      {error ? <p style={{ color: "red" }}>{error}</p> : <p>{answer}</p>}
    </div>
  );
};

export default RandomAnswer;
