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

// Логика работы формы и видео
document.getElementById('accessForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const surname = document.getElementById('surname').value.toLowerCase().trim();
    const input = document.getElementById('surname');
    const videoContainer = document.getElementById('videoContainer');
    
    videoContainer.innerHTML = '';
    input.classList.remove('error');

    if (students[surname]) {
        const student = students[surname];
        
        // Анимированное приветствие
        const greeting = document.createElement('h2');
        greeting.className = 'greeting animate__animated animate__bounceIn';
        greeting.textContent = `Привет, ${student.name}!`;
        
        // Видео с анимацией
        const video = document.createElement('video');
        video.className = 'animate__animated animate__zoomIn';
        video.src = student.video;
        video.controls = true;
        video.onplay = () => backgroundMusic.pause();
        video.onpause = () => !isMuted && backgroundMusic.play();
        
        videoContainer.append(greeting, video);
        input.value = '';
    } else {
        input.classList.add('error');
        setTimeout(() => input.classList.remove('error'), 1000);
        alert('Фамилия не найдена. Попробуйте еще раз!');
    }
});
