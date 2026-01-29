let focusTime = 25 * 60;   // 25 minutes
let breakTime = 5 * 60;   // 5 minutes
let timeLeft = focusTime;
let isRunning = false;
let isFocusSession = true;
let interval = null;

// Elements
const timerEl = document.getElementById("timer");
const sessionTypeEl = document.getElementById("sessionType");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const goalText = document.getElementById("active-goal-text");

// Load active goal
const activeGoalId = localStorage.getItem("activeGoalId");
const goals = JSON.parse(localStorage.getItem("goals")) || [];
const activeGoal = goals.find(g => g.id == activeGoalId);

if (activeGoal) {
  goalText.textContent = `Working on: ${activeGoal.title}`;
}

// Format time
function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

// Update UI
function updateDisplay() {
  timerEl.textContent = formatTime(timeLeft);
  sessionTypeEl.textContent =
    isFocusSession ? "Focus Session" : "Break Time";
}

// Timer tick
function tick() {
  if (timeLeft > 0) {
    timeLeft--;
    updateDisplay();
  } else {
    completeSession();
  }
}

// Start
startBtn.onclick = () => {
  if (isRunning) return;

  isRunning = true;
  interval = setInterval(tick, 1000);
};

// Pause
pauseBtn.onclick = () => {
  clearInterval(interval);
  isRunning = false;
};

// Reset
resetBtn.onclick = () => {
  clearInterval(interval);
  isRunning = false;
  timeLeft = isFocusSession ? focusTime : breakTime;
  updateDisplay();
};

// Session complete
function completeSession() {
  clearInterval(interval);
  isRunning = false;

  if (isFocusSession && activeGoal) {
    // Update goal metrics
    activeGoal.focusMinutes += 25;
    activeGoal.pomodoros += 1;

    localStorage.setItem("goals", JSON.stringify(goals));
  }

  // Switch session
  isFocusSession = !isFocusSession;
  timeLeft = isFocusSession ? focusTime : breakTime;

  updateDisplay();
}

// Init
updateDisplay();