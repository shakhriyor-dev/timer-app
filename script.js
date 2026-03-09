// O'zgaruvchilarni e'lon qilish
let timeLeft = 25 * 60;
let timerId = null;
let isWorkTime = true;

// DOM elementlarini tanlab olish
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const statusText = document.getElementById('status');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');

// Ekranni yangilash funksiyasi
function updateDisplay() {
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;
    minutesDisplay.textContent = mins.toString().padStart(2, '0');
    secondsDisplay.textContent = secs.toString().padStart(2, '0');
}

// Taymerni to'xtatish funksiyasi
function stopTimer() {
    clearInterval(timerId);
    timerId = null;
    startBtn.textContent = 'START';
}

// Start va Pause tugmasi uchun hodisa
startBtn.addEventListener('click', () => {
    if (timerId) {
        stopTimer();
    } else {
        startBtn.textContent = 'PAUSE';
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft <= 0) {
                stopTimer();
                isWorkTime = !isWorkTime;
                // Rejimga qarab vaqtni belgilash (25 min yoki 5 min)
                timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
                statusText.textContent = isWorkTime ? "Work Session" : "Short Break";
                updateDisplay();
                alert(isWorkTime ? "Work time! Diqqatni jamlang." : "Break time! Biroz dam oling.");
            }
        }, 1000);
    }
});

// Reset tugmasi uchun hodisa
resetBtn.addEventListener('click', () => {
    stopTimer();
    isWorkTime = true;
    timeLeft = 25 * 60;
    statusText.textContent = "Work Session";
    updateDisplay();
});