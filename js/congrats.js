<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Поздравление</title>
  <link rel="stylesheet" href="css/style.css"/>
</head>
<body>
  <a href="index.html" class="back-btn">← Назад</a>

  <audio id="backgroundMusic" loop>
    <source src="audio/music.mp3" type="audio/mpeg"/>
  </audio>

  <div class="form-container">
    <h2 class="form-title">Введите свою фамилию:</h2>
    <form id="accessForm">
      <input type="text" id="surname" placeholder="Фамилия (например: Бродецкая)" required />
      <button type="submit" class="submit-btn">Показать видео</button>
    </form>

    <div id="spinner" class="spinner" style="display: none;"></div>
    <div id="videoContainer"></div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
  <script src="js/congrats.js"></script>
</body>
</html>
