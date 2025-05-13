// Инициализация данных
const students = {};
let isMuted = false;

// Элементы
const backgroundMusic = document.getElementById('backgroundMusic');
const muteButton = document.getElementById('muteButton');
const bell = document.getElementById('bell');

// Загрузка данных студентов
fetch('students.json')
    .then(response => response.json())
    .then(data => Object.assign(students, data))
    .catch(error => console.error('Ошибка загрузки данных:', error));

// Управление звуком
muteButton.addEventListener('click', () => {
    isMuted = !isMuted;
    backgroundMusic.muted = isMuted;
    muteButton.textContent = isMuted ? '🔊' : '🔇';
});

// Автоматическое воспроизведение фоновой музыки
document.addEventListener('DOMContentLoaded', () => {
    backgroundMusic.play().catch(() => {
        console.warn('Фоновая музыка заблокирована браузером.');
    });
});

// Колокольчик с аудио эффектом
bell.addEventListener('click', () => {
    const bellSound = new Audio('audio/bell-sound.mp3');
    bellSound.play();
});

// Обработка формы
const form = document.getElementById('accessForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const surname = document.getElementById('surname').value.toLowerCase().trim();

        if (students[surname]) {
            const video = document.createElement('video');
            video.src = students[surname].video;
            video.controls = true;
            video.style.width = '100%';
            video.style.borderRadius = '10px';

            document.getElementById('videoContainer').innerHTML = `
                <h2 class="greeting">Привет, ${students[surname].name}!</h2>
            `;
            document.getElementById('videoContainer').appendChild(video);
        } else {
            alert('Фамилия не найдена');
        }
    });
}

// Модальное окно для галереи
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const images = document.querySelectorAll('.gallery img');
const closeBtn = document.querySelector('.close');

images.forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImage.src = img.src;
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
