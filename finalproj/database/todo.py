def create_task(conn, userID, title, description, priority):
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO todo_tasks (userID, title, description, priority, status) VALUES (?, ?, ?, ?, ?)",
        (userID, title, description, priority, "Pending")
    )
    conn.commit()


def get_tasks(conn, userID):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM todo_tasks WHERE userID=?", (userID,))
    return cursor.fetchall()

def mark_completed(conn, taskID):
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE todo_tasks SET status='Completed' WHERE todoTaskID=?",
        (taskID,)
    )
    conn.commit()
