const pinnedItem = document.getElementById("pin");
document.addEventListener("DOMContentLoaded", () => {
  var controller = new ScrollMagic.Controller();

  // / toggle class on scroll
  const scrollTogglers = document.querySelectorAll(
    '[data-event="scroll-toggle"]'
  );
  new ScrollMagic.Scene({
    triggerElement: pinnedItem,
    duration: "130%",
    offset: 0,
    triggerHook: 0.1,
  })
    .setPin(pinnedItem)
    .addTo(controller)
    // .addIndicators() // add indicators (requires plugin)
    .on("progress", function (e) {
      let length = scrollTogglers.length;
      let progress = e.progress;
      let progressPerItem = 1 / length;
      let activeItem =
        parseInt(progress / progressPerItem) === length
          ? length - 1
          : parseInt(progress / progressPerItem);

      const setTabActive = (item, state = true) => {
        let tab = item.dataset.tab
          ? document.getElementById(item.dataset.tab)
          : null;
        if (!tab) return;

        tab.classList.toggle("active", state);
      };
      scrollTogglers.forEach((item, index) => {
        item.classList.toggle("active", index === activeItem);
        setTabActive(item, index === activeItem);
      });
    });
  scrollTogglers.forEach((element, index) => {
    element.onclick = () => {
      const scrollMagicPin = pinnedItem.parentElement;
      let pinOffset = scrollMagicPin.offsetTop;
      let pinHeight = scrollMagicPin.scrollHeight;
      const togglePosition =
        pinOffset + (pinHeight / scrollTogglers.length) * index;
      window.scrollTo(0, togglePosition - 30);
    };
  });

  document.querySelectorAll(".parallaxWrapper").forEach((parallaxWrapper) => {
    const layers = parallaxWrapper.querySelectorAll(".parallaxLayer");
    let tween = new TimelineMax().add(
      Array.from(layers).map((parallaxLayer) =>
        TweenMax.fromTo(
          parallaxLayer,
          2,
          {
            y: `${parallaxLayer.dataset.yoffset ?? 0}%`,
            x: `${parallaxLayer.dataset.xoffset ?? 0}%`,
          },
          {
            y: `-${parallaxLayer.dataset.yoffset ?? 0}%`,
            x: `-${parallaxLayer.dataset.xoffset ?? 0}%`,
          },
          "-=2"
        )
      )
    );
    new ScrollMagic.Scene({
      triggerElement: parallaxWrapper,
      duration: "170%",
      offset: 100,
      offsetHook: 0,
    })
      .setTween(tween)
      //   .addIndicators() // add indicators (requires plugin)
      .addTo(controller);
  });
});
