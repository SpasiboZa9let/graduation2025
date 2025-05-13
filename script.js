// Инициализация
const students = {};
let isMuted = false;

// Элементы
const form = document.getElementById('accessForm');
const input = document.getElementById('surname');
const videoContainer = document.getElementById('videoContainer');
const backgroundMusic = document.getElementById('backgroundMusic');
const muteButton = document.getElementById('muteButton');
const galleryButton = document.getElementById('galleryButton');

// Загрузка данных
input.addEventListener('focus', async () => {
    if (Object.keys(students).length === 0) {
        try {
            const response = await fetch('students.json');
            Object.assign(students, await response.json());
        } catch (error) {
            alert('Ошибка загрузки данных');
        }
    }
});

// Обработка формы
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const surname = input.value.trim().toLowerCase();
    
    if (students[surname]) {
        const video = document.createElement('video');
        video.src = students[surname].video;
        video.controls = true;
        video.onplay = () => backgroundMusic.pause();
        video.onpause = () => !isMuted && backgroundMusic.play();
        
        videoContainer.innerHTML = `
            <h2>Привет, ${students[surname].name}!</h2>
        `;
        videoContainer.appendChild(video);
        input.value = '';
    } else {
        alert('Фамилия не найдена');
        input.value = '';
    }
});

// Управление звуком
muteButton.addEventListener('click', () => {
    isMuted = !isMuted;
    backgroundMusic.muted = isMuted;
    muteButton.textContent = isMuted ? '🔇' : '🔊';
});

// Переход в галерею
galleryButton.addEventListener('click', () => {
    window.location.href = 'gallery.html';
});
