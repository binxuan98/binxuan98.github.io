// Typing Animation with enhanced error handling
function initTypedEffects() {
    // Check if Typed is available
    if (typeof Typed === 'undefined') {
        // Retry after a short delay
        setTimeout(initTypedEffects, 500);
        return;
    }
    
    // Check if elements exist for main page
    const typedTextElement = document.getElementById('typed-text');
    const typedQuotesElement = document.getElementById('typed-quotes');
    
    // Check if elements exist for society page
    const typedTextSocietyElement = document.getElementById('typed-text-society');
    const typedQuotesSocietyElement = document.getElementById('typed-quotes-society');
    
    // Initialize main page elements if they exist
    if (typedTextElement && typedQuotesElement) {
        initMainPageTyped();
    }
    
    // Initialize society page elements if they exist
    if (typedTextSocietyElement && typedQuotesSocietyElement) {
        initSocietyPageTyped();
    }
    
}

// Initialize typing effects for main page
function initMainPageTyped() {
    try {
        const typedTextElement = document.getElementById('typed-text');
        const typedQuotesElement = document.getElementById('typed-quotes');

        if (!typedTextElement || !typedQuotesElement || typedTextElement.dataset.typedReady === 'true') {
            return;
        }

        typedTextElement.dataset.typedReady = 'true';
        typedQuotesElement.dataset.typedReady = 'true';

        // Initialize Typed.js for hero subtitle
        new Typed('#typed-text', {
            strings: [
                'Graduate Student',
                'AI Researcher', 
                'Computer Vision Engineer',
                'NLP Enthusiast',
                'Deep Learning Developer',
                'Machine Learning Engineer',
                'Research Assistant'
            ],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            startDelay: 1000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });

        // Initialize Typed.js for hero description (quotes)
        new Typed('#typed-quotes', {
            strings: [
                'The future belongs to those who believe in the beauty of their dreams.',
                'Innovation distinguishes between a leader and a follower.',
                'The only way to do great work is to love what you do.',
                'Stay hungry, stay foolish.',
                'Code is poetry written in logic.',
                'Artificial Intelligence is the new electricity.',
                'In the world of AI, imagination is the only limit.'
            ],
            typeSpeed: 80,
            backSpeed: 40,
            backDelay: 3000,
            startDelay: 2000,
            loop: true,
            showCursor: false
        });
    } catch (error) {
        console.error('Error initializing main page typed effects:', error);
    }
}

// Initialize typing effects for society page
function initSocietyPageTyped() {
    try {
        const typedTextSocietyElement = document.getElementById('typed-text-society');
        const typedQuotesSocietyElement = document.getElementById('typed-quotes-society');

        if (!typedTextSocietyElement || !typedQuotesSocietyElement || typedTextSocietyElement.dataset.typedReady === 'true') {
            return;
        }

        typedTextSocietyElement.dataset.typedReady = 'true';
        typedQuotesSocietyElement.dataset.typedReady = 'true';

        // Initialize Typed.js for society hero subtitle
        new Typed('#typed-text-society', {
            strings: [
                '人工智能研究社团',
                'AI Research Society',
                '智能科学探索者',
                'Machine Learning Community',
                '深度学习实践团队',
                'Computer Vision Lab',
                '自然语言处理研究组'
            ],
            typeSpeed: 120,
            backSpeed: 60,
            backDelay: 2500,
            startDelay: 1000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });

        // Initialize Typed.js for society hero description (quotes)
        new Typed('#typed-quotes-society', {
            strings: [
                '人工智能不是要取代人类，而是要增强人类的能力。',
                'Artificial Intelligence is not about replacing humans, but augmenting human capabilities.',
                '在智研社，我们用代码编织未来，用算法点亮梦想。',
                'In AI Research Society, we weave the future with code and illuminate dreams with algorithms.',
                '每一行代码都是对未知世界的探索，每一个算法都是智慧的结晶。',
                'Every line of code is an exploration of the unknown, every algorithm is a crystallization of wisdom.',
                '让我们一起在人工智能的海洋中遨游，发现科学的奥秘。'
            ],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 4000,
            startDelay: 2500,
            loop: true,
            showCursor: false
        });
    } catch (error) {
        console.error('Error initializing society page typed effects:', error);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initTypedEffects();
});

// Fallback: Initialize when window is fully loaded
window.addEventListener('load', function() {
    // Only initialize if not already done
    const typedTextElement = document.getElementById('typed-text');
    const typedSocietyElement = document.getElementById('typed-text-society');
    if (typeof Typed !== 'undefined' && ((typedTextElement && typedTextElement.dataset.typedReady !== 'true') || (typedSocietyElement && typedSocietyElement.dataset.typedReady !== 'true'))) {
        initTypedEffects();
    }
});

// Mobile navigation toggle
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-open');
        const icon = mobileNavToggle.querySelector('i');
        if (navMenu.classList.contains('mobile-open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('mobile-open');
            const icon = mobileNavToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navMenu.classList.remove('mobile-open');
            const icon = mobileNavToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetHash = this.getAttribute('href');

        if (!targetHash || targetHash === '#') {
            return;
        }

        const target = document.querySelector(targetHash);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lightweight scroll animation system
const animatedElements = document.querySelectorAll('.animate-slide-left, .animate-slide-right, .animate-slide-up');

animatedElements.forEach(element => {
    element.classList.add('scroll-animate');
});

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px'
    });

    animatedElements.forEach(element => revealObserver.observe(element));
} else {
    animatedElements.forEach(element => element.classList.add('animate-in'));
}

// Skill items stagger animation
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Parallax effect for floating elements
const parallax = document.querySelectorAll('.floating-element');
let parallaxFrame = null;

function updateParallax() {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;

    parallax.forEach((element, index) => {
        const speed = 0.08 + (index * 0.025);
        element.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
    });

    parallaxFrame = null;
}

if (parallax.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
        if (!parallaxFrame) {
            parallaxFrame = window.requestAnimationFrame(updateParallax);
        }
    }, { passive: true });
}

// Society exhibition carousel
function initSocietyCarousel() {
    const carousel = document.querySelector('[data-society-carousel]');

    if (!carousel) return;
    if (carousel.dataset.carouselReady === 'true') return;
    carousel.dataset.carouselReady = 'true';

    const slides = Array.from(carousel.querySelectorAll('[data-carousel-slide]'));
    const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
    const summaries = Array.from(document.querySelectorAll('[data-carousel-summary]'));
    const currentLabel = carousel.querySelector('[data-carousel-current]');
    const progress = carousel.querySelector('[data-carousel-progress]');
    const prevButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const intervalMs = 6000;
    let currentIndex = 0;
    let timer = null;
    let isPaused = false;

    if (!slides.length) return;

    function formatIndex(index) {
        return String(index + 1).padStart(2, '0');
    }

    function updateProgress() {
        if (!progress) return;

        progress.style.transition = 'none';
        progress.style.width = reducedMotion ? '100%' : '0%';

        if (!reducedMotion && !isPaused) {
            window.requestAnimationFrame(() => {
                progress.style.transition = `width ${intervalMs}ms linear`;
                progress.style.width = '100%';
            });
        }
    }

    function showSlide(nextIndex) {
        currentIndex = (nextIndex + slides.length) % slides.length;

        slides.forEach((slide, index) => {
            slide.classList.toggle('is-active', index === currentIndex);
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('is-active', index === currentIndex);
        });

        summaries.forEach((summary, index) => {
            summary.classList.toggle('is-active', index === currentIndex);
        });

        if (currentLabel) {
            currentLabel.textContent = formatIndex(currentIndex);
        }

        updateProgress();
    }

    function stopAutoPlay() {
        if (timer) {
            window.clearInterval(timer);
            timer = null;
        }
    }

    function startAutoPlay() {
        stopAutoPlay();

        if (reducedMotion || isPaused) return;

        timer = window.setInterval(() => {
            showSlide(currentIndex + 1);
        }, intervalMs);
        updateProgress();
    }

    prevButton?.addEventListener('click', () => {
        showSlide(currentIndex - 1);
        startAutoPlay();
    });

    nextButton?.addEventListener('click', () => {
        showSlide(currentIndex + 1);
        startAutoPlay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            startAutoPlay();
        });
    });

    summaries.forEach((summary, index) => {
        summary.addEventListener('click', () => {
            showSlide(index);
            startAutoPlay();
        });
    });

    carousel.addEventListener('mouseenter', () => {
        isPaused = true;
        stopAutoPlay();
        if (progress) {
            progress.style.transition = 'none';
        }
    });

    carousel.addEventListener('mouseleave', () => {
        isPaused = false;
        startAutoPlay();
    });

    carousel.addEventListener('focusin', () => {
        isPaused = true;
        stopAutoPlay();
    });

    carousel.addEventListener('focusout', () => {
        if (!carousel.contains(document.activeElement)) {
            isPaused = false;
            startAutoPlay();
        }
    });

    showSlide(0);
    startAutoPlay();
}

initSocietyCarousel();

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Stagger animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-in');
        }, index * 200);
    });
    
    // Stagger animation for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate-in');
        }, index * 100);
    });
});
