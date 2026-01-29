let secondsElapsed = 0;
let timerInterval = null;

const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const goalDropdown = document.getElementById("goalDropdown");

/* -------------------------------
   LOAD GOALS FROM STORAGE
-------------------------------- */
const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];

storedGoals.forEach(goal => {
  const option = document.createElement("option");
  option.value = goal.id;
  option.textContent = goal.title;
  goalDropdown.appendChild(option);
});

/* -------------------------------
   TIMER FUNCTIONS
-------------------------------- */
function formatTime(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(secondsElapsed);
}

/* -------------------------------
   BUTTON ACTIONS
-------------------------------- */
startBtn.onclick = () => {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    secondsElapsed++;
    updateDisplay();
  }, 1000);
};

pauseBtn.onclick = () => {
  clearInterval(timerInterval);
  timerInterval = null;
};

resetBtn.onclick = () => {
  clearInterval(timerInterval);
  timerInterval = null;
  saveSession();
  secondsElapsed = 0;
  updateDisplay();
};

/* -------------------------------
   SAVE SESSION (GOAL LINKED)
-------------------------------- */
function saveSession() {
  const goalId = goalDropdown.value;
  if (!goalId || secondsElapsed === 0) return;

  const goals = JSON.parse(localStorage.getItem("goals")) || [];
  const goal = goals.find(g => g.id == goalId);

  if (goal) {
    goal.focusMinutes = (goal.focusMinutes || 0) + Math.floor(secondsElapsed / 60);
    localStorage.setItem("goals", JSON.stringify(goals));
  }
}
