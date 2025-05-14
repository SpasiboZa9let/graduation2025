// Запуск конфетти при входе
window.addEventListener('DOMContentLoaded', () => {
  confetti({
    particleCount: 100,
    spread: 90,
    origin: { y: 0.6 }
  });

  const music = document.getElementById('backgroundMusic');
  music.play().catch(() => {
    console.warn('Музыка не запущена — пользователь не взаимодействовал со страницей.');
  });
});

// Таймер до события
const countdownDate = new Date("June 15, 2025 18:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance > 0) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
  } else {
    document.querySelector('.countdown-container').innerHTML = '<h2>🎊 Мероприятие началось! 🎊</h2>';
  }
}, 1000);
