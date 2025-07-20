const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');

function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerElement.textContent = `เวลา: ${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function updateScoreDisplay(score) {
    scoreElement.textContent = `คะแนน: ${score}`;
}