// Инициализация данных
const students = {};
let isMuted = false;

// Элементы
const form = document.getElementById('accessForm');
const input = document.getElementById('surname');
const videoContainer = document.getElementById('videoContainer');
const backgroundMusic = document.getElementById('backgroundMusic');
const muteButton = document.getElementById('muteButton');

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

// Обработка формы
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const surname = input.value.toLowerCase().trim();

        if (students[surname]) {
            const video = document.createElement('video');
            video.src = students[surname].video;
            video.controls = true;
            video.style.width = '100%';
            video.style.borderRadius = '10px';

            videoContainer.innerHTML = `
                <h2 class="greeting">Привет, ${students[surname].name}!</h2>
            `;
            videoContainer.appendChild(video);
            input.value = '';
        } else {
            alert('Фамилия не найдена');
        }
    });
}
