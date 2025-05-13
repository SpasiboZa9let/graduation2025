// Функция для запуска конфетти
function launchConfetti() {
    confetti({
        particleCount: 100, // Количество частиц
        spread: 70,         // Распространение частиц
        origin: { y: 0.6 }  // Положение начала эффекта (по вертикали)
    });
}

// Обработка формы
document.addEventListener('DOMContentLoaded', () => {
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

                // Показываем загрузку
                const loading = document.createElement('div');
                loading.className = 'loading';
                loading.textContent = 'Загрузка видео...';
                videoContainer.appendChild(loading);

                // Запускаем конфетти после загрузки видео
                video.addEventListener('canplay', () => {
                    loading.remove(); // Убираем индикатор загрузки
                    launchConfetti(); // Запускаем эффект конфетти
                });

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
});
