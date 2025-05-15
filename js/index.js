// js/index.js
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

// Фейерверки при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
  // Запускаем серию фейерверков
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    confetti({
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 1000,
      particleCount: 60,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2
      }
    });
  }, 250);
});
