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
