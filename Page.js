// script.js
let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        isRunning = true;
    }
}

function pauseStopwatch() {
    clearInterval(timer);
    isRunning = false;
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    displayTime();
    document.getElementById('lapTimes').innerHTML = '';
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    displayTime();
}

function displayTime() {
    let milliseconds = elapsedTime % 1000;
    let seconds = Math.floor(elapsedTime / 1000) % 60;
    let minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));

    document.getElementById('display').innerText = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(num, size = 2) {
    return ('00' + num).slice(-size);
}

function recordLap() {
    if (isRunning) {
        let lapTime = elapsedTime;
        let lapItem = document.createElement('li');
        lapItem.innerText = `Lap ${document.getElementById('lapTimes').childElementCount + 1}: ${formatTime(lapTime)}`;
        document.getElementById('lapTimes').appendChild(lapItem);
    }
}

function formatTime(time) {
    let milliseconds = time % 1000;
    let seconds = Math.floor(time / 1000) % 60;
    let minutes = Math.floor(time / (1000 * 60)) % 60;
    let hours = Math.floor(time / (1000 * 60 * 60));

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

