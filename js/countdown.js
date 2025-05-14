// js/countdown.js

document.addEventListener('DOMContentLoaded', () => {
  const countdownDate = new Date("June 20, 2025 18:00:00").getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const countdownEl = document.getElementById('countdown');

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      document.getElementById('days').innerText = days.toString().padStart(2, '0');
      document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
      document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    } else {
      countdownEl.innerHTML = '<span>🎓 Мероприятие началось! 🎉</span>';
    }
  };

  // Первичный вызов
  updateCountdown();

  // Обновление каждую секунду
  setInterval(updateCountdown, 1000);
});
