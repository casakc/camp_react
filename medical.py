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

except FileNotFoundError as exc:
    raise RuntimeError(f"Error: File not found at {FILE_PATH}") from exc

# QuestionManager Class
class QuestionManager:
    """Manages random medical questions without repetition."""
    def __init__(self):
        self.remaining_ids = [q["ID"] for q in questions_list]  # Store IDs

    def get_random_question(self):
        """Retrieves a question using a random ID."""
        if not self.remaining_ids:  # Reset when exhausted
            self.remaining_ids = [q["ID"] for q in questions_list]

        selected_id = random.choice(self.remaining_ids)
        self.remaining_ids.remove(selected_id)

        question = next(q for q in questions_list if q["ID"] == selected_id)
        return question


# AnswerManager Class
class AnswerManager:
    """Manages answers using the same randomly selected ID."""
    def get_answer(self, question_id):
        """Retrieves the answer that matches the given question ID."""
        answer = next((a for a in answers_list if a["ID"] == question_id), None)
        if answer is None:
            return {"error": f"No answer found for question ID {question_id}"}
        return answer

# Instantiate managers
question_manager = QuestionManager()
answer_manager = AnswerManager()

# Flask Routes
@app.route('/random-pair', methods=['GET'])
def get_random_pair():
    """Returns a question-answer pair based on a randomly selected ID."""
    question_data = question_manager.get_random_question()
    answer_data = answer_manager.get_answer(question_data["ID"])

    return jsonify({
        "id": question_data["ID"],
        "question": question_data["Question"],
        "answer": answer_data["Answer"]
    })


# Start Server with Waitress
if __name__ == '__main__':
    PORT = int(os.getenv("PORT", "5000"))  # Default as a string
  # Dynamically assign Render's port
    serve(app, host="0.0.0.0", port=PORT)
