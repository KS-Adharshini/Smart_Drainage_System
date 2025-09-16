// JavaScript for Navigation Functionality

// Mobile menu toggle functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebar = document.getElementById('sidebar');
const mobileOverlay = document.getElementById('mobileOverlay');
const navLinks = document.querySelectorAll('.nav-link');

/**
 * Toggle mobile menu open/closed state
 * Changes hamburger icon to X when open
 */
function toggleMobileMenu() {
    sidebar.classList.toggle('mobile-open');
    mobileOverlay.classList.toggle('active');
    
    // Toggle hamburger icon
    const icon = mobileMenuToggle.querySelector('i');
    if (sidebar.classList.contains('mobile-open')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
}

/**
 * Close mobile menu and reset icon
 */
function closeMobileMenu() {
    sidebar.classList.remove('mobile-open');
    mobileOverlay.classList.remove('active');
    mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
}

// Event listeners for mobile menu
mobileMenuToggle.addEventListener('click', toggleMobileMenu);
mobileOverlay.addEventListener('click', closeMobileMenu);

// Climate submenu toggle functionality
const climateToggle = document.getElementById('climateToggle');
const climateSubmenu = document.getElementById('climateSubmenu');
const climateChevron = document.getElementById('climateChevron');

/**
 * Toggle climate submenu open/closed
 * Rotates chevron icon to indicate state
 */
climateToggle.addEventListener('click', function(e) {
    e.preventDefault();
    climateSubmenu.classList.toggle('open');
    climateChevron.style.transform = climateSubmenu.classList.contains('open') 
        ? 'rotate(180deg)' : 'rotate(0deg)';
});

// Smooth scrolling and active link highlighting
const sections = document.querySelectorAll('.section');
const navLinksAll = document.querySelectorAll('.nav-link[data-section]');

/**
 * Intersection Observer for active link highlighting
 * Updates active navigation link based on which section is currently visible
 */
const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px', // Trigger when section is 20% from top
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            
            // Remove active class from all nav links
            navLinksAll.forEach(link => link.classList.remove('active'));
            
            // Add active class to current section's nav link
            const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                
                // Special handling for climate subsections
                if (['weather', 'rainfall', 'flood-risk'].includes(sectionId)) {
                    // Also highlight the main climate link
                    document.querySelector('.nav-link[data-section="climate"]').classList.add('active');
                    
                    // Open climate submenu if not already open
                    if (!climateSubmenu.classList.contains('open')) {
                        climateSubmenu.classList.add('open');
                        climateChevron.style.transform = 'rotate(180deg)';
                    }
                }
            }
        }
    });
}, observerOptions);

// Observe all sections for intersection
sections.forEach(section => observer.observe(section));

/**
 * Handle navigation link clicks
 * Provides smooth scrolling to target sections
 */
navLinksAll.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('data-section');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Smooth scroll to section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open (with slight delay for better UX)
            if (window.innerWidth <= 768) {
                setTimeout(closeMobileMenu, 300);
            }
        }
    });
});

/**
 * Fade-in animation on scroll
 * Adds visual appeal by fading in sections as they come into view
 */
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all fade-in elements
fadeElements.forEach(element => fadeObserver.observe(element));

/**
 * Authentication button placeholders
 * These would connect to actual authentication system in production
 */
document.getElementById('loginBtn').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Login functionality would be implemented here.\n\nIn a real application, this would:\n- Open a login modal or redirect to login page\n- Handle user authentication\n- Update UI based on login state');
});

document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Logout functionality would be implemented here.\n\nIn a real application, this would:\n- Clear user session\n- Redirect to login page or home\n- Update UI to logged-out state');
});

/**
 * Handle window resize events
 * Ensures mobile menu closes when switching to desktop view
 */
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

/**
 * Initialize page on load
 * Set up any initial states or animations
 */
document.addEventListener('DOMContentLoaded', function() {
    // Add initial fade-in class to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // Ensure first section is visible on load
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.classList.add('visible');
    }
    
    console.log('Smart Drainage System Dashboard initialized successfully');
});

/**
 * Smooth scroll behavior for browsers that don't support CSS scroll-behavior
 * Fallback for older browsers
 */
if (!('scrollBehavior' in document.documentElement.style)) {
    // Polyfill for smooth scrolling
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.offsetTop;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
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
        });
    });
}
