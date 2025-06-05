// MODAL Workshop Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove solid background based on scroll position
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Mobile menu close on link click
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });

    // Add hover effect to navbar
    navbar.addEventListener('mouseenter', function() {
        if (!this.classList.contains('scrolled')) {
            this.style.backgroundColor = 'rgba(8, 100, 100, 0.15)';
            this.style.backdropFilter = 'blur(10px)';
            this.style.webkitBackdropFilter = 'blur(10px)';
        }
    });

    navbar.addEventListener('mouseleave', function() {
        if (!this.classList.contains('scrolled')) {
            this.style.backgroundColor = 'transparent';
            this.style.backdropFilter = 'blur(0)';
            this.style.webkitBackdropFilter = 'blur(0)';
        }
    });

    // Custom mobile menu animation
    navbarToggler.addEventListener('click', function() {
        this.classList.toggle('active');
    });

    // Animate schedule cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe schedule cards and other elements
    const scheduleCards = document.querySelectorAll('.schedule-card');
    scheduleCards.forEach(card => {
        observer.observe(card);
    });

    // Add loading animation for external links
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add a subtle loading indicator
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 300);
        });
    });

    // Scroll to top functionality (optional)
    let scrollToTopBtn = null;
    
    function createScrollToTopButton() {
        scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '↑';
        scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
        scrollToTopBtn.classList.add('scroll-to-top-btn');
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #f37022;
            color: white;
            border: none;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        `;
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(scrollToTopBtn);
    }

    // Show/hide scroll to top button
    function toggleScrollToTopButton() {
        if (!scrollToTopBtn) {
            createScrollToTopButton();
        }
        
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    }

    window.addEventListener('scroll', toggleScrollToTopButton);

    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.schedule-card, .card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 0 20px rgba(0,0,0,0.1)';
        });
    });

    // Form validation for registration button (if needed)
    const registrationBtn = document.querySelector('a[href*="forms.google.com"]');
    if (registrationBtn) {
        registrationBtn.addEventListener('click', function(e) {
            // Add click tracking or additional functionality here if needed
            console.log('Registration button clicked');
        });
    }

    // Email link click tracking
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Email link clicked:', this.href);
        });
    });

    // Add fade-in animation class for schedule cards
    const style = document.createElement('style');
    style.textContent = `
        .schedule-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .schedule-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .navbar.scrolled {
            background-color: rgba(8, 100, 100, 0.95) !important;
            backdrop-filter: blur(10px);
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .scroll-to-top-btn:hover {
            background-color: #e35e1f !important;
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);

    // Schedule day toggle functionality
    const scheduleDays = document.querySelectorAll('.schedule-day');
    scheduleDays.forEach(day => {
        const header = day.querySelector('.schedule-day-header');
        header.addEventListener('click', () => {
            // Close other days
            scheduleDays.forEach(otherDay => {
                if (otherDay !== day && otherDay.classList.contains('active')) {
                    otherDay.classList.remove('active');
                }
            });
            // Toggle current day
            day.classList.toggle('active');
        });
    });

    // Make timeline items visible by default
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
    });

    // Animate timeline items on scroll with a slight delay for each item
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Auto-expand first day on page load
    if (scheduleDays.length > 0) {
        scheduleDays[0].classList.add('active');
    }

    console.log('MODAL Workshop website JavaScript loaded successfully!');
});

// Utility function for future use
function smoothScrollTo(element, duration = 1000) {
    const targetPosition = element.offsetTop - document.querySelector('.navbar').offsetHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
} 