// Управление фоновой музыкой
document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const muteButton = document.getElementById('muteButton');

    if (backgroundMusic) {
        backgroundMusic.play().catch(() => {
            console.warn('Фоновая музыка заблокирована браузером.');
        });
    }

    if (muteButton) {
        let isMuted = false;
        muteButton.addEventListener('click', () => {
            isMuted = !isMuted;
            backgroundMusic.muted = isMuted;
            muteButton.textContent = isMuted ? '🔊' : '🔇';
        });
    }
});

// Таймер обратного отсчета
function updateCountdown() {
    const eventDate = new Date('2025-05-25T18:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    } else {
        document.querySelector('.countdown-container').innerHTML = '<h2>Мероприятие началось!</h2>';
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Логика формы поздравления
if (document.getElementById('accessForm')) {
    let students = {};

    async function loadStudents() {
        try {
            const response = await fetch('students.json');
            if (!response.ok) throw new Error('Ошибка загрузки данных');
            students = await response.json();
        } catch (error) {
            console.error('Ошибка:', error.message);
            alert('Не удалось загрузить данные.');
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadStudents();

        const form = document.getElementById('accessForm');
        const surnameInput = document.getElementById('surname');
        const suggestionsContainer = document.getElementById('suggestions');
        const videoContainer = document.getElementById('videoContainer');
        const spinner = document.getElementById('spinner');

        surnameInput.addEventListener('input', () => {
            const inputValue = surnameInput.value.toLowerCase();
            const availableNames = Object.keys(students).filter(name => name.startsWith(inputValue));

            if (availableNames.length > 0) {
                suggestionsContainer.textContent = `Доступные фамилии: ${availableNames.join(', ')}`;
                suggestionsContainer.classList.add('active');
            } else {
                suggestionsContainer.textContent = '';
                suggestionsContainer.classList.remove('active');
            }
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const surname = surnameInput.value.toLowerCase().trim();
            videoContainer.innerHTML = '';
            spinner.style.display = 'block';

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
                });

                video.addEventListener('error', () => {
                    spinner.style.display = 'none';
                    alert('Видео не удалось загрузить.');
                });

                videoContainer.appendChild(greeting);
                videoContainer.appendChild(video);
                surnameInput.value = '';
            } else {
                spinner.style.display = 'none';
                alert('Фамилия не найдена.');
            }
        });
    });

    function launchConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

// Логика галереи фото
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
            const img = document.createElement('img');
            img.src = photo.src;
            img.alt = photo.alt;
            img.style.width = '100%';
            img.style.borderRadius = '10px';

            galleryGrid.appendChild(img);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initGallery();
    });
}
