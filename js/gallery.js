document.addEventListener('DOMContentLoaded', () => {
  const imageFolder = 'images/';
  const totalImages = 12; // Укажи количество фото в папке (можно автоматизировать на сервере)

  const gallery = document.getElementById('gallery');

  for (let i = 1; i <= totalImages; i++) {
    const img = document.createElement('img');
    img.src = `${imageFolder}photo${i}.jpg`;
    img.alt = `Фото ${i}`;
    img.loading = 'lazy';
    gallery.appendChild(img);
  }
});
