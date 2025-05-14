// Загружаем данные студентов
let students = {};
let isDataLoaded = false;

async function loadStudents() {
    try {
        const response = await fetch('students.json');
        if (!response.ok) throw new Error('Ошибка загрузки данных');
        students = await response.json();
        console.log('Данные студентов загружены:', students);
        isDataLoaded = true;
    } catch (error) {
        alert('Ошибка загрузки данных студентов');
        console.error(error);
    }
}

loadStudents();

// Фоновая музыка
const backgroundMusic = document.getElementById('backgroundMusic');
document.addEventListener('DOMContentLoaded', () => {
    backgroundMusic.play().catch(() => {
        console.warn('Фоновая музыка заблокирована браузером.');
    });
});

// Обработка формы
document.getElementById('accessForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!isDataLoaded) {
        alert('Данные еще загружаются...');
        return;
    }

    const surname = document.getElementById('surname').value.toLowerCase().trim();
    const spinner = document.getElementById('spinner');
    const videoContainer = document.getElementById('videoContainer');

    spinner.style.display = 'block';
    videoContainer.innerHTML = '';

    try {
        if (students[surname]) {
            const student = students[surname];

            // Создаем заголовок
            const greeting = document.createElement('h2');
            greeting.textContent = `🎉 Привет, ${student.name}! 🎉`;
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

            // Запускаем конфетти после загрузки видео
            video.addEventListener('canplay', () => {
                spinner.style.display = 'none';
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            });

            // Добавляем заголовок и видео в контейнер
            videoContainer.appendChild(greeting);
            videoContainer.appendChild(video);

            // Очищаем поле ввода
            document.getElementById('surname').value = '';
        } else {
            throw new Error('Фамилия не найдена');
        }
    } catch (error) {
        spinner.style.display = 'none';
        alert(error.message);
    }
});
