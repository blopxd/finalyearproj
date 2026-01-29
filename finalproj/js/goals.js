let goals = [];

/* -------------------------------
   WAIT FOR DOM TO LOAD
-------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const goalTitle = document.getElementById("goal-title");
  const goalDesc = document.getElementById("goal-description");
  const addGoalBtn = document.getElementById("add-goal-btn");

  addGoalBtn.addEventListener("click", () => {
    if (!goalTitle.value.trim()) return;

    const goal = {
      id: Date.now(),
      title: goalTitle.value,
      description: goalDesc.value,
      subtasks: [],
      focusMinutes: 0
    };

    goals.push(goal);

    goalTitle.value = "";
    goalDesc.value = "";

    renderGoals();
  });
});

/* -------------------------------
   RENDER GOALS + SUBTASKS
-------------------------------- */
function renderGoals() {
  const container = document.getElementById("goal-list");
  container.innerHTML = "";

  goals.forEach(goal => {
    const completed = goal.subtasks.filter(t => t.completed).length;
    const total = goal.subtasks.length;
    const progressPercent =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    container.innerHTML += `
      <div class="goal-item">
        <h3>${goal.title}</h3>
        <p>${goal.description}</p>

        <p class="progress-text">
          Progress: ${completed}/${total} subtasks (${progressPercent}%)
        </p>

        <div class="progress-bar">
          <div class="progress-fill" style="width:${progressPercent}%"></div>
        </div>

        <div class="subtasks">
          <h4>Sub Tasks</h4>
          <ul>
            ${goal.subtasks
              .map(
                task => `
              <li>
                <input type="checkbox"
                  ${task.completed ? "checked" : ""}
                  onchange="toggleSubTask(${goal.id}, ${task.id})">
                ${task.title}
              </li>
            `
              )
              .join("")}
          </ul>

          <input
            type="text"
            placeholder="Add a sub task and press Enter"
            onkeydown="addSubTask(event, ${goal.id})"
          />
        </div>
      </div>
    `;
  });
}

/* -------------------------------
   ADD SUBTASK TO GOAL
-------------------------------- */
function addSubTask(event, goalId) {
  if (event.key !== "Enter") return;

  const goal = goals.find(g => g.id === goalId);
  if (!goal || !event.target.value.trim()) return;

  goal.subtasks.push({
    id: Date.now(),
    title: event.target.value,
    completed: false
  });

  event.target.value = "";
  renderGoals();
}

/* -------------------------------
   TOGGLE SUBTASK COMPLETION
-------------------------------- */
function toggleSubTask(goalId, taskId) {
  const goal = goals.find(g => g.id === goalId);
  if (!goal) return;

  const task = goal.subtasks.find(t => t.id === taskId);
  if (!task) return;

  task.completed = !task.completed;
  renderGoals();
}