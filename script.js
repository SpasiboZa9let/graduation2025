// Список учеников (пример для Букатиной и других)
const students = {
    "букатина": {
        name: "Дарья",
        video: "videos/bukatina.mp4"
    },
    "бродецкая": {
        name: "Мария",
        video: "videos/brodetskaya.mp4"
    },
    // Добавьте остальных учеников аналогично
};

// Настройка музыки и кнопки звука
const backgroundMusic = document.getElementById('backgroundMusic');
const muteButton = document.getElementById('muteButton');
let isMuted = false;

backgroundMusic.volume = 0.5;
backgroundMusic.play();

muteButton.addEventListener('click', () => {
    isMuted = !isMuted;
    backgroundMusic[isMuted ? 'pause' : 'play']();
    muteButton.textContent = isMuted ? 'Включить звук' : 'Выключить звук';
});

// Обработка формы
document.getElementById('accessForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const surname = document.getElementById('surname').value.toLowerCase().trim();
    const input = document.getElementById('surname');
    const videoContainer = document.getElementById('videoContainer');

    videoContainer.innerHTML = '';
    input.classList.remove('error');

    if (students[surname]) {
        const student = students[surname];
        
        // Создаем приветствие
        const greeting = document.createElement('h2');
        greeting.className = 'greeting animate__animated animate__bounceIn';
        greeting.textContent = `Привет, ${student.name}!`;
        
        // Создаем видео
        const video = document.createElement('video');
        video.className = 'animate__animated animate__zoomIn';
        video.src = student.video;
        video.controls = true;
        video.onplay = () => backgroundMusic.pause();
        video.onpause = () => !isMuted && backgroundMusic.play();
        
        // Добавляем элементы
        videoContainer.append(greeting, video);
        input.value = '';
    } else {
        input.classList.add('error');
        setTimeout(() => input.classList.remove('error'), 1000);
        alert('Фамилия не найдена. Попробуйте еще раз!');
    }
});
