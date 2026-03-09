class RetroTimer {
     constructor() {
          this.config = {
               work: parseInt(localStorage.getItem('workTime')) || 25,
               break: parseInt(localStorage.getItem('breakTime')) || 5
          };

          this.state = {
               timeLeft: this.config.work * 60,
               isWorkMode: true,
               isActive: false,
               timerId: null
          };

          this.nodes = {
               min: document.getElementById('minutes'),
               sec: document.getElementById('seconds'),
               status: document.getElementById('status-tag'),
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
          this.nodes.startBtn.addEventListener('click', () => this.toggle());
          this.nodes.resetBtn.addEventListener('click', () => this.reset());
          this.nodes.toggleSettings.addEventListener('click', () => this.nodes.modal.classList.toggle('hidden'));
          this.nodes.saveBtn.addEventListener('click', () => this.save());
          this.render();
     }

     toggle() {
          if (this.state.isActive) {
               clearInterval(this.state.timerId);
               this.state.isActive = false;
               this.nodes.startBtn.textContent = 'RESUME';
          } else {
               this.state.isActive = true;
               this.nodes.startBtn.textContent = 'PAUSE';
               this.state.timerId = setInterval(() => {
                    this.state.timeLeft--;
                    this.render();
                    if (this.state.timeLeft <= 0) this.switch();
               }, 1000);
          }
     }

     reset() {
          clearInterval(this.state.timerId);
          this.state.isActive = false;
          this.state.timeLeft = (this.state.isWorkMode ? this.config.work : this.config.break) * 60;
          this.nodes.startBtn.textContent = 'START';
          this.render();
     }

     switch() {
          this.nodes.alarm.play();
          this.state.isWorkMode = !this.state.isWorkMode;
          this.nodes.status.textContent = this.state.isWorkMode ? 'FOCUS' : 'BREAK';
          this.nodes.status.style.background = this.state.isWorkMode ? '#202020' : '#22c55e';
          this.reset();
     }

     save() {
          this.config.work = parseInt(document.getElementById('work-input').value);
          this.config.break = parseInt(document.getElementById('break-input').value);
          localStorage.setItem('workTime', this.config.work);
          localStorage.setItem('breakTime', this.config.break);
          this.nodes.modal.classList.add('hidden');
          this.reset();
     }

     render() {
          const m = Math.floor(this.state.timeLeft / 60);
          const s = this.state.timeLeft % 60;
          this.nodes.min.textContent = m.toString().padStart(2, '0');
          this.nodes.sec.textContent = s.toString().padStart(2, '0');
          document.title = `${m}:${s.toString().padStart(2, '0')} | Retro Pomodoro`;
     }
}

new RetroTimer();