// Таймер обратного отсчета
const countdownDate = new Date().getTime() + 32 * 24 * 60 * 60 * 1000; // Таймер на 32 дня

const countdownInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector(".countdown-container").textContent = "Событие началось!";
    }
}, 1000);

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

// Обработчик формы поздравления
document.getElementById("accessForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const surname = document.getElementById("surname").value.toLowerCase().trim();
    const student = students[surname];

    if (student) {
        // Показываем спиннер
        document.getElementById("spinner").style.display = "block";
        
        // Ожидаем загрузки видео
        const video = document.createElement("video");
        video.src = student.video;
        video.controls = true;
        video.autoplay = true;
        video.onloadeddata = function() {
            // После загрузки скрываем спиннер и показываем видео
            document.getElementById("spinner").style.display = "none";
            document.getElementById("videoContainer").innerHTML = "";
            document.getElementById("videoContainer").appendChild(video);
        };
    } else {
        alert("Студент не найден. Попробуйте снова.");
    }
});
