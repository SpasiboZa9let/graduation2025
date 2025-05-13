// Данные для галереи (можно загрузить из JSON или использовать статические данные)
const galleryData = [
    { id: 1, src: 'images/photo1.jpg', alt: 'Фото 1' },
    { id: 2, src: 'images/photo2.jpg', alt: 'Фото 2' },
    { id: 3, src: 'images/photo3.jpg', alt: 'Фото 3' }
];

// Загрузка данных лайков и комментариев из localStorage
let likes = JSON.parse(localStorage.getItem('likes')) || {};
let comments = JSON.parse(localStorage.getItem('comments')) || {};

// Инициализация галереи
function initGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.innerHTML = '';

    galleryData.forEach(photo => {
        // Создаем контейнер для фотографии
        const photoContainer = document.createElement('div');
        photoContainer.className = 'photo-item';

        // Добавляем изображение
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.alt;
        img.style.width = '100%';
        img.style.borderRadius = '10px';

        // Добавляем лайк
        const likeButton = document.createElement('button');
        likeButton.className = 'like-btn';
        likeButton.textContent = `❤️ ${likes[photo.id] || 0}`;
        likeButton.addEventListener('click', () => {
            likes[photo.id] = (likes[photo.id] || 0) + 1;
            localStorage.setItem('likes', JSON.stringify(likes));
            likeButton.textContent = `❤️ ${likes[photo.id]}`;
        });

        // Добавляем комментарии
        const commentSection = document.createElement('div');
        commentSection.className = 'comment-section';

        // Поле для ввода комментария
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

        // Отображение комментариев
        renderComments(commentSection, photo.id);

        // Собираем всё вместе
        photoContainer.appendChild(img);
        photoContainer.appendChild(likeButton);
        photoContainer.appendChild(commentInput);
        photoContainer.appendChild(commentSection);
        galleryGrid.appendChild(photoContainer);
    });
}

// Отображение комментариев
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

// Инициализация галереи при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
});
