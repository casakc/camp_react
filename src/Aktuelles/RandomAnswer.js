/*import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";  // Import URL params hook

const RandomAnswer = () => {
  const { questionId } = useParams();  // Extract questionId from URL
  const [answer, setAnswer] = useState(""); // Stores fetched answer
  const [error, setError] = useState("");   // Stores errors

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        if (!questionId) return;  // Prevent unnecessary calls
        const response = await axios.get(`https://camp-react.onrender.com/answer/${questionId}`);
      setAnswer(response.data.Answer);
    
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

export default RandomAnswer;*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Extract URL params

const RandomAnswer = () => {
  const { questionId } = useParams(); // Extract questionId from URL
  const [answer, setAnswer] = useState(""); // Stores fetched answer
  const [error, setError] = useState(""); // Stores errors
  const [loading, setLoading] = useState(true); // Manage loading state

 useEffect(() => {
  console.log(`🔍 Fetching answer for questionId: ${questionId}`); // Debugging

  axios.get(`https://camp-react.onrender.com/answer/${questionId}`)
    .then(response => {
      console.log("✅ API Response:", response.data); // Debugging output
      
      if (response.data.Answer) {
        setAnswer(response.data.Answer); // ✅ Assign answer correctly
      } else {
        setError("No answer found for this question.");
      }
      setLoading(false); // ✅ Update loading state
    })
    .catch(error => {
      setError(`Failed to fetch answer: ${error.message}`);
      console.error("❌ Fetch Answer Error:", error);
      setLoading(false); // ✅ Ensure loading state updates even on error
    });
}, [questionId]);




  return (
    <div>
      <h1>Antwort des Tages</h1>
      {loading ? (
        <p>Lädt...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>{answer}</p>
      )}
    </div>
  );
};

export default RandomAnswer;

