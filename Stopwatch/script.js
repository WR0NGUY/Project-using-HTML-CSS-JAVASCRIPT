let isRunning = false;
let isCountdownMode = false;
let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;
let countdownTime = 0; // The time set by the user for countdown mode

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const countdownInput = document.getElementById('countdownInput');
const countdownModeButton = document.getElementById('countdownMode');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lapList');

function updateDisplay() {
    display.textContent = 
        (hours < 10 ? '0' : '') + hours + ':' + 
        (minutes < 10 ? '0' : '') + minutes + ':' + 
        (seconds < 10 ? '0' : '') + seconds;
}

function startStopwatch() {
    timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
        updateDisplay();
    }, 1000);
}

function startCountdown() {
    timer = setInterval(() => {
        if (seconds === 0 && minutes === 0 && hours === 0) {
            clearInterval(timer);
            alert("Time's up!");
        } else {
            if (seconds === 0) {
                if (minutes === 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    minutes--;
                    seconds = 59;
                }
            } else {
                seconds--;
            }
            updateDisplay();
        }
    }, 1000);
}

function stopStopwatch() {
    clearInterval(timer);
}

function switchToCountdown() {
    if (isCountdownMode) {
        isCountdownMode = false;
        countdownModeButton.textContent = "Switch to Countdown";
        resetStopwatch();
    } else {
        isCountdownMode = true;
        countdownModeButton.textContent = "Switch to Stopwatch";
        const time = parseInt(countdownInput.value);
        if (isNaN(time) || time <= 0) {
            alert("Please enter a valid time.");
            return;
        }
        // Set countdown time in minutes and seconds
        hours = 0;
        minutes = time;
        seconds = 0;
        updateDisplay();
    }
}

function resetStopwatch() {
    stopStopwatch();
    isRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay();
    startStopButton.textContent = 'Start';
}

startStopButton.addEventListener('click', () => {
    if (isRunning) {
        stopStopwatch();
        startStopButton.textContent = 'Start';
    } else {
        if (isCountdownMode) {
            startCountdown();
        } else {
            startStopwatch();
        }
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
});

resetButton.addEventListener('click', () => {
    if (isCountdownMode) {
        // Reset countdown mode
        minutes = countdownInput.value;
    } else {
        resetStopwatch();
    }
});

countdownModeButton.addEventListener('click', switchToCountdown);

updateDisplay(); // Initial display
