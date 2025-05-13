// Фоновая музыка
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

// Таймер
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
    let students = {};

    async function loadStudents() {
        try {
            const response = await fetch('students.json');
            students = await response.json();
        } catch (error) {
            alert('Ошибка загрузки данных!');
        }
    }

    loadStudents();

    document.getElementById('accessForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const surname = document.getElementById('surname').value.toLowerCase().trim();
        const spinner = document.getElementById('spinner');
        const videoContainer = document.getElementById('videoContainer');

        spinner.style.display = 'block';
        videoContainer.innerHTML = '';

        try {
            if (students[surname]) {
                const student = students[surname];
                
                const greeting = document.createElement('h2');
                greeting.textContent = `🎉 Привет, ${student.name}! 🎉`;
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

                videoContainer.append(greeting, video);
                document.getElementById('surname').value = '';
            } else {
                throw new Error('Фамилия не найдена');
            }
        } catch (error) {
            spinner.style.display = 'none';
            alert(error.message);
        }
    });

    document.getElementById('surname').addEventListener('input', () => {
        const inputValue = document.getElementById('surname').value.toLowerCase();
        const matches = Object.keys(students).filter(name => name.startsWith(inputValue));
        document.getElementById('suggestions').textContent = matches.length > 0 
            ? `Доступные фамилии: ${matches.join(', ')}` 
            : '';
    });
}

// Галерея
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
            commentInput.placeholder = 'Комментарий...';
            commentInput.className = 'comment-input';

            commentInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const commentText = e.target.value.trim();
                    if (commentText) {
                        comments[photo.id] = comments[photo.id] || [];
                        comments[photo.id].push(commentText);
                        localStorage.setItem('comments', JSON.stringify(comments));
                        commentInput.value = '';
                        renderComments(photoContainer, photo.id);
                    }
                }
            });

            function renderComments(container, photoId) {
                const commentsSection = container.querySelector('.comments');
                commentsSection.innerHTML = '';
                
                (comments[photoId] || []).forEach(comment => {
                    const commentElement = document.createElement('p');
                    commentElement.className = 'comment';
                    commentElement.textContent = comment;
                    commentsSection.appendChild(commentElement);
                });
            }

            const commentsSection = document.createElement('div');
            commentsSection.className = 'comments';
            renderComments(photoContainer, photo.id);

            photoContainer.appendChild(img);
            photoContainer.appendChild(likeBtn);
            photoContainer.appendChild(commentInput);
            photoContainer.appendChild(commentsSection);
            galleryGrid.appendChild(photoContainer);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initGallery();
    });
}
