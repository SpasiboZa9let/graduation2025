// Инициализация данных
const students = {};
let isMuted = false;

// Элементы
const form = document.getElementById('accessForm');
const input = document.getElementById('surname');
const videoContainer = document.getElementById('videoContainer');

// Загрузка данных студентов
fetch('students.json')
    .then(response => response.json())
    .then(data => Object.assign(students, data))
    .catch(error => console.error('Ошибка загрузки данных:', error));

// Обработка формы
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const surname = input.value.toLowerCase().trim();

    if (students[surname]) {
        const video = document.createElement('video');
        video.src = students[surname].video;
        video.controls = true;
        video.style.width = '100%';
        video.style.borderRadius = '10px';

        videoContainer.innerHTML = `
            <h2 class="greeting animate__animated animate__bounceIn">Привет, ${students[surname].name}!</h2>
        `;
        videoContainer.appendChild(video);
        input.value = '';
    } else {
        alert('Фамилия не найдена');
        input.classList.add('error');
        setTimeout(() => input.classList.remove('error'), 1000);
    }
});
