// Обработчик для формы
document.getElementById("accessForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // Получаем фамилию из поля ввода
    const surname = document.getElementById("surname").value.trim().toLowerCase();

    // Данные студентов
    const students = {
        "бродецкая": {
            "name": "Мария",
            "surname": "Бродецкая",
            "video": "videos/brodetskaya.mp4"
        },
        "букатина": {
            "name": "Дарья",
            "surname": "Букатина",
            "video": "videos/bukatina.mp4"
        },
        "foxold": {
            "name": "Дорогой ученик",
            "surname": "Фоксольд",
            "video": "videos/alexander-ivanov.mp4"
        }
    };

    // Проверка, существует ли такой студент
    if (students[surname]) {
        // Показать видео
        const videoContainer = document.getElementById("videoContainer");
        videoContainer.innerHTML = `<video width="100%" controls>
                                      <source src="${students[surname].video}" type="video/mp4">
                                      Ваш браузер не поддерживает видео.
                                      </video>`;

        // Показать поздравление
        videoContainer.innerHTML += `<p>Поздравляем, ${students[surname].name}!</p>`;

        // Запуск конфетти
        confetti();

    } else {
        // В случае, если фамилия не найдена
        alert("Не найдено видео для этой фамилии.");
    }
});

// Функция для конфетти
function confetti() {
    canvasConfetti();
}
