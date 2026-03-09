# 🍅 Retro Pomodoro — Neobrutalism Edition

 A high-performance Pomodoro timer built with a bold **Neobrutalism** design aesthetic. This project focuses on clean architecture, robust state management, and an exceptional user experience (UX).

---

## ✨ Features

* **Senior-Level Architecture:** Built using **ES6 Classes (OOP)** to ensure encapsulation and prevent global namespace pollution.
* **Neobrutalism UI:** Inspired by Gumroad and Uiverse aesthetics—featuring high-contrast colors, thick borders, and hard shadows.
* **Smart Validation:** Robust input handling that prevents `NaN` errors and ensures only positive integers are processed.
* **Persistent Settings:** Custom work and break intervals are saved via **LocalStorage API**, so your preferences persist across sessions.
* **Dynamic UX:** * Real-time browser tab updates (`document.title`) to track time while multitasking.
    * Audio notifications upon session completion.
    * Seamless "Focus" to "Break" mode transitions.

---

## 🛠 Tech Stack

* **HTML5:** Semantic structure for accessibility.
* **CSS3:** Custom properties (Variables), Flexbox layout, and Neobrutalistic shadow effects.
* **JavaScript (ES6+):** Object-Oriented Programming (Classes), LocalStorage API, Audio Engine, and Error Handling.

---

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/shakhriyor-dev/timer-app.git](https://github.com/shakhriyor-dev/timer-app.git)
    ```
2.  **Open the project:**
    Simply open `index.html` in any modern web browser.
3.  **Customization:**
    Click the ⚙️ icon to set your personal focus and break durations.

---

## 🧩 Code Philosophy

This project follows several key software engineering principles:
* **Encapsulation:** All logic is contained within the `RetroTimer` class.
* **State Management:** The timer's state (`isActive`, `isWorkMode`, `timeLeft`) is centralized for predictable UI updates.
* **DRY (Don't Repeat Yourself):** Reusable `render()` and `reset()` methods handle all visual and logical updates.
* **Fault Tolerance:** Added defensive checks for empty or invalid user inputs.

---

## 📄 License
This project is open-source and available under the MIT License.
