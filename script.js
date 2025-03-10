// Timer settings
const POMODORO_TIME = 25 * 60; // 25 minutes in seconds
const SHORT_BREAK_TIME = 5 * 60; // 5 minutes in seconds
const LONG_BREAK_TIME = 15 * 60; // 15 minutes in seconds

// DOM elements
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const pomodoroButton = document.getElementById('pomodoro');
const shortBreakButton = document.getElementById('short-break');
const longBreakButton = document.getElementById('long-break');

let timeLeft = POMODORO_TIME;
let timerId = null;
let isRunning = false;

// Update timer display
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

// Timer function
function startTimer() {
    if (isRunning) return;
    
    isRunning = true;
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft === 0) {
            clearInterval(timerId);
            isRunning = false;
            alert('Time is up!');
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    timeLeft = POMODORO_TIME;
    updateDisplay();
}

// Mode switching
function setActiveButton(button) {
    [pomodoroButton, shortBreakButton, longBreakButton].forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
}

function switchMode(time, button) {
    pauseTimer();
    timeLeft = time;
    updateDisplay();
    setActiveButton(button);
}

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

pomodoroButton.addEventListener('click', () => {
    switchMode(POMODORO_TIME, pomodoroButton);
});

shortBreakButton.addEventListener('click', () => {
    switchMode(SHORT_BREAK_TIME, shortBreakButton);
});

longBreakButton.addEventListener('click', () => {
    switchMode(LONG_BREAK_TIME, longBreakButton);
});

// Initialize display
updateDisplay(); 