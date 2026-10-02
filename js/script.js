const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');
const sections = [...document.querySelectorAll('main section')];
const navLinks = document.querySelectorAll('header nav a');

function setMenuOpen(open) {
    menuIcon.classList.toggle('bx-x', open);
    navbar.classList.toggle('active', open);
    menuIcon.setAttribute('aria-expanded', String(open));
    menuIcon.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
}

menuIcon.addEventListener('click', () => {
    setMenuOpen(menuIcon.getAttribute('aria-expanded') !== 'true');
});

navLinks.forEach(link => link.addEventListener('click', () => setMenuOpen(false)));

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navbar.classList.contains('active')) {
        setMenuOpen(false);
        menuIcon.focus();
    }
});

window.matchMedia('(max-width: 900px)').addEventListener('change', () => setMenuOpen(false));

function updateNavigation() {
    const position = window.scrollY + header.offsetHeight + 40;
    let activeSection = sections[0];
    sections.forEach(section => {
        if (section.offsetTop <= position) activeSection = section;
    });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        activeSection = sections[sections.length - 1];
    }
    navLinks.forEach(link => {
        const active = link.hash === '#' + activeSection.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
    });
    header.classList.toggle('sticky', window.scrollY > 100);
}

window.addEventListener('scroll', updateNavigation, { passive: true });
window.addEventListener('resize', updateNavigation);
window.addEventListener('load', updateNavigation);
updateNavigation();
