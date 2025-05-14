// Основной скрипт для других функций на страницах

// Функция для анимации появления кнопок при прокрутке страницы
document.addEventListener('scroll', () => {
    const buttons = document.querySelectorAll('.main-btn');
    buttons.forEach((button) => {
        const rect = button.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            button.classList.add('animated'); // Добавляем класс для анимации
        } else {
            button.classList.remove('animated'); // Убираем класс, если не на экране
        }
    });
});

// Пример анимации кнопок
// Если кнопка появляется на экране, то она будет анимирована
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.main-btn');
    buttons.forEach(button => {
        button.classList.add('fade-in'); // Класс для анимации появления
    });
});

// Кнопка "Назад" для страницы формы
const backButton = document.querySelector('.back-btn');
if (backButton) {
    backButton.addEventListener('click', function() {
        window.location.href = 'index.html'; // Переход на главную страницу
    });
}

// Обработка анимации колокольчика на главной странице
const bellIcon = document.querySelector('.bell-icon');
if (bellIcon) {
    bellIcon.addEventListener('click', function() {
        bellIcon.classList.add('ring'); // Добавление класса для анимации колокольчика
    });
});

// Обработчик для кнопки "ФОТОАРХИВ"
const photoButton = document.querySelector('.photo-btn');
if (photoButton) {
    photoButton.addEventListener('click', function() {
        window.location.href = 'photoArchive.html'; // Переход к фотоархиву
    });
}

// Обработчик для кнопки "ПОЗДРАВЛЕНИЕ"
const congratsButton = document.querySelector('.congrats-btn');
if (congratsButton) {
    congratsButton.addEventListener('click', function() {
        window.location.href = 'congrats.html'; // Переход к форме поздравления
    });
}

// Пример простой анимации для кнопок (класс для анимации)
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.main-btn');
    buttons.forEach(button => {
        button.classList.add('fade-in'); // Фейд-ин анимация
    });
});

// Функция для плавного скроллинга на главной странице при клике на ссылку
const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');
smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Функция для скрытия или отображения меню при клике на кнопку меню (если такая есть)
const menuButton = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
        menu.classList.toggle('open'); // Открытие/закрытие меню
    });
}

// Пример для плавного появления элементов при скролле
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.fade-on-scroll');
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            element.classList.add('visible'); // Добавление класса для видимости
        }
    });
});
