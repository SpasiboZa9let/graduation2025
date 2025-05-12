// Список учеников и ссылок на их видео
const students = {
    "petrov": "https://www.youtube.com/embed/VIDEO_ID_PETROV ",
    "ivanov": "https://www.youtube.com/embed/VIDEO_ID_IVANOV ",
    "sidorov": "https://www.youtube.com/embed/VIDEO_ID_SIDOROV "
    // Добавьте остальные фамилии и ссылки
};

document.getElementById('accessForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Отменяем отправку формы
    const surname = document.getElementById('surname').value.toLowerCase(); // Получаем введенную фамилию

    if (students[surname]) {
        // Если фамилия найдена, показываем видео с анимацией
        const videoContainer = document.getElementById('videoContainer');
        videoContainer.innerHTML = `
            <iframe class="animate__animated animate__zoomIn" width="560" height="315" src="${students[surname]}" frameborder="0" allowfullscreen></iframe>
        `;
    } else {
        alert('Фамилия не найдена. Попробуйте снова.');
    }
});
