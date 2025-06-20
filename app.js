// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const faqItems = document.querySelectorAll('.faq-item');
const ctaButtons = document.querySelectorAll('.cta-primary, .download-btn');
const allNavLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
function toggleMobileNav() {
    navLinks.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Close mobile nav when clicking on a link
function closeMobileNav() {
    navLinks.classList.remove('active');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
}

// Smooth scrolling for navigation links
function smoothScroll(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// FAQ Accordion functionality
function toggleFAQ(faqItem) {
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    faqItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't already active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// CTA Button Click Handler
function handleCTAClick() {
    // In a real implementation, this would integrate with a payment processor
    // For now, we'll show an alert and scroll to pricing section
    alert('Thank you for your interest! In a real implementation, this would redirect to a secure payment processor.');
    
    // Scroll to pricing section
    const pricingSection = document.querySelector('#pricing');
    if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
}

// Initialize event listeners
function initEventListeners() {
    // Mobile navigation toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileNav);
    }

    // Navigation links smooth scrolling
    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                smoothScroll(targetId);
                closeMobileNav(); // Close mobile nav after clicking
            }
        });
    });

    // FAQ accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                toggleFAQ(item);
            });
        }
    });

    // CTA buttons
    ctaButtons.forEach(button => {
        button.addEventListener('click', handleCTAClick);
    });

    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            if (navLinks.classList.contains('active')) {
                closeMobileNav();
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileNav();
        }
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.benefit-item, .feature-item, .faq-item, .twi-phrase');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Form validation (if forms are added later)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add smooth reveal animation for hero section
function initHeroAnimation() {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-cta');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s ease-out ${index * 0.2}s, transform 0.8s ease-out ${index * 0.2}s`;
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    initScrollAnimations();
    initHeroAnimation();
    
    // Add loading class removal
    document.body.classList.add('loaded');
});

// Add some utility functions for future enhancements

// Function to track button clicks (for analytics)
function trackButtonClick(buttonName) {
    // In a real implementation, this would send data to analytics service
    console.log(`Button clicked: ${buttonName}`);
}

// Function to handle form submissions (for future email capture)
function handleFormSubmission(formData) {
    // In a real implementation, this would send data to backend
    console.log('Form submitted:', formData);
}

// Function to create floating action button for mobile
function createFloatingCTA() {
    if (window.innerWidth <= 768) {
        const existingFAB = document.querySelector('.floating-cta');
        if (!existingFAB) {
            const fab = document.createElement('button');
            fab.className = 'floating-cta';
            fab.innerHTML = 'Get eBook - $9.99';
            fab.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: var(--color-gold);
                color: var(--color-navy);
                padding: 12px 20px;
                border-radius: 30px;
                border: none;
                font-weight: bold;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                z-index: 1000;
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            
            fab.addEventListener('click', handleCTAClick);
            document.body.appendChild(fab);
            
            // Show/hide based on scroll position
            window.addEventListener('scroll', () => {
                const pricingSection = document.querySelector('#pricing');
                if (pricingSection) {
                    const rect = pricingSection.getBoundingClientRect();
                    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                        fab.style.opacity = '0';
                        fab.style.pointerEvents = 'none';
                    } else {
                        fab.style.opacity = '1';
                        fab.style.pointerEvents = 'auto';
                    }
                }
            });
        }
    }
}

// Initialize floating CTA on mobile
window.addEventListener('load', createFloatingCTA);
window.addEventListener('resize', createFloatingCTA);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile nav
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMobileNav();
    }
    
    // Enter key on FAQ questions
    if (e.key === 'Enter' && e.target.classList.contains('faq-question')) {
        e.preventDefault();
        e.target.click();
    }
});

// Performance optimization - lazy load images if any are added later
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Call lazy loading on load
window.addEventListener('load', initLazyLoading);