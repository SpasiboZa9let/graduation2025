// js/congrats.js

// Маппинг фамилий (ключ — фамилия в нижнем регистре) → номер фото
const photoMap = {
  "бродецкая":      1,
  "букатина":       2,
  "бутенко":        3,
  "васильев":       4,
  "дмитрачкова":    5,
  "канева":         6,
  "карпушонок":     7,
  "клинецкая":      8,
  "кудинов":        9,
  "курдюкова":     10,
  "леканова":      11,
  "малёваный":     12,
  "мильков":       13,
  "муслимов":      14,
  "павлинова":     15,
  "павлов":        16,
  "паршин":        17,
  "подоксенова":   18,
  "пономарёв":     19,
  "пономарева":    20,
  "рагуев":        21,
  "семкичева":     22,
  "сидоров":       23,
  "смирнова":      24,
  "сокальская":    25,
  "стром":         26,
  "чупрова":       27
};

c// js/congrats.js

const photoMap = {
  "бродецкая":   1,
  "букатина":    2,
  // … остальные фамилии …
  "чупрова":     27
};

const form           = document.getElementById("accessForm");
const spinner        = document.getElementById("spinner");
const photoContainer = document.getElementById("photoContainer");

form.addEventListener("submit", event => {
  event.preventDefault();

  const raw     = document.getElementById("surname").value.trim().toLowerCase();
  const surname = raw.split(/\s+/)[0];
  const idx     = photoMap[surname];

  // Сброс
  spinner.style.display = "block";
  photoContainer.classList.remove("photo-grid");
  photoContainer.innerHTML = "";

  setTimeout(() => {
    spinner.style.display = "none";

    if (!idx) {
      alert("Ученик не найден. Проверьте правильность ввода фамилии.");
      return;
    }

    // Вставляем единственное фото
    const img = document.createElement("img");
    img.src = `images/congrats/${idx}.jpg`;  // <--- без "congrats/" !!!
    img.alt = `Фото поздравление №${idx}`;
    photoContainer.appendChild(img);

    // Показываем контейнер как grid
    photoContainer.classList.add("photo-grid");
  }, 800);
});
