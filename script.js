// Список учеников и ссылок на их видео
const students = {
    "бродецкая": "https://www.youtube.com/embed/VIDEO_ID_BRODETSKAYA ",
    "букатина": "https://www.youtube.com/embed/VIDEO_ID_BUKATINA ",
    "бутенко": "https://www.youtube.com/embed/VIDEO_ID_BUTENKO ",
    "васильев": "https://www.youtube.com/embed/VIDEO_ID_VASILIEV ",
    "дмитрачкова": "https://www.youtube.com/embed/VIDEO_ID_DMITRACHKOVA ",
    "канева": "https://www.youtube.com/embed/VIDEO_ID_KANEVA ",
    "карпушонок": "https://www.youtube.com/embed/VIDEO_ID_KARPUSHONOK ",
    "клинецкая": "https://www.youtube.com/embed/VIDEO_ID_KLINETSKAYA ",
    "кудинов": "https://www.youtube.com/embed/VIDEO_ID_KUDINOV ",
    "курдюкова": "https://www.youtube.com/embed/VIDEO_ID_KURDYUKOVA ",
    "леканова": "https://www.youtube.com/embed/VIDEO_ID_LEKANOVA ",
    "малеваный": "https://www.youtube.com/embed/VIDEO_ID_MALEVANY ",
    "мильков": "https://www.youtube.com/embed/VIDEO_ID_MILKOV ",
    "муслимов": "https://www.youtube.com/embed/VIDEO_ID_MUSLIMOV ",
    "павлинова": "https://www.youtube.com/embed/VIDEO_ID_PAVLINOVA ",
    "павлов": "https://www.youtube.com/embed/VIDEO_ID_PAVLOV ",
    "паршин": "https://www.youtube.com/embed/VIDEO_ID_PARSHIN ",
    "подоксенова": "https://www.youtube.com/embed/VIDEO_ID_PODOKSENOVA ",
    "пономарев": "https://www.youtube.com/embed/VIDEO_ID_PONOMAREV ",
    "пономарева": "https://www.youtube.com/embed/VIDEO_ID_PONOMAREVA ",
    "рагуев": "https://www.youtube.com/embed/VIDEO_ID_RAGUEV ",
    "семкичева": "https://www.youtube.com/embed/VIDEO_ID_SEMKICHEVA ",
    "сидоров": "https://www.youtube.com/embed/VIDEO_ID_SIDOROV ",
    "смирнова": "https://www.youtube.com/embed/VIDEO_ID_SMIRNOVA ",
    "сокальская": "https://www.youtube.com/embed/VIDEO_ID_SOKALSKAYA ",
    "стром": "https://www.youtube.com/embed/VIDEO_ID_STROM ",
    "чупрова": "https://www.youtube.com/embed/VIDEO_ID_CHUPROVA "
};

document.getElementById('accessForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Отменяем отправку формы

    const surname = document.getElementById('surname').value.toLowerCase().trim(); // Получаем введенную фамилию
    const inputField = document.getElementById('surname');
    const videoContainer = document.getElementById('videoContainer');

    // Очищаем контейнер с видео
    videoContainer.innerHTML = '';

    if (students[surname]) {
        // Если фамилия найдена, показываем видео с анимацией
        videoContainer.innerHTML = `
            <iframe class="animate__animated animate__zoomIn" width="100%" height="315" src="${students[surname]}" frameborder="0" allowfullscreen></iframe>
        `;

        // Добавляем персонализированное приветствие
        const greeting = document.createElement('p');
        greeting.textContent = `Привет, ${surname.charAt(0).toUpperCase() + surname.slice(1)}!`;
        greeting.classList.add('greeting', 'animate__animated', 'animate__fadeIn');
        videoContainer.prepend(greeting);

        // Сбрасываем поле ввода
        inputField.value = '';
        inputField.style.borderColor = ''; // Убираем красную рамку, если была ошибка
    } else {
        // Если фамилия не найдена, подсвечиваем поле ввода красным
        inputField.style.borderColor = 'red';
        setTimeout(() => {
            inputField.style.borderColor = ''; // Возвращаем цвет обратно через 2 секунды
        }, 2000);

        // Показываем сообщение об ошибке
        alert('Код не найден. Попробуйте снова.');
    }
});
