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
        // Close mobile menu after clicking a link
        if (window.innerWidth <= 768) {
            closeMobileMenu();
        }
    });
});
// footer year
 document.getElementById("current-year").textContent = new Date().getFullYear();
// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.overlay');

function openMobileMenu() {
    hamburger.classList.add('active');
    navLinks.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (hamburger && navLinks && overlay) {
    hamburger.addEventListener('click', function() {
        if (navLinks.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    overlay.addEventListener('click', closeMobileMenu);
}

// FAQ Accordion functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        faqItem.classList.toggle('active');
    });
});

// Scroll animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
    });
}, observerOptions);

// Observe all cards and sections for fade-up animation
document.querySelectorAll('.expect-card, .testimonial-card, .gallery-item, .faq-item, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
});

// Staggered animation for expect cards
const expectCards = document.querySelectorAll('.expect-card');
expectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Staggered animation for testimonials
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Staggered animation for gallery items
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.05}s`;
});

// Button ripple effect
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.cssText = `
            position: absolute;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: ripple 0.6s ease-out;
        `;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Counter animation for price
const priceElement = document.querySelector('.price');
if (priceElement) {
    const price = 900;
    let counter = 0;
    const duration = 1000;
    const increment = price / (duration / 16);
    
    const updateCounter = () => {
        counter += increment;
        if (counter < price) {
            priceElement.textContent = `₹${Math.floor(counter)}`;
            requestAnimationFrame(updateCounter);
        } else {
            priceElement.textContent = `₹${price}`;
        }
    };
    
    const priceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCounter();
                priceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    priceObserver.observe(priceElement);
}

// Floating animation for hero image
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
    let floatDirection = 1;
    let floatPosition = 0;
    
    setInterval(() => {
        floatPosition += 0.05 * floatDirection;
        if (floatPosition > 10 || floatPosition < -10) {
            floatDirection *= -1;
        }
        heroImage.style.transform = `translateY(${floatPosition}px)`;
    }, 50);
}