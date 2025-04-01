// Banner Transition Logic
const bannerSlides = document.querySelectorAll('.banner-slide');
let currentSlide = 0;

function showSlide(index) {
    bannerSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % bannerSlides.length;
    showSlide(currentSlide);
}

// Automatically transition slides every 5 seconds
setInterval(nextSlide, 5000);

// Initialize the first slide
showSlide(currentSlide);