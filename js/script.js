document.getElementById("accessForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Предотвращаем отправку формы

    const surname = document.getElementById("surname").value.trim();
    const spinner = document.getElementById("spinner");
    const videoContainer = document.getElementById("videoContainer");

    // Показываем спиннер
    spinner.style.display = "block";
    videoContainer.innerHTML = "";

    // Симуляция задержки (обычно тут идет запрос к серверу)
    setTimeout(function () {
        spinner.style.display = "none";

        // Проверка фамилии (заменить логику на реальную)
        if (surname === "Бродецкая") {
            const video = document.createElement("video");
            video.src = "videos/congratulation.mp4"; // Путь к видео
            video.controls = true;
            videoContainer.appendChild(video);
        } else {
            videoContainer.innerHTML = "<p>Ученик не найден. Попробуйте снова.</p>";
        }
    }, 1500); // Задержка для имитации загрузки
});
