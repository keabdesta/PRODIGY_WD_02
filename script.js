// script.js
let startTime = 0;
let currentTime = 0;
let lapTimes = [];
let intervalId = null;
let isRunning = false;

const stopwatchDisplay = document.querySelector('.stopwatch-display');
const startButton = document.querySelector('.start-button');
const pauseButton = document.querySelector('.pause-button');
const resetButton = document.querySelector('.reset-button');
const lapButton = document.querySelector('.lap-button');
const lapTimesList = document.querySelector('.lap-times');

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', lapStopwatch);

function startStopwatch() {
    if (!isRunning) {
        startTime = new Date().getTime();
        intervalId = setInterval(updateStopwatch, 1000);
        isRunning = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
}

function resetStopwatch() {
    clearInterval(intervalId);
    startTime = new Date().getTime();
    currentTime = 0;
    lapTimes = [];
    stopwatchDisplay.textContent = '00:00:00';
    lapTimesList.innerHTML = '';
    startButton.disabled = false;
    pauseButton.disabled = true;
    isRunning = false;
}

function lapStopwatch() {
    const lapTime = new Date().getTime() - startTime;
    lapTimes.push(lapTime);
    const lapTimeDisplay = formatTime(lapTime);
    const lapListItem = document.createElement('li');
    lapListItem.textContent = `Lap ${lapTimes.length}: ${lapTimeDisplay}`;
    lapTimesList.appendChild(lapListItem);
}

function updateStopwatch() {
    currentTime = new Date().getTime() - startTime;
    const hours = Math.floor(currentTime / 3600000);
    const minutes = Math.floor((currentTime % 3600000) / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    stopwatchDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return (number < 10 ? '0' : '') + number;
}

document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        if (startButton.disabled) {
            pauseStopwatch();
        } else {
            startStopwatch();
        }
    }
});