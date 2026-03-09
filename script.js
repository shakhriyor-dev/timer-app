let timeLeft = 25 * 60;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const statusText = document.getElementById('status');
const startBtn = document.getElementById('start-btn');

function updateDisplay() {
     let mins = Math.floor(timeLeft / 60);
     let secs = timeLeft % 60;
     minutesDisplay.textContent = mins.toString().padStart(2, '0');
     secondsDisplay.textContent = secs.toString().padStart(2, '0');
}

startBtn.addEventListener('click', () => {
     if (timerId) {
          clearInterval(timerId);
          timerId = null;
          startBtn.textContent = 'Start';
     } else {
          startBtn.textContent = 'Pause';
          timerId = setInterval(() => {
               timeLeft--;
               updateDisplay();
               if (timeLeft === 0) {
                    clearInterval(timerId);
                    isWorkTime = !isWorkTime;
                    timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
                    statusText.textContent = isWorkTime ? "Work Time" : "Break Time";
                    alert(isWorkTime ? "Ishni boshlang!" : "Dam oling!");
                    updateDisplay();
               }
          }, 1000);
     }
});