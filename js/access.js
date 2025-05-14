// Проверка, доступен ли контент после выпускного
const currentDate = new Date();
const releaseDate = new Date("June 20, 2025 00:00:00");

if (currentDate < releaseDate) {
    document.getElementById("gallery").style.display = 'none';
    document.getElementById("video").style.display = 'none';
} else {
    document.getElementById("gallery").style.display = 'block';
    document.getElementById("video").style.display = 'block';
}
