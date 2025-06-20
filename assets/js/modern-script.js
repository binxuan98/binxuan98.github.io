// Modern Script for Interactive Effects

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
    
    // Check if elements exist
    const typedTextElement = document.getElementById('typed-text');
    const typedQuotesElement = document.getElementById('typed-quotes');
    
    if (!typedTextElement) {
        console.error('Element #typed-text not found!');
        return;
    }
    
    if (!typedQuotesElement) {
        console.error('Element #typed-quotes not found!');
        return;
    }
    
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
        console.log('Typed text effect initialized successfully');

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
        console.log('Typed quotes effect initialized successfully');
    } catch (error) {
        console.error('Error initializing Typed effects:', error);
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
                    } else if (data.animationClass === 'up') {
                        element.style.transform = 'translateY(50px)';
                    }
                }
            } else {
                // Element is not in viewport and hasn't been animated yet
                if (!data.hasAnimated) {
                    element.style.opacity = '0';
                    if (data.animationClass === 'left') {
                        element.style.transform = 'translateX(-50px)';
                    } else if (data.animationClass === 'right') {
                        element.style.transform = 'translateX(50px)';
                    } else if (data.animationClass === 'up') {
                        element.style.transform = 'translateY(50px)';
                    }
                }
            }
        });
    }
    
    // Throttled scroll handler for better performance
    let scrollTimeout;
    function handleScroll() {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = requestAnimationFrame(updateScrollAnimations);
    }
    
    // Initialize and bind scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
        // Recalculate element positions on resize
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const data = elementData.get(element);
            if (data) {
                data.originalTop = rect.top + scrollTop;
            }
        });
        updateScrollAnimations();
    });
    
    // Initial animation update
    updateScrollAnimations();
    
    // Also run after a short delay to ensure all elements are properly positioned
    setTimeout(updateScrollAnimations, 100);
    updateScrollAnimations();

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

    // Dynamic background particles
    createParticles();

    // Contact form enhancement (if needed)
    enhanceContactSection();
});

// Create floating particles background
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 3 + 1;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 215, 0, 0.3);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        animation: particleFloat ${duration}s linear infinite;
        box-shadow: 0 0 ${size * 2}px rgba(255, 215, 0, 0.5);
    `;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            createParticle(container);
        }
    }, duration * 1000);
}

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(particleStyle);

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

// GitHub stats refresh functionality
function refreshGitHubStats() {
    const statsImages = document.querySelectorAll('.github-stats img');
    statsImages.forEach(img => {
        const src = img.src;
        img.src = '';
        setTimeout(() => {
            img.src = src + '&t=' + new Date().getTime();
        }, 100);
    });
}

// Keyboard navigation enhancement
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-element');
    
    parallax.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

// Dark mode toggle (optional enhancement)
function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('darkMode', !document.body.classList.contains('light-mode'));
}

// Load saved theme preference
if (localStorage.getItem('darkMode') === 'false') {
    document.body.classList.add('light-mode');
}

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