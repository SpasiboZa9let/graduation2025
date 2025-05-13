// Загрузка данных студентов
let students = {};
let isDataLoaded = false;

async function loadStudents() {
    try {
        const response = await fetch('students.json');
        if (!response.ok) throw new Error('Ошибка загрузки данных');
        students = await response.json();
        isDataLoaded = true;
    } catch (error) {
        console.error('Ошибка:', error.message);
        alert('Не удалось загрузить данные.');
    }
}

// Логика формы поздравления
document.addEventListener('DOMContentLoaded', () => {
    loadStudents();

    const form = document.getElementById('accessForm');
    const surnameInput = document.getElementById('surname');
    const suggestions = document.getElementById('suggestions');
    const spinner = document.getElementById('spinner');
    const videoContainer = document.getElementById('videoContainer');
    const backgroundMusic = document.getElementById('backgroundMusic');

    // Автокомплит
    surnameInput.addEventListener('input', () => {
        if (!isDataLoaded) return;
        const inputValue = surnameInput.value.toLowerCase();
        const matches = Object.keys(students).filter(name => name.startsWith(inputValue));
        suggestions.textContent = matches.length > 0 
            ? `Доступные фамилии: ${matches.join(', ')}` 
            : '';
    });

    // Отправка формы
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!isDataLoaded) {
            alert('Данные загружаются...');
            return;
        }

        const surname = surnameInput.value.toLowerCase().trim();
        spinner.style.display = 'block';
        videoContainer.innerHTML = '';
        suggestions.textContent = '';

        if (students[surname]) {
            const student = students[surname];
            const greeting = document.createElement('h2');
            greeting.textContent = `Привет, ${student.name}!`;
            greeting.className = 'greeting-title';

            const video = document.createElement('video');
            video.src = student.video;
            video.controls = true;
            video.style.width = '100%';
            video.style.borderRadius = '10px';

            video.addEventListener('canplay', () => {
                spinner.style.display = 'none';
                launchConfetti();
                backgroundMusic.pause(); // Пауза фоновой музыки
            });

            video.addEventListener('error', () => {
                alert('Ошибка загрузки видео.');
                spinner.style.display = 'none';
            });

            videoContainer.append(greeting, video);
            surnameInput.value = '';
        } else {
            spinner.style.display = 'none';
            alert('Фамилия не найдена.');
        }
    });

    // Конфетти
    function launchConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
});

// Логика галереи
const galleryData = [
    { id: 1, src: 'images/photo1.jpg', alt: 'Фото 1' },
    { id: 2, src: 'images/photo2.jpg', alt: 'Фото 2' },
    { id: 3, src: 'images/photo3.jpg', alt: 'Фото 3' }
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
        img.style.transition = 'transform 0.3s ease';
        img.addEventListener('click', () => openModal(img.src));
        galleryGrid.appendChild(img);
    });
}

// Модальное окно для фото
function openModal(src) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <span class="close-modal">&times;</span>
        <img src="${src}" class="modal-content">
    `;
    document.body.appendChild(modal);
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
}

// Таймер обратного отсчета
const countdownDate = new Date("June 15, 2025 18:00:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');

    if (distance < 0) {
        clearInterval();
        document.querySelector('.countdown-container').innerHTML = 
            '<h2 style="color: #ff6f61;">Мероприятие началось!</h2>';
    }
}, 1000);

// Управление звуком
const muteButton = document.getElementById('muteButton');
const backgroundMusic = document.getElementById('backgroundMusic');

muteButton.addEventListener('click', () => {
    backgroundMusic.muted = !backgroundMusic.muted;
    muteButton.textContent = backgroundMusic.muted ? '🔇' : '🔊';
});

document.addEventListener('DOMContentLoaded', () => {
    backgroundMusic.play().catch(() => {
        muteButton.textContent = '🔇';
    });
});
