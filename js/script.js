// Музыка
const backgroundMusic = document.getElementById('backgroundMusic');
if (backgroundMusic) {
  document.addEventListener('DOMContentLoaded', () => {
    backgroundMusic.play().catch(() => {
      console.warn('Автовоспроизведение музыки заблокировано.');
    });
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  });
}

// Таймер
const countdownDate = new Date("June 15, 2025 18:00:00").getTime();
setInterval(() => {
  const now = new Date().getTime();
  const distance = countdownDate - now;
  if (distance > 0) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById('days')?.innerText = String(days).padStart(2, '0');
    document.getElementById('hours')?.innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes')?.innerText = String(minutes).padStart(2, '0');
  }
}, 1000);

// Видео-поиск по фамилии
let students = {};
fetch('students.json')
  .then(res => res.json())
  .then(data => students = data)
  .catch(err => alert('Не удалось загрузить список студентов'));

document.getElementById('accessForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const surname = document.getElementById('surname').value.trim().toLowerCase();
  const spinner = document.getElementById('spinner');
  const container = document.getElementById('videoContainer');
  spinner.style.display = 'block';
  container.innerHTML = '';

  if (students[surname]) {
    const student = students[surname];
    const greeting = document.createElement('h2');
    greeting.textContent = `🎉 Привет, ${student.name}! 🎉`;

    const video = document.createElement('video');
    video.src = student.video;
    video.controls = true;
    video.style.width = '100%';

    video.addEventListener('canplay', () => {
      spinner.style.display = 'none';
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
    });

    video.addEventListener('error', () => {
      spinner.style.display = 'none';
      alert('Видео не удалось загрузить.');
    });

    container.appendChild(greeting);
    container.appendChild(video);
  } else {
    spinner.style.display = 'none';
    alert('Фамилия не найдена.');
  }
});

// Галерея
if (document.querySelector('.gallery-grid')) {
  const images = [
    { src: 'images/photo1.jpg', alt: 'Фото 1' },
    { src: 'images/photo2.jpg', alt: 'Фото 2' },
    { src: 'images/photo3.jpg', alt: 'Фото 3' }
  ];
  const grid = document.querySelector('.gallery-grid');
  images.forEach(img => {
    const div = document.createElement('div');
    const image = document.createElement('img');
    image.src = img.src;
    image.alt = img.alt;
    div.appendChild(image);
    grid.appendChild(div);
  });
}
