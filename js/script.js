// Таймер обратного отсчета (например, до события)
const countdownDate = new Date("May 25, 2025 00:00:00").getTime();

// Обновляем таймер каждую секунду
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

// Обработчик формы
document.getElementById("accessForm").addEventListener("submit", function(event) {
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
            confetti();
        };
    } else {
        alert("Ученик не найден. Попробуйте снова.");
    }
});

// Функция для конфетти
function confetti() {
    const duration = 5 * 1000; // 5 секунд
    const end = Date.now() + duration;

    (function frame() {
        canvasConfetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        canvasConfetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}
