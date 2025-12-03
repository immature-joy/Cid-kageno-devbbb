// ---------------- Global JS for Devfolio ----------------

document.addEventListener('DOMContentLoaded', () => {

    // ---------- 1. Auto Dark/Light Mode ----------
    const applyTheme = (isDark) => {
        document.documentElement.classList.toggle('dark', isDark);
    };

    // Initial theme based on system preference
    applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        applyTheme(e.matches);
    });

    // ---------- 2. Parallax Effect ----------
    const parallaxElements = document.querySelectorAll('.parallax');

    const handleParallax = () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.speed) || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    };

    // Debounced scroll for performance
    window.addEventListener('scroll', utils.debounce(handleParallax, 10));

    // ---------- 3. Smooth Scroll for Anchor Links ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---------- 4. Intersection Observer for Fade-in Animations ----------
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // ---------- 5. Floating Animation for Cards ----------
    function addFloatingAnimation() {
        document.querySelectorAll('.skill-card, .project-card').forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
            el.classList.add('animate-float');
        });
    }
    addFloatingAnimation();
});

// ---------- 6. Utility Functions ----------
const utils = {
    debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    },

    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
};
