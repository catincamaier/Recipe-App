const carousel = document.querySelector('.carousel');
const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
let currentSlideIndex = 0;

function startCarousel() {
    setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        carousel.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    }, 2000);
}

startCarousel();