// ======== Фоновая музыка ========
const backgroundMusic = document.getElementById('backgroundMusic');

document.addEventListener('DOMContentLoaded', () => {
    backgroundMusic.play().catch(() => {
        console.warn('Фоновая музыка заблокирована браузером.');
        const musicButton = document.createElement('button');
        musicButton.textContent = '🔊 Включить музыку';
        musicButton.className = 'music-btn';
        musicButton.onclick = () => backgroundMusic.play();
        document.body.prepend(musicButton);
    });
});

// ======== Таймер ========
const countdownDate = new Date("June 15, 2025 18:00:00").getTime();
let timerInterval = setInterval(() => {
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
        clearInterval(timerInterval);
        const message = document.createElement('h2');
        message.textContent = '🎉 Мероприятие началось! 🎉';
        document.querySelector('.countdown-container')?.replaceChildren(message);
    }
}, 1000);

// ======== Загрузка данных студентов ========
let students = {};
let isDataLoaded = false;

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

// ======== Обработка формы ========
document.getElementById('accessForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!isDataLoaded) {
        alert('Данные еще загружаются...');
        return;
    }

    const surnameInput = document.getElementById('surname');
    const surname = surnameInput.value.toLowerCase().trim();
    const spinner = document.getElementById('spinner');
    const videoContainer = document.getElementById('videoContainer');

    spinner.style.display = 'block';
    videoContainer.innerHTML = '';

    try {
        const student = students[surname];
        if (student) {
            const greeting = document.createElement('h2');
            greeting.textContent = `🎉 Привет, ${student.name}! 🎉`;
            greeting.className = 'greeting';

            const video = document.createElement('video');
            video.src = student.video;
            video.controls = true;
            video.style.width = '100%';
            video.style.borderRadius = '10px';
            video.poster = student.poster || ''; // можно добавить превью

            video.addEventListener('canplay', () => {
                spinner.style.display = 'none';
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            });

            video.addEventListener('error', () => {
                console.error(`Ошибка загрузки видео: ${student.video}`);
                alert('Видео не удалось загрузить. Проверьте путь к файлу.');
                spinner.style.display = 'none';
            });

            videoContainer.append(greeting, video);
        } else {
            spinner.style.display = 'none';
            const errorMsg = document.createElement('p');
            errorMsg.textContent = 'Фамилия не найдена. Попробуйте снова.';
            errorMsg.style.color = 'red';
            videoContainer.appendChild(errorMsg);
        }
    } catch (err) {
        console.error(err);
        alert('Произошла ошибка при загрузке.');
        spinner.style.display = 'none';
    }
});
