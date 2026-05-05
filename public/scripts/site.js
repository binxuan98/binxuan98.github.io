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
      root.dataset.activeIndex = String(index);
      const detail = { index, total: slides.length };
      root.dispatchEvent(new CustomEvent('society:module-change', { detail, bubbles: true }));
      window.dispatchEvent(new CustomEvent('society:module-change', { detail }));
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
    root.addEventListener('society:carousel-reset', () => {
      setSlide(0);
      start();
    });

    root.dataset.carouselReady = 'true';
    setSlide(0);
    start();
  }

  document.querySelectorAll('[data-carousel]').forEach(initCarousel);

  function initSocietyScreenLoop() {
    const firstScreen = document.querySelector('.qingyang-compute-screen');
    const societyScreen = document.querySelector('#society-cultivation');
    const carousel = document.querySelector('[data-carousel]');
    if (!firstScreen || !societyScreen || !carousel || prefersReducedMotion.matches) return;

    const slides = Array.from(carousel.querySelectorAll('[data-carousel-slide]'));
    const params = new URLSearchParams(window.location.search);
    const interval = Number(carousel.dataset.carouselInterval || 6000);
    const firstDuration = Number(params.get('screenLoop') || firstScreen.dataset.screenDuration || 60000);
    const societyDuration = Number(params.get('societyLoop') || Math.max(interval * Math.max(1, slides.length), interval));
    let timer = null;

    function clearLoop() {
      if (timer) window.clearTimeout(timer);
      timer = null;
    }

    function goFirst() {
      firstScreen.scrollIntoView({ behavior: 'smooth', block: 'start' });
      clearLoop();
      timer = window.setTimeout(goSociety, firstDuration);
    }

    function goSociety() {
      carousel.dispatchEvent(new CustomEvent('society:carousel-reset'));
      societyScreen.scrollIntoView({ behavior: 'smooth', block: 'start' });
      clearLoop();
      timer = window.setTimeout(goFirst, societyDuration + 900);
    }

    document.addEventListener('visibilitychange', () => {
      clearLoop();
      if (!document.hidden && !prefersReducedMotion.matches) timer = window.setTimeout(goSociety, firstDuration);
    });
    prefersReducedMotion.addEventListener?.('change', () => {
      clearLoop();
      if (!prefersReducedMotion.matches) timer = window.setTimeout(goSociety, firstDuration);
    });

    timer = window.setTimeout(goSociety, firstDuration);
  }

  initSocietyScreenLoop();
})();
