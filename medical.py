"""
Flask API that serves random medical questions and answers.
Ensures questions and answers are displayed randomly but only once per cycle before restarting.
"""

import random
import os
import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS
from waitress import serve

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load dataset
FILE_PATH = os.path.join(os.path.dirname(__file__), "src/Medical.ods")

try:
    questions_data = pd.read_excel(FILE_PATH, sheet_name="Medical", engine="odf")
    answers_data = pd.read_excel(FILE_PATH, sheet_name="Medical", engine="odf")

    # Ensure IDs are included
    questions_list = questions_data[["ID", "Question"]].to_dict(orient="records")
    answers_list = answers_data[["ID", "Answer"]].to_dict(orient="records")
    #Validate dataset columns before processing
    expected_columns = {"ID", "Question", "Answer"}
    missing_columns = expected_columns - set(questions_data.columns)

    if missing_columns:
        raise RuntimeError(f"Missing required columns: {missing_columns}")

except FileNotFoundError as exc:
    raise RuntimeError(f"Error: File not found at {FILE_PATH}") from exc

# QuestionManager Class
class QuestionManager:
    """Manages random medical questions without repetition."""
    def __init__(self):
        self.remaining_ids = [q["ID"] for q in questions_list]  # Store IDs
        self.last_question_id = None
           
    def get_random_question(self):
        """Retrieves a question using a random ID."""
        if not self.remaining_ids:  # Reset when exhausted
            self.remaining_ids = [q["ID"] for q in questions_list]

        selected_id = random.choice(self.remaining_ids)
        self.remaining_ids.remove(selected_id)

        self.last_question_id = selected_id  # Store ID persistently
        question = next(q for q in questions_list if q["ID"] == selected_id)
        return question 

# AnswerManager Class
class AnswerManager:
    """Manages answers using the same randomly selected question ID."""
    def get_answer(self, question_id):  # ✅ Ensure function correctly receives an argument
        """Retrieves an answer that matches the provided question ID."""
        answer = next((a for a in answers_list if a["ID"] == question_id), None)
        return answer if answer else {"error": f"No answer found for ID {question_id}"}


# Instantiate managers
question_manager = QuestionManager()
answer_manager = AnswerManager()

# Flask Routes for Question and Answer retrieval
@app.route('/random-question-answer', methods=['GET'])
def get_random_question_answer():
    """Returns a randomly selected question with its correct answer."""
    question_data = question_manager.get_random_question()
    question_id = question_data["ID"]
    
    # Fetch the correct answer using the same question ID
    answer_data = answer_manager.get_answer(question_id)

    return jsonify({
        "id": question_id,
        "question": question_data["Question"],
        "answer": answer_data["Answer"] if "Answer" in answer_data else None
    })

# Start Server with Waitress
if __name__ == '__main__':
    PORT = int(os.getenv("PORT", "5000"))  # Default as a string
  # Dynamically assign Render's port
    serve(app, host="0.0.0.0", port=PORT)
