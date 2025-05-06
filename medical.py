"""
This module creates a Flask API that serves random medical questions and answers.
It ensures questions and answers are displayed randomly but only once per cycle
before restarting.
"""
import time
import random
from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)


FILE_PATH = "src/Medical.ods"  # Caminho relativo
questions_data = pd.read_excel(FILE_PATH, sheet_name='Medical', engine='odf')




# Convert the columns to lists
questions_list = questions_data['Question'].tolist()
answers_list = answers_data['Answer'].tolist()

# QuestionManager class
class QuestionManager:
    """
    Manages the state for the random medical questions API.
    Displays questions randomly without repetition until all questions have
    been served in a cycle, then restarts with a reshuffled list.
    """
    def __init__(self):
        self.remaining_questions = []  # Holds remaining questions for the current cycle
        self.current_question = None
        self.last_updated = 0

    def get_question(self):
        """
        Retrieves the next random question. Reshuffles and starts a new cycle when needed.

        Returns:
            str: The next question from the dataset.
        """
        current_time = time.time()

        if current_time - self.last_updated > 20 or self.current_question is None:
            if not self.remaining_questions:  # Reshuffle when all questions are used
                self.remaining_questions = questions_list.copy()
                random.shuffle(self.remaining_questions)
            self.current_question = self.remaining_questions.pop()
            self.last_updated = current_time

        return self.current_question

# AnswerManager class
class AnswerManager:
    """
    Manages the state for the random medical answers API.
    Displays answers randomly without repetition until all answers have
    been served in a cycle, then restarts with a reshuffled list.
    """
    def __init__(self):
        self.remaining_answers = []  # Holds remaining answers for the current cycle
        self.current_answer = None
        self.last_updated = 0

    def get_answer(self):
        """
        Retrieves the next random answer. Reshuffles and starts a new cycle when needed.

        Returns:
            str: The next answer from the dataset.
        """
        current_time = time.time()

        if current_time - self.last_updated > 20 or self.current_answer is None:
            if not self.remaining_answers:  # Reshuffle when all answers are used
                self.remaining_answers = answers_list.copy()
                random.shuffle(self.remaining_answers)
            self.current_answer = self.remaining_answers.pop()
            self.last_updated = current_time

        return self.current_answer

# Instantiate managers
question_manager = QuestionManager()
answer_manager = AnswerManager()

# Flask route for random questions
@app.route('/random-question', methods=['GET'])
def get_random_question():
    """
    API endpoint to return a random question.
    Ensures questions are displayed randomly but without repetition.
    """
    question = question_manager.get_question()
    return jsonify({'question': question})

# Flask route for random answers
@app.route('/random-answer', methods=['GET'])
def get_random_answer():
    """
    API endpoint to return a random answer.
    Ensures answers are displayed randomly but without repetition.
    """
    answer = answer_manager.get_answer()
    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(debug=True)

from waitress import serve

if __name__ == '__main__':
    serve(app, host="0.0.0.0", port=10000)
