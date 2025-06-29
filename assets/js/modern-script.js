// Typing Animation with enhanced error handling
function initTypedEffects() {
    console.log('Initializing Typed effects...');
    
    // Check if Typed is available
    if (typeof Typed === 'undefined') {
        console.error('Typed.js is not loaded!');
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
    
    // If no elements found, log warning
    if (!typedTextElement && !typedQuotesElement && !typedTextSocietyElement && !typedQuotesSocietyElement) {
        console.warn('No typed elements found on this page');
    }
}

// Initialize typing effects for main page
function initMainPageTyped() {
    try {
        // Initialize Typed.js for hero subtitle
        const typedText = new Typed('#typed-text', {
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
        console.log('Main page typed text effect initialized successfully');

        // Initialize Typed.js for hero description (quotes)
        const typedQuotes = new Typed('#typed-quotes', {
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
        console.log('Main page typed quotes effect initialized successfully');
    } catch (error) {
        console.error('Error initializing main page typed effects:', error);
    }
}

// Initialize typing effects for society page
function initSocietyPageTyped() {
    try {
        // Initialize Typed.js for society hero subtitle
        const typedTextSociety = new Typed('#typed-text-society', {
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
        console.log('Society page typed text effect initialized successfully');

        // Initialize Typed.js for society hero description (quotes)
        const typedQuotesSociety = new Typed('#typed-quotes-society', {
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
        console.log('Society page typed quotes effect initialized successfully');
    } catch (error) {
        console.error('Error initializing society page typed effects:', error);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    initTypedEffects();
});

// Fallback: Initialize when window is fully loaded
window.addEventListener('load', function() {
    console.log('Window fully loaded');
    // Only initialize if not already done
    if (typeof Typed !== 'undefined' && document.getElementById('typed-text') && !document.getElementById('typed-text').classList.contains('typed-initialized')) {
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
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced scroll-based animation system
const animatedElements = document.querySelectorAll('.animate-slide-left, .animate-slide-right, .animate-slide-up');

// Store original animation classes for each element
const elementData = new Map();
animatedElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    elementData.set(element, {
        originalTop: rect.top + scrollTop,
        animationClass: element.classList.contains('animate-slide-left') ? 'left' :
                       element.classList.contains('animate-slide-right') ? 'right' : 'up',
        hasAnimated: false
    });
    element.classList.add('scroll-animate');
});

// Scroll-based animation function
function updateScrollAnimations() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    
    animatedElements.forEach(element => {
        const data = elementData.get(element);
        if (!data) return;
        
        // If element has already been animated, keep it in final state
        if (data.hasAnimated) {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0) translateY(0)';
            element.classList.add('animate-in');
            return;
        }
        
        const elementTop = data.originalTop;
        const elementBottom = elementTop + element.offsetHeight;
        const viewportTop = scrollTop;
        const viewportBottom = scrollTop + windowHeight;
        
        // Calculate if element is in viewport
        const isInViewport = elementTop < viewportBottom && elementBottom > viewportTop;
        
        if (isInViewport) {
            // Calculate animation progress based on element position
            const elementCenter = elementTop + element.offsetHeight / 2;
            const triggerPoint = viewportTop + windowHeight * 0.8; // Trigger when 80% down the viewport
            
            if (elementCenter < triggerPoint) {
                // Element has passed the trigger point, animate it in
                element.style.opacity = '1';
                element.style.transform = 'translateX(0) translateY(0)';
                element.classList.add('animate-in');
                data.hasAnimated = true;
            } else {
                // Element hasn't reached trigger point yet, keep in initial state
                element.style.opacity = '0';
                if (data.animationClass === 'left') {
                    element.style.transform = 'translateX(-50px)';
                } else if (data.animationClass === 'right') {
                    element.style.transform = 'translateX(50px)';
                } else {
                    element.style.transform = 'translateY(50px)';
                }
            }
        } else {
            // Element is not in viewport, keep in initial state
            element.style.opacity = '0';
            if (data.animationClass === 'left') {
                element.style.transform = 'translateX(-50px)';
            } else if (data.animationClass === 'right') {
                element.style.transform = 'translateX(50px)';
            } else {
                element.style.transform = 'translateY(50px)';
            }
        }
    });
}

// Scroll event listener with throttling
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            updateScrollAnimations();
            scrollTimeout = null;
        }, 16); // ~60fps
    }
});

// Initial animation update
updateScrollAnimations();

// Also run after a short delay to ensure all elements are properly positioned
setTimeout(updateScrollAnimations, 100);

// Project cards hover effect enhancement
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill items stagger animation
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-element');
    
    parallax.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Enhanced contact section
function enhanceContactSection() {
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 15px 30px rgba(255, 215, 0, 0.3)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 25px rgba(255, 215, 0, 0.2)';
        });
    });
}

// Initialize contact section enhancement
enhanceContactSection();

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