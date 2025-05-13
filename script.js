// Загрузка данных студентов
let students = {};
async function loadStudents() {
    try {
        const response = await fetch('students.json');
        if (!response.ok) {
            throw new Error('Ошибка загрузки данных');
        }
        students = await response.json();
    } catch (error) {
        console.error('Ошибка:', error.message);
        alert('Не удалось загрузить данные.');
    }
}

// Логика формы поздравления
if (document.getElementById('accessForm')) {
    document.addEventListener('DOMContentLoaded', () => {
        loadStudents();

        const form = document.getElementById('accessForm');
        const surnameInput = document.getElementById('surname');
        const suggestionsContainer = document.getElementById('suggestions');
        const videoContainer = document.getElementById('videoContainer');
        const spinner = document.getElementById('spinner');

        // Автокомплит
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

        // Отправка формы
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
                    alert('Видео не удалось загрузить.');
                    spinner.style.display = 'none';
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

    // Конфетти
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

    let likes = JSON.parse(localStorage.getItem('likes')) || {};
    let comments = JSON.parse(localStorage.getItem('comments')) || {};

    function initGallery() {
        const galleryGrid = document.querySelector('.gallery-grid');
        galleryGrid.innerHTML = '';

        galleryData.forEach(photo => {
            const photoContainer = document.createElement('div');
            photoContainer.className = 'photo-item';

            const img = document.createElement('img');
            img.src = photo.src;
            img.alt = photo.alt;
            img.style.width = '100%';
            img.style.borderRadius = '10px';

            const likeButton = document.createElement('button');
            likeButton.className = 'like-btn';
            likeButton.textContent = `❤️ ${likes[photo.id] || 0}`;
            likeButton.addEventListener('click', () => {
                likes[photo.id] = (likes[photo.id] || 0) + 1;
                localStorage.setItem('likes', JSON.stringify(likes));
                likeButton.textContent = `❤️ ${likes[photo.id]}`;
            });

            const commentSection = document.createElement('div');
            commentSection.className = 'comment-section';

            const commentInput = document.createElement('input');
            commentInput.type = 'text';
            commentInput.placeholder = 'Напишите комментарий...';
            commentInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const commentText = commentInput.value.trim();
                    if (commentText) {
                        comments[photo.id] = comments[photo.id] || [];
                        comments[photo.id].push(commentText);
                        localStorage.setItem('comments', JSON.stringify(comments));
                        commentInput.value = '';
                        renderComments(commentSection, photo.id);
                    }
                }
            });

            renderComments(commentSection, photo.id);

            photoContainer.appendChild(img);
            photoContainer.appendChild(likeButton);
            photoContainer.appendChild(commentInput);
            photoContainer.appendChild(commentSection);
            galleryGrid.appendChild(photoContainer);
        });
    }

    function renderComments(commentSection, photoId) {
        commentSection.innerHTML = '';
        const photoComments = comments[photoId] || [];
        photoComments.forEach(comment => {
            const commentElement = document.createElement('p');
            commentElement.className = 'comment';
            commentElement.textContent = comment;
            commentSection.appendChild(commentElement);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initGallery();
    });
}
