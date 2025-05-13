// Инициализация данных
const students = {};
let isMuted = false;

// Элементы
const backgroundMusic = document.getElementById('backgroundMusic');
const muteButton = document.getElementById('muteButton');

// Загрузка данных студентов
fetch('students.json')
    .then(response => response.json())
    .then(data => Object.assign(students, data))
    .catch(error => console.error('Ошибка загрузки данных:', error));

// Управление звуком
if (muteButton) {
    muteButton.addEventListener('click', () => {
        isMuted = !isMuted;
        backgroundMusic.muted = isMuted;
        muteButton.textContent = isMuted ? '🔊' : '🔇';
    });
}

// Автоматическое воспроизведение фоновой музыки
document.addEventListener('DOMContentLoaded', () => {
    if (backgroundMusic) {
        backgroundMusic.play().catch(() => {
            console.warn('Фоновая музыка заблокирована браузером.');
        });
    }
});

// Обработка формы
const form = document.getElementById('accessForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Получаем введённую фамилию
        const surnameInput = document.getElementById('surname');
        const surname = surnameInput.value.toLowerCase().trim();

        // Очищаем контейнер перед добавлением нового видео
        const videoContainer = document.getElementById('videoContainer');
        videoContainer.innerHTML = '';

        // Проверяем, существует ли фамилия в базе
        if (students[surname]) {
            const student = students[surname];

            // Создаем заголовок
            const greeting = document.createElement('h2');
            greeting.textContent = `Привет, ${student.name}!`;
            greeting.className = 'greeting';

            // Создаем элемент видео
            const video = document.createElement('video');
            video.src = student.video;
            video.controls = true;
            video.style.width = '100%';
            video.style.borderRadius = '10px';

            // Добавляем заголовок и видео в контейнер
            videoContainer.appendChild(greeting);
            videoContainer.appendChild(video);

            // Очищаем поле ввода
            surnameInput.value = '';
        } else {
            alert('Фамилия не найдена');
        }
    });
}
