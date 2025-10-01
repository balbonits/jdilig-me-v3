/**
 * Shared Wireframe Components JavaScript
 * Handles mobile menu, navigation, and interactive components
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScroll();
});

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const menuClose = document.getElementById('menu-close');

    if (!mobileMenuToggle || !mobileMenu) return;

    // Open menu
    mobileMenuToggle.addEventListener('click', function() {
        openMobileMenu();
    });

    // Close menu via close button
    if (menuClose) {
        menuClose.addEventListener('click', function() {
            closeMobileMenu();
        });
    }

    // Close menu via overlay click
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function() {
            closeMobileMenu();
        });
    }

    // Close menu when clicking on links
    const menuLinks = mobileMenu.querySelectorAll('.wf-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

/**
 * Open mobile menu
 */
function openMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    if (mobileMenu) {
        mobileMenu.classList.add('active');
    }
    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    if (mobileMenu) {
        mobileMenu.classList.remove('active');
    }
    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('active');
    }
    document.body.style.overflow = '';
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            // Close mobile menu if open
            closeMobileMenu();

            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

/**
 * Set active navigation item based on current page
 */
function setActiveNavItem(pageName) {
    const navLinks = document.querySelectorAll('.site-menu .wf-link');

    navLinks.forEach(link => {
        link.classList.remove('wf-link--on');

        const linkText = link.textContent.trim().toLowerCase();
        if (linkText === pageName.toLowerCase()) {
            link.classList.add('wf-link--on');
        }
    });
}

/**
 * Helper function to check if on mobile
 */
function isMobile() {
    return window.innerWidth < 768;
}

/**
 * Helper function to check if on tablet
 */
function isTablet() {
    return window.innerWidth >= 768 && window.innerWidth < 1024;
}

/**
 * Helper function to check if on desktop
 */
function isDesktop() {
    return window.innerWidth >= 1024;
}

// Export functions for use in other scripts
window.WireframeComponents = {
    openMobileMenu,
    closeMobileMenu,
    setActiveNavItem,
    isMobile,
    isTablet,
    isDesktop
};