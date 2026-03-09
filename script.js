class ZenTimer {
     constructor() {
          // 1. Initial State & Config
          this.config = {
               work: parseInt(localStorage.getItem('workTime')) || 25,
               break: parseInt(localStorage.getItem('breakTime')) || 5,
               circumference: 2 * Math.PI * 110
          };

          this.state = {
               timeLeft: this.config.work * 60,
               isWorkMode: true,
               isActive: false,
               timerId: null
          };

          // 2. DOM Elements
          this.elems = {
               minutes: document.getElementById('minutes'),
               seconds: document.getElementById('seconds'),
               status: document.getElementById('status'),
               progress: document.querySelector('.progress'),
               startBtn: document.getElementById('start-btn'),
               resetBtn: document.getElementById('reset-btn'),
               modal: document.getElementById('settings-modal'),
               toggleSettings: document.getElementById('settings-toggle'),
               saveBtn: document.getElementById('save-settings'),
               alarm: document.getElementById('alarm')
          };

          this.init();
     }

     init() {
          this.elems.startBtn.addEventListener('click', () => this.toggle());
          this.elems.resetBtn.addEventListener('click', () => this.reset());
          this.elems.toggleSettings.addEventListener('click', () => this.elems.modal.classList.toggle('hidden'));
          this.elems.saveBtn.addEventListener('click', () => this.saveSettings());
          this.updateUI();
     }

     toggle() {
          if (this.state.isActive) {
               this.pause();
          } else {
               this.start();
          }
     }

     start() {
          this.state.isActive = true;
          this.elems.startBtn.textContent = 'PAUSE';
          this.state.timerId = setInterval(() => {
               this.state.timeLeft--;
               this.updateUI();
               if (this.state.timeLeft <= 0) this.switchMode();
          }, 1000);
     }

     pause() {
          clearInterval(this.state.timerId);
          this.state.isActive = false;
          this.elems.startBtn.textContent = 'RESUME';
     }

     reset() {
          this.pause();
          this.state.timeLeft = (this.state.isWorkMode ? this.config.work : this.config.break) * 60;
          this.elems.startBtn.textContent = 'START';
          this.updateUI();
     }

     switchMode() {
          this.elems.alarm.play();
          this.state.isWorkMode = !this.state.isWorkMode;
          this.state.timeLeft = (this.state.isWorkMode ? this.config.work : this.config.break) * 60;
          this.elems.status.textContent = this.state.isWorkMode ? 'Focus Time' : 'Break Time';
          this.reset();
     }

     saveSettings() {
          const w = document.getElementById('work-input').value;
          const b = document.getElementById('break-input').value;

          this.config.work = parseInt(w);
          this.config.break = parseInt(b);
          localStorage.setItem('workTime', w);
          localStorage.setItem('breakTime', b);

          this.elems.modal.classList.add('hidden');
          this.reset();
     }

     updateUI() {
          const m = Math.floor(this.state.timeLeft / 60);
          const s = this.state.timeLeft % 60;

          this.elems.minutes.textContent = m.toString().padStart(2, '0');
          this.elems.seconds.textContent = s.toString().padStart(2, '0');

          // Progress Ring calculation
          const total = (this.state.isWorkMode ? this.config.work : this.config.break) * 60;
          const offset = this.config.circumference - (this.state.timeLeft / total) * this.config.circumference;
          this.elems.progress.style.strokeDashoffset = offset;

          // Dynamic Favicon/Title
          document.title = `${m}:${s.toString().padStart(2, '0')} - ZenTime`;
     }
}

// Start Application
document.addEventListener('DOMContentLoaded', () => new ZenTimer());