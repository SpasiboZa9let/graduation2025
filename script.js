// Обработка формы на странице form.html
if (document.getElementById('accessForm')) {
    const form = document.getElementById('accessForm');
    const surnameInput = document.getElementById('surname');
    const suggestionsContainer = document.getElementById('suggestions');

    // Автокомплит и подсказки
    surnameInput.addEventListener('input', () => {
        const inputValue = surnameInput.value.toLowerCase();
        const availableNames = Object.keys(students)
            .filter(name => name.startsWith(inputValue));

        if (availableNames.length > 0) {
            suggestionsContainer.textContent = `Доступные фамилии: ${availableNames.join(', ')}`;
            suggestionsContainer.classList.add('active');
        } else {
            suggestionsContainer.textContent = '';
            suggestionsContainer.classList.remove('active');
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Получаем введённую фамилию
        const surname = surnameInput.value.toLowerCase().trim();

        // Очищаем контейнер перед добавлением нового видео
        const videoContainer = document.getElementById('videoContainer');
        videoContainer.innerHTML = '';

        // Показываем спиннер
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'block';

        // Очищаем подсказки
        suggestionsContainer.textContent = '';
        suggestionsContainer.classList.remove('active');

        // Проверяем, существует ли фамилия в базе
        if (students[surname]) {
            const student = students[surname];

            console.log(`Загружаем видео для ${student.name}: ${student.video}`);

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

            // Показываем ошибку, если видео не загружается
            video.addEventListener('error', () => {
                console.error(`Ошибка загрузки видео: ${student.video}`);
                alert('Видео не удалось загрузить. Проверьте путь к файлу.');
                spinner.style.display = 'none';
            });

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
