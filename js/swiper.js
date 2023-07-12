const swiper = new Swiper(".swiper", {
  loop: true,
  slidesPerView: "auto",
  autoplay: true,
  speed: 3000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
    stopOnLastSlide: false,
    waitForTransition: false,
  },
});
