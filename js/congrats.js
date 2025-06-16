// js/congrats.js  — итоговая версия с просмотром фото во весь экран

/* ---------- Маппинг фамилия → номер фото ---------- */
const photoMap = {
  "бродецкая":   1,
  "букатина":    2,
  "бутенко":     3,
  "васильев":    4,
  "дмитрачкова": 5,
  "канева":      6,
  "карпушонок":  7,
  "клинецкая":   8,
  "кудинов":     9,
  "курдюкова":   10,
  "леканова":    11,
  "малёваный":   12,
  "мильков":     13,
  "муслимов":    14,
  "павлинова":   15,
  "павлов":      16,
  "паршин":      17,
  "подоксенова": 18,
  "пономарёв":   19,
  "пономарева":  20,
  "рагуев":      21,
  "семкичева":   22,
  "сидоров":     23,
  "смирнова":    24,
  "сокальская":  25,
  "стром":       26,
  "чупрова":     27
};

/* ---------- DOM-элементы ---------- */
const form           = document.getElementById('accessForm');
const spinner        = document.getElementById('spinner');
const photoContainer = document.getElementById('photoContainer');

/* ---------- Открытие фото на весь экран ---------- */
function openModal(src) {
  // если модалка уже открыта — удаляем
  const old = document.getElementById('photoModal');
  if (old) old.remove();

  const overlay = document.createElement('div');
  overlay.id   = 'photoModal';
  overlay.className = 'photo-modal';

  const imgBig = document.createElement('img');
  imgBig.src = src;
  overlay.appendChild(imgBig);

  // клик по оверлею закрывает модалку
  overlay.addEventListener('click', () => overlay.remove());
  document.body.appendChild(overlay);
}

/* ---------- Обработчик формы ---------- */
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const raw     = document.getElementById('surname').value.trim().toLowerCase();
  const surname = raw.split(/\s+/)[0];
  const idx     = photoMap[surname];

  /* сбрасываем контейнер и показываем спиннер */
  spinner.style.display = 'block';
  photoContainer.classList.remove('photo-grid');
  photoContainer.innerHTML = '';

  setTimeout(() => {
    spinner.style.display = 'none';

    if (!idx) {
      alert('Ученик не найден. Проверьте правильность ввода фамилии.');
      return;
    }

    /* создаём и вставляем фото из images/congrats/ */
    const img = document.createElement('img');
    img.src = `images/congrats/${idx}.JPG`;      // учтён верхний регистр
    img.alt = `Фото-поздравление №${idx}`;

    /* клик — открытие во весь экран */
    img.addEventListener('click', () => openModal(img.src));

    photoContainer.appendChild(img);
    photoContainer.classList.add('photo-grid');   // включает рамку + центр
  }, 800);
});
