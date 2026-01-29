let tasks = []

document.getElementById("addTaskBtn").onclick = () => {
  const task = {
    id: Date.now(),
    title: title.value,
    description: description.value,
    priority: priority.value,
    urgency: urgency.value,
    status: "Ongoing",
    created_at: new Date().toISOString().split("T")[0],
    completed_at: null
  };

  tasks.push(task);
  renderTasks(tasks);
};

function renderTasks(taskArray) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  taskArray.forEach(task => {
    list.innerHTML += `
      <div class="task-card">
        <h3>${task.title}</h3>
        <p>${task.description}</p>

        <div class="task-meta">
          Priority: ${task.priority} |
          Urgency: ${task.urgency} <br>
          Created: ${task.created_at}
          ${task.completed_at ? `| Completed: ${task.completed_at}` : ""}
        </div>

        ${task.status === "Ongoing"
          ? `<button onclick="completeTask(${task.id})">Mark Complete</button>`
          : `<span>✔ Completed</span>`
        }
      </div>
    `;
  });
}
function completeTask(id) {
  const task = tasks.find(t => t.id === id);
  task.status = "Completed";
  task.completed_at = new Date().toISOString().split("T")[0];
  renderTasks(tasks);
}

function filterTasks(type) {
  if (type === "all") renderTasks(tasks);
  if (type === "ongoing")
    renderTasks(tasks.filter(t => t.status === "Ongoing"));
  if (type === "completed")
    renderTasks(tasks.filter(t => t.status === "Completed"));
}
