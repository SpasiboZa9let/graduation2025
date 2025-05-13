// Инициализация данных
let students = {};

// Загрузка данных студентов
async function loadStudents() {
    try {
        const response = await fetch('students.json');
        if (!response.ok) {
            throw new Error('Ошибка загрузки данных');
        }
        students = await response.json();
    } catch (error) {
        console.error('Ошибка:', error.message);
        alert('Не удалось загрузить данные. Проверьте файл students.json.');
    }
}

// Управление звуком
document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const muteButton = document.getElementById('muteButton');

    // Автоматическое воспроизведение фоновой музыки
    if (backgroundMusic) {
        backgroundMusic.play().catch(() => {
            console.warn('Фоновая музыка заблокирована браузером.');
        });
    }

    // Управление звуком
    if (muteButton) {
        let isMuted = false;
        muteButton.addEventListener('click', () => {
            isMuted = !isMuted;
            backgroundMusic.muted = isMuted;
            muteButton.textContent = isMuted ? '🔊' : '🔇';
        });
    }

    // Колокольчик с аудио эффектом
    const bell = document.getElementById('bell');
    if (bell) {
        bell.addEventListener('click', () => {
            const bellSound = new Audio('audio/bell-sound.mp3');
            bellSound.play();
        });
    }

    // Загружаем данные при загрузке страницы
    loadStudents();
});

// Обработка формы на странице form.html
if (document.getElementById('accessForm')) {
    const form = document.getElementById('accessForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Получаем введённую фамилию
        const surnameInput = document.getElementById('surname');
        const surname = surnameInput.value.toLowerCase().trim();

        // Очищаем контейнер перед добавлением нового видео
        const videoContainer = document.getElementById('videoContainer');
        videoContainer.innerHTML = '';

        // Показываем спиннер
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'block';

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

            // Запускаем конфетти и убираем спиннер после загрузки видео
            video.addEventListener('canplay', () => {
                spinner.style.display = 'none'; // Убираем спиннер
                launchConfetti(); // Запускаем эффект конфетти
            });

            // Добавляем заголовок и видео в контейнер
            videoContainer.appendChild(greeting);
            videoContainer.appendChild(video);

            // Очищаем поле ввода
            surnameInput.value = '';
        } else {
            spinner.style.display = 'none'; // Убираем спиннер
            alert('Фамилия не найдена');
        }
    });
}

// Функция для запуска конфетти
function launchConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}
