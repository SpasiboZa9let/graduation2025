document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.play().catch(() => {
        console.warn('Фоновая музыка заблокирована браузером.');
    });

    // Обработчик формы
    const form = document.getElementById('accessForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const surname = document.getElementById('surname').value.toLowerCase().trim();
        
        // Данные студентов
        const students = {
            "бродецкая": {
                "name": "Мария",
                "surname": "Бродецкая",
                "video": "videos/brodetskaya.mp4"
            },
            "букатина": {
                "name": "Дарья",
                "surname": "Букатина",
                "video": "videos/bukatina.mp4"
            },
            "foxold": {
                "name": "Дорогой ученик",
                "surname": "Фоксольд",
                "video": "videos/alexander-ivanov.mp4"
            }
        };

        // Показываем спиннер и загружаем видео
        const spinner = document.getElementById('spinner');
        const videoContainer = document.getElementById('videoContainer');

        spinner.style.display = 'block';
        videoContainer.innerHTML = '';

        setTimeout(() => {
            spinner.style.display = 'none';
            if (students[surname]) {
                const videoElement = document.createElement('video');
                videoElement.src = students[surname].video;
                videoElement.controls = true;
                videoElement.width = 600;
                videoContainer.appendChild(videoElement);
            } else {
                videoContainer.innerHTML = `<p>Видео не найдено для фамилии "${surname}".</p>`;
            }
        }, 2000);
    });
});
