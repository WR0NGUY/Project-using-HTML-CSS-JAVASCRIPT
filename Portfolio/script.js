// For smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Add animation when elements scroll into view (simple way)
const elements = document.querySelectorAll('.fade-in');

const scrollAnimation = () => {
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            element.classList.add('active');
        }
    });
};

// Run on page load and when scrolling
window.addEventListener('scroll', scrollAnimation);
window.addEventListener('load', scrollAnimation);
