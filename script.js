// Управление фоновой музыкой
document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const muteButton = document.getElementById('muteButton');

    if (backgroundMusic) {
        backgroundMusic.play().catch(() => {
            console.warn('Фоновая музыка заблокирована браузером.');
        });
    }

    if (muteButton) {
        let isMuted = false;
        muteButton.addEventListener('click', () => {
            isMuted = !isMuted;
            backgroundMusic.muted = isMuted;
            muteButton.textContent = isMuted ? '🔊' : '🔇';
        });
    }
});

// Таймер обратного отсчета
function updateCountdown() {
    const eventDate = new Date('2025-05-25T18:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        // Проверяем, что элементы существуют
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');

        if (daysElement) daysElement.innerText = String(days).padStart(2, '0');
        if (hoursElement) hoursElement.innerText = String(hours).padStart(2, '0');
        if (minutesElement) minutesElement.innerText = String(minutes).padStart(2, '0');
    } else {
        const countdownContainer = document.querySelector('.countdown-container');
        if (countdownContainer) {
            countdownContainer.innerHTML = '<h2>Мероприятие началось!</h2>';
        }
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Логика формы поздравления
if (document.getElementById('accessForm')) {
    let students = {}; // Объект для хранения данных студентов

    // Загрузка данных студентов из JSON
    async function loadStudents() {
        try {
            const response = await fetch('students.json');
            if (!response.ok) throw new Error('Ошибка загрузки данных');
            students = await response.json();
            console.log('Данные студентов успешно загружены:', students);
        } catch (error) {
            console.error('Ошибка:', error.message);
            alert('Не удалось загрузить данные.');
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadStudents(); // Загружаем данные студентов при загрузке страницы

        const form = document.getElementById('accessForm');
        const surnameInput = document.getElementById('surname');
        const videoContainer = document.getElementById('videoContainer');
        const spinner = document.getElementById('spinner');

        // Обработка отправки формы
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const surname = surnameInput.value.toLowerCase().trim();
            videoContainer.innerHTML = ''; // Очищаем контейнер для видео
            spinner.style.display = 'block'; // Показываем спиннер

            if (students[surname]) {
                const student = students[surname];
                console.log('Найден студент:', student); // Отладочное сообщение

                // Создаем заголовок с именем студента
                const greeting = document.createElement('h2');
                greeting.textContent = `Привет, ${student.name}!`;
                greeting.className = 'greeting-title';

                // Создаем элемент <video>
                const video = document.createElement('video');
                video.src = student.video; // Указываем путь к видео из JSON
                video.controls = true; // Добавляем кнопки управления
                video.style.width = '100%';
                video.style.borderRadius = '10px';

                // Обработка события "canplay" (видео готово к воспроизведению)
                video.addEventListener('canplay', () => {
                    console.log('Видео успешно загружено:', video.src); // Отладочное сообщение
                    spinner.style.display = 'none'; // Скрываем спиннер
                    launchConfetti(); // Запускаем анимацию конфетти
                });

                // Обработка ошибок загрузки видео
                video.addEventListener('error', () => {
                    console.error('Ошибка загрузки видео:', video.src); // Отладочное сообщение
                    spinner.style.display = 'none';
                    alert(`Видео для ${student.name} не найдено.`);
                });

                // Добавляем элементы в DOM
                videoContainer.appendChild(greeting);
                videoContainer.appendChild(video);
                surnameInput.value = ''; // Очищаем поле ввода
            } else {
                spinner.style.display = 'none';
                alert('Фамилия не найдена.');
            }
        });
    });

    // Запуск анимации конфетти
    function launchConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

// Логика галереи фото
if (document.querySelector('.gallery-grid')) {
    const galleryData = [
        { id: 1, src: 'images/student1.jpg', alt: 'Выпускник 1' },
        { id: 2, src: 'images/student2.jpg', alt: 'Выпускник 2' },
        { id: 3, src: 'images/student3.jpg', alt: 'Выпускник 3' }
    ];

    function initGallery() {
        const galleryGrid = document.querySelector('.gallery-grid');
        galleryGrid.innerHTML = '';

        galleryData.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo.src;
            img.alt = photo.alt;
            img.style.width = '100%';
            img.style.borderRadius = '10px';
            img.classList.add('shadow'); // Добавляем тень

            galleryGrid.appendChild(img);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initGallery();
    });
}
