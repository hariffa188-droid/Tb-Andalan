/* ==========================================================
   Hero Background Image Slider — Tb. Andalan
   Untuk menambah/mengganti gambar:
   1. Taruh file gambar di folder: public/images/hero-slider/
   2. Perbarui daftar HERO_SLIDER_IMAGES di bawah ini.
   ========================================================== */

const HERO_SLIDER_CONFIG = {
  intervalMs: 5500, // Interval pergantian otomatis (5.5 detik)
  images: [
    {
      src: "public/images/hero-slider/hero-1.jpg",
      alt: "Proyek konstruksi bangunan modern"
    },
    {
      src: "public/images/hero-slider/hero-2.jpg",
      alt: "Gudang distribusi dan stok material bangunan Andalan"
    },
    {
      src: "public/images/hero-slider/hero-3.jpg",
      alt: "Pekerja konstruksi di lokasi proyek bangunan"
    },
    {
      src: "public/images/hero-slider/hero-4.jpg",
      alt: "Eksterior dan interior bangunan modern"
    }
  ]
};

(function initHeroSlider() {
  const slidesWrap = document.getElementById("heroSlides");
  const dotsWrap = document.getElementById("heroDots");
  const prevBtn = document.getElementById("heroPrev");
  const nextBtn = document.getElementById("heroNext");
  const controlsWrap = document.getElementById("heroControls");

  if (!slidesWrap || !HERO_SLIDER_CONFIG.images.length) {
    if (controlsWrap) controlsWrap.style.display = "none";
    return;
  }

  const items = HERO_SLIDER_CONFIG.images;
  const slideEls = [];
  const dotEls = [];
  const loadedState = new Array(items.length).fill(false);
  let activeIndex = 0;
  let timerId = null;
  let isPaused = false;

  // Bangun elemen slide & dot indicator
  items.forEach((item, idx) => {
    const slide = document.createElement("div");
    slide.className = "hero-slide" + (idx === 0 ? " is-active" : "");
    slide.setAttribute("role", "img");
    slide.setAttribute("aria-label", item.alt || `Slide ${idx + 1}`);
    slidesWrap.appendChild(slide);
    slideEls.push(slide);

    if (dotsWrap) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "hero-dot" + (idx === 0 ? " is-active" : "");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-selected", idx === 0 ? "true" : "false");
      dot.setAttribute("aria-label", `Slide ${idx + 1}: ${item.alt || ""}`.trim());
      dot.addEventListener("click", () => {
        goToSlide(idx, true);
      });
      dotsWrap.appendChild(dot);
      dotEls.push(dot);
    }
  });

  if (items.length <= 1 && controlsWrap) {
    controlsWrap.style.display = "none";
  }

  function loadSlideImage(index, onDone) {
    if (loadedState[index]) {
      if (onDone) onDone(true);
      return;
    }
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      loadedState[index] = true;
      slideEls[index].style.backgroundImage = `url('${items[index].src}')`;
      slideEls[index].classList.add("is-loaded");
      if (onDone) onDone(true);
    };
    img.onerror = () => {
      // Fallback: tetap gunakan background industrial dasar tanpa error console
      slideEls[index].classList.add("is-fallback");
      if (onDone) onDone(false);
    };
    img.src = items[index].src;
  }

  function preloadNext(fromIndex) {
    if (items.length <= 1) return;
    const nextIdx = (fromIndex + 1) % items.length;
    loadSlideImage(nextIdx);
  }

  function goToSlide(targetIndex, isManual) {
    const total = items.length;
    if (total === 0) return;

    const nextIdx = ((targetIndex % total) + total) % total;
    if (nextIdx === activeIndex && !isManual) return;

    loadSlideImage(nextIdx);
    preloadNext(nextIdx);

    slideEls[activeIndex].classList.remove("is-active");
    if (dotEls[activeIndex]) {
      dotEls[activeIndex].classList.remove("is-active");
      dotEls[activeIndex].setAttribute("aria-selected", "false");
    }

    activeIndex = nextIdx;
    slideEls[activeIndex].classList.add("is-active");
    if (dotEls[activeIndex]) {
      dotEls[activeIndex].classList.add("is-active");
      dotEls[activeIndex].setAttribute("aria-selected", "true");
    }

    if (isManual) {
      resetTimer();
    }
  }

  function startTimer() {
    if (items.length <= 1 || isPaused) return;
    stopTimer();
    timerId = window.setInterval(() => {
      goToSlide(activeIndex + 1, false);
    }, HERO_SLIDER_CONFIG.intervalMs);
  }

  function stopTimer() {
    if (timerId !== null) {
      window.clearInterval(timerId);
      timerId = null;
    }
  }

  function resetTimer() {
    stopTimer();
    startTimer();
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => goToSlide(activeIndex - 1, true));
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => goToSlide(activeIndex + 1, true));
  }

  if (controlsWrap) {
    controlsWrap.addEventListener("mouseenter", () => {
      isPaused = true;
      stopTimer();
    });
    controlsWrap.addEventListener("mouseleave", () => {
      isPaused = false;
      startTimer();
    });
    controlsWrap.addEventListener("focusin", () => {
      isPaused = true;
      stopTimer();
    });
    controlsWrap.addEventListener("focusout", () => {
      isPaused = false;
      startTimer();
    });
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopTimer();
    } else if (!isPaused) {
      startTimer();
    }
  });

  // Muat slide pertama segera, lalu preload slide berikutnya secara bertahap
  loadSlideImage(0, () => {
    items.forEach((_, idx) => {
      if (idx !== 0) {
        window.setTimeout(() => loadSlideImage(idx), idx * 450);
      }
    });
  });

  startTimer();
})();
