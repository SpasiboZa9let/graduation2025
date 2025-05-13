// Список учеников и путей к их видео
const students = {
    "бродецкая": "videos/brodetskaya.mp4",
    "букатина": "videos/bukatina.mp4",
    "бутенко": "videos/butenko.mp4",
    "васильев": "videos/vasiliev.mp4",
    "дмитрачкова": "videos/dmitrachkova.mp4",
    "канева": "videos/kaneva.mp4",
    "карпушонок": "videos/karpushonok.mp4",
    "клинецкая": "videos/klinetskaya.mp4",
    "кудинов": "videos/kudinov.mp4",
    "курдюкова": "videos/kurdyukova.mp4",
    "леканова": "videos/lekanova.mp4",
    "малеваный": "videos/malevany.mp4",
    "мильков": "videos/milkov.mp4",
    "муслимов": "videos/muslimov.mp4",
    "павлинова": "videos/pavlinova.mp4",
    "павлов": "videos/pavlov.mp4",
    "паршин": "videos/parshin.mp4",
    "подоксенова": "videos/podoksenova.mp4",
    "пономарев": "videos/ponomarev.mp4",
    "пономарева": "videos/ponomareva.mp4",
    "рагуев": "videos/raguev.mp4",
    "семкичева": "videos/semkicheva.mp4",
    "сидоров": "videos/sidorov.mp4",
    "смирнова": "videos/smirnova.mp4",
    "сокальская": "videos/sokalskaya.mp4",
    "стром": "videos/strom.mp4",
    "чупрова": "videos/chuprova.mp4"
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
            <video class="animate__animated animate__zoomIn" width="100%" controls>
                <source src="${students[surname]}" type="video/mp4">
                Ваш браузер не поддерживает воспроизведение видео.
            </video>
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
