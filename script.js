// Список учеников и их данных
const students = {
    "бродецкая": {
        name: "Мария",
        surname: "Бродецкая",
        video: "videos/brodetskaya.mp4"
    },
    "букатина": {
        name: "Дарья",
        surname: "Букатина",
        video: "videos/bukatina.mp4"
    },
    "бутенко": {
        name: "Станислав",
        surname: "Бутенко",
        video: "videos/butenko.mp4"
    },
    "васильев": {
        name: "Семен",
        surname: "Васильев",
        video: "videos/vasiliev.mp4"
    },
    "дмитрачкова": {
        name: "Анастасия",
        surname: "Дмитрачкова",
        video: "videos/dmitrachkova.mp4"
    },
    "канева": {
        name: "Виктория",
        surname: "Канева",
        video: "videos/kaneva.mp4"
    },
    "карпушонок": {
        name: "Юлия",
        surname: "Карпушонок",
        video: "videos/karpushonok.mp4"
    },
    "клинецкая": {
        name: "Милана",
        surname: "Клинецкая",
        video: "videos/klinetskaya.mp4"
    },
    "кудинов": {
        name: "Евгений",
        surname: "Кудинов",
        video: "videos/kudinov.mp4"
    },
    "курдюкова": {
        name: "Анна",
        surname: "Курдюкова",
        video: "videos/kurdyukova.mp4"
    },
    "леканова": {
        name: "Виктория",
        surname: "Леканова",
        video: "videos/lekanova.mp4"
    },
    "малеваный": {
        name: "Тимофей",
        surname: "Малеваный",
        video: "videos/malevany.mp4"
    },
    "мильков": {
        name: "Роман",
        surname: "Мильков",
        video: "videos/milkov.mp4"
    },
    "муслимов": {
        name: "Даниил",
        surname: "Муслимов",
        video: "videos/muslimov.mp4"
    },
    "павлинова": {
        name: "Александра",
        surname: "Павлинова",
        video: "videos/pavlinova.mp4"
    },
    "павлов": {
        name: "Иван",
        surname: "Павлов",
        video: "videos/pavlov.mp4"
    },
    "паршин": {
        name: "Максим",
        surname: "Паршин",
        video: "videos/parshin.mp4"
    },
    "подоксенова": {
        name: "Анастасия",
        surname: "Подоксенова",
        video: "videos/podoksenova.mp4"
    },
    "пономарев": {
        name: "Никита",
        surname: "Пономарев",
        video: "videos/ponomarev.mp4"
    },
    "пономарева": {
        name: "Алина",
        surname: "Пономарева",
        video: "videos/ponomareva.mp4"
    },
    "рагуев": {
        name: "Артур",
        surname: "Рагуев",
        video: "videos/raguev.mp4"
    },
    "семкичева": {
        name: "Елизавета",
        surname: "Семкичева",
        video: "videos/semkicheva.mp4"
    },
    "сидоров": {
        name: "Лев",
        surname: "Сидоров",
        video: "videos/sidorov.mp4"
    },
    "смирнова": {
        name: "Юлия",
        surname: "Смирнова",
        video: "videos/smirnova.mp4"
    },
    "сокальская": {
        name: "Анастасия",
        surname: "Сокальская",
        video: "videos/sokalskaya.mp4"
    },
    "стром": {
        name: "Ксения",
        surname: "Стром",
        video: "videos/strom.mp4"
    },
    "чупрова": {
        name: "Ульяна",
        surname: "Чупрова",
        video: "videos/chuprova.mp4"
    }
};

// Настройка фоновой музыки
const backgroundMusic = document.getElementById('backgroundMusic');
const muteButton = document.getElementById('muteButton');

// Флаг для управления звуком
let isMuted = false;

// Воспроизводим музыку при загрузке страницы
backgroundMusic.volume = 0.5; // Устанавливаем громкость (50%)
backgroundMusic.play();

// Кнопка управления звуком
muteButton.addEventListener('click', () => {
    if (isMuted) {
        backgroundMusic.play();
        muteButton.textContent = 'Выключить звук';
    } else {
        backgroundMusic.pause();
        muteButton.textContent = 'Включить звук';
    }
    isMuted = !isMuted;
});

// Обработка формы
document.getElementById('accessForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Отменяем отправку формы

    const surname = document.getElementById('surname').value.toLowerCase().trim(); // Получаем введенную фамилию
    const inputField = document.getElementById('surname');
    const videoContainer = document.getElementById('videoContainer');

    // Очищаем контейнер с видео
    videoContainer.innerHTML = '';

    if (students[surname]) {
        const student = students[surname];

        // Если фамилия найдена, показываем видео с анимацией
        videoContainer.innerHTML = `
            <h2 class="greeting animate__animated animate__fadeIn">Привет, ${student.name}!</h2>
            <video class="animate__animated animate__zoomIn" width="100%" controls onplay="pauseBackgroundMusic()" onpause="resumeBackgroundMusic()">
                <source src="${student.video}" type="video/mp4">
                Ваш браузер не поддерживает воспроизведение видео.
            </video>
        `;

        // При начале воспроизведения видео останавливаем фоновую музыку
        const videoElement = videoContainer.querySelector('video');
        videoElement.onplay = () => {
            backgroundMusic.pause();
        };
        videoElement.onpause = () => {
            backgroundMusic.play();
        };

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
        alert('Фамилия не найдена. Попробуйте снова.');
    }
});

// Функция для паузы фоновой музыки
function pauseBackgroundMusic() {
    backgroundMusic.pause();
}

// Функция для возобновления фоновой музыки
function resumeBackgroundMusic() {
    if (!isMuted) {
        backgroundMusic.play();
    }
}
