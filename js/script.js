// js/script.js
window.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('backgroundMusic');
  if (music) {
    music.play().catch(() => {
      console.warn('Музыка не запущена — нужно взаимодействие пользователя.');
    });
  }
});
