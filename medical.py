"""Flask API for serving random medical questions and answers.
This API ensures questions are displayed randomly but only once per cycle before restarting.
It also retrieves corresponding answers based on a question's unique ID."""
import os
import random
from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
from waitress import serve
import pandas as pd

#Create a function to initialize the app
def create_app():
    """Initializes and configures the Flask app."""
    flask_app = Flask(__name__, static_folder="build", static_url_path="/")  # ✅ Updated
    CORS(flask_app)
    return flask_app

app = create_app()  # ✅ Initialize with distinct name


# Load dataset
FILE_PATH = os.path.join(os.path.dirname(__file__), "src/Medical.ods")

try:
    questions_data = pd.read_excel(FILE_PATH, sheet_name="Medical", engine="odf")
    answers_data = pd.read_excel(FILE_PATH, sheet_name="Medical", engine="odf")

    # Ensure IDs are included
    questions_list = questions_data[["ID", "Question"]].to_dict(orient="records")
    answers_list = answers_data[["ID", "Answer"]].to_dict(orient="records")

    # Validate dataset columns before processing
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
    def get_random_question(self):
        """Retrieves a question using a random ID."""
        if not self.remaining_ids:  # Reset when exhausted
            self.remaining_ids = [q["ID"] for q in questions_list]

        selected_id = random.choice(self.remaining_ids)
        self.remaining_ids.remove(selected_id)

        return next(q for q in questions_list if q["ID"] == selected_id)

# AnswerManager Class
class AnswerManager:
    """Manages answers using the same randomly selected question ID."""
    def get_answer(self, question_id):
        """Retrieves an answer matching the provided question ID."""
        return next(
            (a for a in answers_list if a["ID"] == question_id),
            {"error": f"No answer found for ID {question_id}"}
            )

# Instantiate managers
question_manager = QuestionManager()
answer_manager = AnswerManager()

# Serve React frontend
@app.route("/aktuelles")
def serve_aktuelles():
    """Serves the React page for Aktuelles."""
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def serve_static_files(path):
    """Serves static files (JS, CSS, images) from React's build directory."""
    print(f"🔍 Request received for static file: {path}")  # Debugging output
    return send_from_directory(app.static_folder, path)

# ✅ Add missing API route for fetching a random question
@app.route("/random-question", methods=["GET"])
def get_random_question():
    """Fetches a random medical question from the dataset."""
    question_data = question_manager.get_random_question()
    return jsonify(question_data)

# ✅ Fix API route for fetching an answer by question ID
@app.route("/answer/<int:question_id>", methods=["GET"])
def get_answer(question_id):
    """Fetches the answer to the random medical question from the dataset."""
    answer_data = answer_manager.get_answer(question_id)
    return jsonify(answer_data)

@app.route("/", defaults={"path": "index.html"})  # ✅ Default to index.html
@app.route("/<path:path>")
def serve_react(path):
    """Serves the requested React frontend file."""
    return send_from_directory("build", path)  # ✅ Now using 'path'

if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", "8080"))  # Use Render-assigned port
    serve(app, host="0.0.0.0", port=PORT)
