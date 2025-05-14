// Для расчета оставшегося времени до выпускного (например, 32 дня)
function startCountdown() {
    const endDate = new Date("2025-06-15"); // Устанавливаем дату выпускного
    const countdownElement = document.getElementById("countdown");

    function updateCountdown() {
        const now = new Date();
        const remainingTime = endDate - now;

        if (remainingTime <= 0) {
            countdownElement.innerHTML = "Выпускной уже наступил!";
            clearInterval(interval);
        } else {
            const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            countdownElement.innerHTML = `${days} дней до выпускного!`;
        }
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
}

startCountdown();
