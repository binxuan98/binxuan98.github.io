(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function initCarousel(root) {
    if (!root || root.dataset.carouselReady === 'true') return;

    const slides = Array.from(root.querySelectorAll('[data-carousel-slide]'));
    const dots = Array.from(root.querySelectorAll('[data-carousel-dot]'));
    const summaries = Array.from(document.querySelectorAll('[data-carousel-summary]'));
    const current = root.querySelector('[data-carousel-current]');
    const progress = root.querySelector('[data-carousel-progress]');
    const prev = root.querySelector('[data-carousel-prev]');
    const next = root.querySelector('[data-carousel-next]');
    const interval = Number(root.dataset.carouselInterval || 6000);

    if (slides.length === 0) return;

    let index = 0;
    let timer = null;

    function restartProgress() {
      if (!progress) return;
      progress.style.animation = 'none';
      progress.offsetHeight;
      progress.style.animation = '';
    }

    function setSlide(nextIndex) {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, itemIndex) => {
        slide.classList.toggle('is-active', itemIndex === index);
      });
      dots.forEach((dot, itemIndex) => {
        dot.classList.toggle('is-active', itemIndex === index);
        dot.setAttribute('aria-current', itemIndex === index ? 'true' : 'false');
      });
      summaries.forEach((summary, itemIndex) => {
        summary.classList.toggle('is-active', itemIndex === index);
      });
      if (current) current.textContent = String(index + 1).padStart(2, '0');
      restartProgress();
    }

    function stop() {
      if (timer) window.clearInterval(timer);
      timer = null;
      root.classList.remove('is-running');
    }

    function start() {
      if (prefersReducedMotion.matches || slides.length < 2) return;
      stop();
      root.classList.add('is-running');
      timer = window.setInterval(() => setSlide(index + 1), interval);
      restartProgress();
    }

    prev?.addEventListener('click', () => {
      setSlide(index - 1);
      start();
    });
    next?.addEventListener('click', () => {
      setSlide(index + 1);
      start();
    });
    dots.forEach((dot, itemIndex) => {
      dot.addEventListener('click', () => {
        setSlide(itemIndex);
        start();
      });
    });
    summaries.forEach((summary, itemIndex) => {
      summary.addEventListener('click', () => {
        setSlide(itemIndex);
        start();
      });
    });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);
    prefersReducedMotion.addEventListener?.('change', () => {
      if (prefersReducedMotion.matches) stop();
      else start();
    });

    root.dataset.carouselReady = 'true';
    setSlide(0);
    start();
  }

  document.querySelectorAll('[data-carousel]').forEach(initCarousel);
})();
