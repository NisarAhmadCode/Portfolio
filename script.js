// Select all nav links
const navLinks = document.querySelectorAll('.nav-link');

// Smooth scroll function with easing & offset for sticky header
function smoothScroll(targetId) {
    const headerOffset = 65; // height of sticky nav
    const target = document.getElementById(targetId);
    if (!target) return;

    // Calculate element position minus offset
    const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });

    // For accessibility: move focus to section after scrolling
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
}

// Attach click events
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const href = link.getAttribute('href').substring(1);
        smoothScroll(href);

        // Close mobile menu after click
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle.checked) {
            menuToggle.checked = false;
        }
    });
});

// Transition animation for sections
const sections = document.querySelectorAll('section');
const options = {
    threshold: 0.1
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, options);

sections.forEach(section => {
    section.classList.add('section-hidden');
    revealOnScroll.observe(section);
});
