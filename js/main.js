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



// Form submission handler
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Simple validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Por favor, insira um email válido.');
            return;
        }

        // Simulate form submission
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');

        // Reset form
        this.reset();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Feature cards hover effect
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Tech items animation
document.querySelectorAll('.tech-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.style.animation = 'fadeInUp 0.6s ease-out forwards';
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
});

// Screenshot hover effects
document.querySelectorAll('.screenshot').forEach(screenshot => {
    screenshot.addEventListener('mouseenter', function() {
        const img = this.querySelector('.screenshot-img');
        img.style.transform = 'scale(1.05)';
        img.style.transition = 'transform 0.3s ease';
    });

    screenshot.addEventListener('mouseleave', function() {
        const img = this.querySelector('.screenshot-img');
        img.style.transform = 'scale(1)';
    });
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('nav-open');
}

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace('%', '').replace('/', ''));
        const isPercentage = stat.textContent.includes('%');
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            if (isPercentage) {
                stat.textContent = Math.floor(current) + '%';
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Trigger stats animation when section is visible
const statsSection = document.querySelector('#sobre');
if (statsSection) {
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease-in';

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrolled = window.pageYOffset;

    if (scrolled > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Parallax effect for hero section (subtle)
    const heroImage = document.querySelector('.hero-img');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Add some interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add cursor trail effect (optional)
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});

// CSS for cursor trail
const style = document.createElement('style');
style.textContent = `
    .cursor-trail {
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(245, 158, 11, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        transform: translate(-50%, -50%);
    }
`;
document.head.appendChild(style);
