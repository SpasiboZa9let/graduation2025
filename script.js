// Загрузка данных студентов
let students = {};
let isDataLoaded = false;

// Загрузка данных студентов из JSON
async function loadStudents() {
    try {
        const response = await fetch('students.json');
        if (!response.ok) throw new Error('Ошибка загрузки данных');
        students = await response.json();
        isDataLoaded = true;
    } catch (error) {
        alert('Ошибка загрузки данных студентов');
        console.error(error);
    }
}

loadStudents();

// Обработка формы
document.getElementById('accessForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Проверка загрузки данных
    if (!isDataLoaded) {
        alert('Данные еще загружаются...');
        return;
    }

    const surname = document.getElementById('surname').value.toLowerCase().trim();
    const spinner = document.getElementById('spinner');
    const videoContainer = document.getElementById('videoContainer');

    // Показываем спиннер
    spinner.style.display = 'block';
    videoContainer.innerHTML = '';

    // Логируем для проверки
    console.log("Введено:", surname);           // Проверка
    console.log("Доступно:", students);         // Проверка

    // Поиск студента по фамилии
    if (students[surname]) {
        const student = students[surname];

        // Заголовок с приветствием
        const greeting = document.createElement('h2');
        greeting.textContent = `🎉 Привет, ${student.name}! 🎉`;
        greeting.className = 'greeting';

        // Видео
        const video = document.createElement('video');
        video.src = student.video;
        video.controls = true;
        video.autoplay = true;  // Видео начинает воспроизведение сразу
        video.style.width = '100%';
        video.style.borderRadius = '10px';

        // Обработчик для успешной загрузки видео
        video.addEventListener('canplay', () => {
            spinner.style.display = 'none'; // Прячем спиннер
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        });

        // Обработчик ошибок загрузки видео
        video.addEventListener('error', () => {
            spinner.style.display = 'none';  // Прячем спиннер
            alert('⚠️ Видео не удалось загрузить. Проверьте путь к файлу.');
            console.error(`Ошибка видео: ${student.video}`);
        });

        // Добавляем элементы в контейнер
        videoContainer.appendChild(greeting);
        videoContainer.appendChild(video);

    } else {
        spinner.style.display = 'none';  // Прячем спиннер, если фамилия не найдена
        alert('😔 Фамилия не найдена. Попробуйте ещё раз.');
    }
});

// Автоматически воспроизводим фоновую музыку при загрузке страницы
const backgroundMusic = document.getElementById('backgroundMusic');
document.addEventListener('DOMContentLoaded', () => {
    backgroundMusic.play().catch(() => {
        console.warn('Фоновая музыка заблокирована браузером.');
    });
});

// Таймер отсчёта до мероприятия
const countdownDate = new Date("June 15, 2025 18:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days')?.innerText = days.toString().padStart(2, '0');
        document.getElementById('hours')?.innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes')?.innerText = minutes.toString().padStart(2, '0');
    } else {
        const message = document.createElement('h2');
        message.textContent = 'Мероприятие началось!';
        document.querySelector('.countdown-container')?.replaceChildren(message);
    }
}, 1000);

// Галерея изображений
if (document.querySelector('.gallery-grid')) {
    const galleryData = [
        { id: 1, src: 'images/photo1.jpg', alt: 'Фото 1' },
        { id: 2, src: 'images/photo2.jpg', alt: 'Фото 2' },
        { id: 3, src: 'images/photo3.jpg', alt: 'Фото 3' }
    ];

    function initGallery() {
        const galleryGrid = document.querySelector('.gallery-grid');
        galleryGrid.innerHTML = '';

        galleryData.forEach(photo => {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';

            const img = document.createElement('img');
            img.src = photo.src;
            img.alt = photo.alt;
            img.loading = 'lazy';

            photoItem.appendChild(img);
            galleryGrid.appendChild(photoItem);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initGallery();
    });
}
