const settings = {
  loop: true,
  autoplay: {
    delay: 0,
  },
  speed: 5000, //add
  slidesPerView: 3, //add
};

window.addEventListener("DOMContentLoaded", (event) => {
  console.log(" loaded");

  document.querySelectorAll(".swiper").forEach((swiperSlider) => {
    new Swiper(swiperSlider, settings);
  });
});

console.log("before loaded");
