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
        alert('Не удалось загрузить данные студентов');
        console.error(error);
    }
}

// Управление звуком
const backgroundMusic = document.getElementById('backgroundMusic');
const muteButton = document.getElementById('muteButton');

if (muteButton) {
    muteButton.addEventListener('click', () => {
        backgroundMusic.muted = !backgroundMusic.muted;
        muteButton.textContent = backgroundMusic.muted ? '🔇' : '🔊';
    });

    document.addEventListener('DOMContentLoaded', () => {
        backgroundMusic.play().catch(() => {
            muteButton.textContent = '🔇';
        });
    });
}

// Таймер обратного отсчёта
const countdownDate = new Date("June 15, 2025 18:00:00").getTime();

setInterval(() => {
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
        document.querySelector('.countdown-container')?.replaceChildren(
            document.createElement('h2').textContent = 'Мероприятие началось!'
        );
    }
}, 1000);

// Форма поздравления
if (document.getElementById('accessForm')) {
    loadStudents();

    const form = document.getElementById('accessForm');
    const surnameInput = document.getElementById('surname');
    const suggestions = document.getElementById('suggestions');
    const spinner = document.getElementById('spinner');
    const videoContainer = document.getElementById('videoContainer');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!isDataLoaded) {
            alert('Данные загружаются...');
            return;
        }

        const surname = surnameInput.value.toLowerCase().trim();
        spinner.style.display = 'block';
        videoContainer.innerHTML = '';

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
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            });

            video.addEventListener('error', () => {
                spinner.style.display = 'none';
                alert('Ошибка загрузки видео');
            });

            videoContainer.append(greeting, video);
            surnameInput.value = '';
        } else {
            spinner.style.display = 'none';
            alert('Фамилия не найдена');
        }
    });

    surnameInput.addEventListener('input', () => {
        if (!isDataLoaded) return;

        const inputValue = surnameInput.value.toLowerCase();
        const matches = Object.keys(students).filter(name => 
            name.startsWith(inputValue)
        );
        
        suggestions.textContent = matches.length > 0 
            ? `Доступные фамилии: ${matches.join(', ')}` 
            : '';
    });
}

// Галерея фото
if (document.querySelector('.gallery-grid')) {
    const galleryData = [
        { id: 1, src: 'images/photo1.jpg', alt: 'Фото 1' },
        { id: 2, src: 'images/photo2.jpg', alt: 'Фото 2' },
        { id: 3, src: 'images/photo3.jpg', alt: 'Фото 3' }
    ];

    let likes = JSON.parse(localStorage.getItem('likes')) || {};
    let comments = JSON.parse(localStorage.getItem('comments')) || {};

    function initGallery() {
        const galleryGrid = document.querySelector('.gallery-grid');
        galleryGrid.innerHTML = '';

        galleryData.forEach(photo => {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';

            const img = document.createElement('img');
            img.src = photo.src;
            img.alt = photo.alt;
            img.loading = 'lazy';

            const commentsSection = document.createElement('div');
            commentsSection.className = 'comments-section';

            const likeBtn = document.createElement('button');
            likeBtn.className = 'like-btn';
            likeBtn.textContent = `❤️ ${likes[photo.id] || 0}`;
            likeBtn.addEventListener('click', () => {
                likes[photo.id] = (likes[photo.id] || 0) + 1;
                localStorage.setItem('likes', JSON.stringify(likes));
                likeBtn.textContent = `❤️ ${likes[photo.id]}`;
            });

            const commentInput = document.createElement('input');
            commentInput.type = 'text';
            commentInput.className = 'comment-input';
            commentInput.placeholder = 'Комментарий...';
            commentInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const commentText = e.target.value.trim();
                    if (commentText) {
                        comments[photo.id] = comments[photo.id] || [];
                        comments[photo.id].push(commentText);
                        localStorage.setItem('comments', JSON.stringify(comments));
                        e.target.value = '';
                        renderComments(photoItem, photo.id);
                    }
                }
            });

            function renderComments(container, photoId) {
                const existingComments = comments[photoId] || [];
                const commentsList = document.createElement('div');
                commentsList.className = 'comments-list';

                existingComments.forEach(comment => {
                    const commentElement = document.createElement('p');
                    commentElement.textContent = comment;
                    commentsList.appendChild(commentElement);
                });

                container.querySelector('.comments-section').innerHTML = '';
                container.querySelector('.comments-section').appendChild(commentsList);
            }

            photoItem.appendChild(img);
            commentsSection.appendChild(likeBtn);
            commentsSection.appendChild(commentInput);
            photoItem.appendChild(commentsSection);
            galleryGrid.appendChild(photoItem);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initGallery();
    });
}
