
# Create JavaScript for navbar functionality
navbar_js = '''// =============================================
// RESPONSIVE NAVBAR - JAVASCRIPT
// =============================================

// DOM Elements
const header = document.getElementById('header');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const searchBtn = document.querySelector('.search-btn');
const searchOverlay = document.getElementById('searchOverlay');
const closeSearch = document.getElementById('closeSearch');
const dropdowns = document.querySelectorAll('.dropdown');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
    attachEventListeners();
});

// Initialize Navbar
function initializeNavbar() {
    // Set active link based on current page
    setActiveLink();
    
    // Check scroll position on load
    handleScroll();
}

// Attach Event Listeners
function attachEventListeners() {
    // Scroll event for sticky navbar
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        handleScroll();
        
        // Optional: Hide navbar on scroll down, show on scroll up
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't close for dropdown toggles
            if (!this.parentElement.classList.contains('dropdown')) {
                if (menuToggle) {
                    menuToggle.checked = false;
                    document.body.classList.remove('no-scroll');
                }
            }
        });
    });

    // Mobile dropdown toggle
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        
        dropdownLink.addEventListener('click', function(e) {
            // Only prevent default on mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
            }
        });
    });

    // Search overlay
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openSearch();
        });
    }

    if (closeSearch) {
        closeSearch.addEventListener('click', closeSearchOverlay);
    }

    if (searchOverlay) {
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeSearchOverlay();
            }
        });
    }

    // Close search with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            closeSearchOverlay();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Reset mobile menu state
            if (menuToggle) {
                menuToggle.checked = false;
            }
            document.body.classList.remove('no-scroll');
            
            // Reset mobile dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// Handle Scroll
function handleScroll() {
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Set Active Link
function setActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Open Search Overlay
function openSearch() {
    if (searchOverlay) {
        searchOverlay.classList.add('active');
        document.body.classList.add('no-scroll');
        
        // Focus on search input
        setTimeout(() => {
            const searchInput = searchOverlay.querySelector('input[type="text"]');
            if (searchInput) {
                searchInput.focus();
            }
        }, 100);
    }
}

// Close Search Overlay
function closeSearchOverlay() {
    if (searchOverlay) {
        searchOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#' || href === '#search') {
            return;
        }
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu
            if (menuToggle) {
                menuToggle.checked = false;
                document.body.classList.remove('no-scroll');
            }
        }
    });
});

// Add Animation Classes on Scroll (Optional Enhancement)
function revealOnScroll() {
    const reveals = document.querySelectorAll('.feature-card');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize feature cards with starting state
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Call once on load

// Navbar Color Change on Different Sections (Optional)
function updateNavbarColor() {
    const sections = document.querySelectorAll('section[data-navbar-color]');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        
        if (rect.top <= 100 && rect.bottom >= 100) {
            const color = section.getAttribute('data-navbar-color');
            header.style.background = color;
        }
    });
}

// Uncomment to enable:
// window.addEventListener('scroll', updateNavbarColor);

// Add Loading Animation
window.addEventListener('load', function() {
    header.style.animation = 'slideDown 0.5s ease-out';
});

// Add slideDown animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateY(-100%);
        }
        to {
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Console log for development
console.log('✅ Navbar initialized successfully!');
console.log('📱 Responsive breakpoints:', {
    mobile: '≤768px',
    tablet: '769px - 1024px',
    desktop: '≥1025px'
});'''

# Save navbar JavaScript
with open('navbar.js', 'w', encoding='utf-8') as f:
    f.write(navbar_js)

print("✅ Navbar JavaScript created!")
print("\n🎉 Complete Responsive Navbar Package Created!")
print("\n📦 Files Generated:")
print("   1. navbar.html - Demo page with navbar")
print("   2. navbar.css - Complete responsive styles")
print("   3. navbar.js - Full functionality")
print("\n✨ Features Included:")
print("   • Sticky navbar with scroll effects")
print("   • Smooth animations and transitions")
print("   • Animated hamburger menu (transforms to X)")
print("   • Multi-level dropdown menus")
print("   • Search overlay with modal")
print("   • Active link highlighting")
print("   • Auto-hide on scroll down, show on scroll up")
print("   • Mobile-first responsive design")
print("   • Smooth scroll for anchor links")
print("   • Accessibility support (ARIA labels)")
print("   • Touch-friendly mobile interface")
print("   • Backdrop blur glassmorphism effect")
