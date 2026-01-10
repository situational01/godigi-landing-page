document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const imageSlider = document.querySelector(".image-slider");

  // Create and add navigation buttons
  const navContainer = document.createElement("div");
  navContainer.className = "slider-nav";

  const prevBtn = document.createElement("button");
  prevBtn.className = "slider-btn prev-btn";
  prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';

  const nextBtn = document.createElement("button");
  nextBtn.className = "slider-btn next-btn";
  nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';

  navContainer.appendChild(prevBtn);
  navContainer.appendChild(nextBtn);
  imageSlider.appendChild(navContainer);

  // Create and add dots
  const dotsContainer = document.createElement("div");
  dotsContainer.className = "slider-dots";

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "slider-dot";
    if (index === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  });

  imageSlider.appendChild(dotsContainer);

  // State variables
  let currentSlide = 0;
  let totalSlides = slides.length;
  let autoplayInterval;
  let autoplayDelay = 4000;
  let isAutoplayActive = true;

  // Initialize slider
  function initSlider() {
    startAutoplay();
    updateSlider();

    // Event listeners
    prevBtn.addEventListener("click", showPrevSlide);
    nextBtn.addEventListener("click", showNextSlide);

    // Dots event listeners
    document.querySelectorAll(".slider-dot").forEach((dot, index) => {
      dot.addEventListener("click", () => goToSlide(index));
    });

    // Keyboard navigation
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") showPrevSlide();
      if (e.key === "ArrowRight") showNextSlide();
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener("touchend", function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;

      if (touchStartX - touchEndX > swipeThreshold) {
        showNextSlide();
      } else if (touchEndX - touchStartX > swipeThreshold) {
        showPrevSlide();
      }
    }

    // Pause autoplay on hover
    imageSlider.addEventListener("mouseenter", pauseAutoplay);
    imageSlider.addEventListener("mouseleave", resumeAutoplay);
  }

  // Update slider position
  function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    document.querySelectorAll(".slider-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  // Navigation functions
  function showNextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
    resetAutoplay();
  }

  function showPrevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
    resetAutoplay();
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    resetAutoplay();
  }

  // Autoplay functions
  function startAutoplay() {
    autoplayInterval = setInterval(showNextSlide, autoplayDelay);
    isAutoplayActive = true;
  }

  function pauseAutoplay() {
    if (isAutoplayActive) {
      clearInterval(autoplayInterval);
    }
  }

  function resumeAutoplay() {
    if (isAutoplayActive) {
      clearInterval(autoplayInterval);
      autoplayInterval = setInterval(showNextSlide, autoplayDelay);
    }
  }

  function resetAutoplay() {
    if (isAutoplayActive) {
      clearInterval(autoplayInterval);
      autoplayInterval = setInterval(showNextSlide, autoplayDelay);
    }
  }

  // Initialize
  initSlider();
});
