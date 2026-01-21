from flask import Flask, request, jsonify
from database import get_connection
from todo import create_task, get_tasks

app = Flask(__name__)

@app.route("/add-task", methods=["POST"])
def add_task():
    data = request.json
    conn = get_connection()
    create_task(conn, data["userID"], data["title"], data["description"], data["priority"])
    return {"message": "Task added successfully"}

@app.route("/tasks/<int:userID>")
def tasks(userID):
    conn = get_connection()
    tasks = get_tasks(conn, userID)
    return jsonify(tasks)

app.run(debug=True)
