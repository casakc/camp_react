import React, { useState, useEffect } from "react";
import axios from "axios";

const RandomAnswer = () => {
  const [answer, setAnswer] = useState(""); // To store the fetched answer
  const [error, setError] = useState("");      // To store errors

  const fetchAnswer = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/random-answer");
      setAnswer(response.data.answer);
      setError(""); // Clear any previous error
    } catch (err) {
      setError("Failed to fetch answer. Please try again.");
      console.error(err);
    }
  };

  useEffect(() => {
    // Fetch the answer when the component mounts
    fetchAnswer();

    // Set an interval to fetch the answer every 20 seconds
    const interval = setInterval(fetchAnswer, 20000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Antwort des Tages</h1>
      {error ? <p style={{ color: "red" }}>{error}</p> : <p>{answer}</p>}
    </div>
  );
};

export default RandomAnswer;
