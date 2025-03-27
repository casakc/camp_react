import React, { useState, useEffect } from "react";
import axios from "axios";

const RandomQuestion = () => {
  const [question, setQuestion] = useState(""); // To store the fetched question
  const [error, setError] = useState("");      // To store errors

  const fetchQuestion = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/random-question");
      setQuestion(response.data.question);
      setError(""); // Clear any previous error
    } catch (err) {
      setError("Failed to fetch question. Please try again.");
      console.error(err);
    }
  };

  useEffect(() => {
    // Fetch the question when the component mounts
    fetchQuestion();

    // Set an interval to fetch the question every 20 seconds
    const interval = setInterval(fetchQuestion, 20000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Frage des Tages</h1>
      {error ? <p style={{ color: "red" }}>{error}</p> : <p>{question}</p>}
    </div>
  );
};

export default RandomQuestion;



