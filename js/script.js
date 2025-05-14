document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('accessForm');
    const surnameInput = document.getElementById('surname');
    const videoContainer = document.getElementById('videoContainer');
    const spinner = document.getElementById('spinner');

    const studentData = {
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

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const surname = surnameInput.value.trim().toLowerCase();

        if (studentData[surname]) {
            spinner.style.display = 'block';
            setTimeout(() => {
                spinner.style.display = 'none';
                const student = studentData[surname];
                const video = document.createElement('video');
                video.src = student.video;
                video.controls = true;
                video.autoplay = true;
                videoContainer.innerHTML = '';  // очищаем предыдущие результаты
                videoContainer.appendChild(video);
            }, 1000);  // Имитация задержки
        } else {
            alert("Видео не найдено для указанной фамилии.");
        }
    });
});
