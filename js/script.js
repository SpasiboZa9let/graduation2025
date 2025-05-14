// Конфетти и музыка при загрузке
window.addEventListener('DOMContentLoaded', () => {
  confetti({
    particleCount: 100,
    spread: 80,
    origin: { y: 0.6 }
  });

  const music = document.getElementById('backgroundMusic');
  if (music) {
    music.play().catch(() => {
      console.warn('Музыка не запущена — нужно взаимодействие пользователя.');
    });
  }
});
