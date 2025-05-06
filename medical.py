"""
Flask API that serves random medical questions and answers.
Ensures questions and answers are displayed randomly but only once per cycle before restarting.
"""
import time
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
    answers_data = pd.read_excel(
    FILE_PATH,sheet_name="Medical",engine="odf") # Fixed missing definition

except FileNotFoundError as exc:
    raise RuntimeError(f"Error: File not found at {FILE_PATH}") from exc


# Convert dataset columns to lists
questions_list = questions_data["Question"].tolist()
answers_list = answers_data["Answer"].tolist()

# QuestionManager Class
class QuestionManager:
    """Manages random medical questions without repetition until a cycle completes."""
    def __init__(self):
        self.remaining_questions = []
        self.current_question = None
        self.last_updated = 0

    def get_question(self):
        """Retrieves the next random question, reshuffling when needed."""
        current_time = time.time()
        if current_time - self.last_updated > 20 or self.current_question is None:
            if not self.remaining_questions:
                self.remaining_questions = questions_list.copy()
                random.shuffle(self.remaining_questions)
            self.current_question = self.remaining_questions.pop()
            self.last_updated = current_time
        return self.current_question

# AnswerManager Class
class AnswerManager:
    """Manages random medical answers without repetition until a cycle completes."""
    def __init__(self):
        self.remaining_answers = []
        self.current_answer = None
        self.last_updated = 0

    def get_answer(self):
        """Retrieves the next random answer, reshuffling when needed."""
        current_time = time.time()
        if current_time - self.last_updated > 20 or self.current_answer is None:
            if not self.remaining_answers:
                self.remaining_answers = answers_list.copy()
                random.shuffle(self.remaining_answers)
            self.current_answer = self.remaining_answers.pop()
            self.last_updated = current_time
        return self.current_answer

# Instantiate managers
question_manager = QuestionManager()
answer_manager = AnswerManager()

# Flask Routes
@app.route('/random-question', methods=['GET'])
def get_random_question():
    """API endpoint to return a random question."""
    return jsonify({'question': question_manager.get_question()})

@app.route('/random-answer', methods=['GET'])
def get_random_answer():
    """API endpoint to return a random answer."""
    return jsonify({'answer': answer_manager.get_answer()})

# Start Server with Waitress
if __name__ == '__main__':
    PORT = int(os.getenv("PORT", "5000"))  # Default as a string
  # Dynamically assign Render's port
    serve(app, host="0.0.0.0", port=PORT)
