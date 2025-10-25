
# Create comprehensive CSS for responsive navbar with modern effects
navbar_css = '''/* =============================================
   RESPONSIVE NAVBAR - MODERN DESIGN 2025
   ============================================= */

:root {
    --primary-color: #0066cc;
    --primary-dark: #004999;
    --primary-light: #3385d6;
    --secondary-color: #ff6b35;
    --white: #ffffff;
    --black: #000000;
    --gray-100: #f8f9fa;
    --gray-200: #e9ecef;
    --gray-300: #ced4da;
    --gray-600: #6c757d;
    --gray-700: #495057;
    --gray-800: #343a40;
    --gray-900: #212529;
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.08);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.12);
    --shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.15);
    --shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.2);
    --radius-sm: 6px;
    --radius-md: 10px;
    --radius-lg: 16px;
    --transition-fast: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-base: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    --container-max-width: 1200px;
    --navbar-height: 80px;
    --navbar-height-scrolled: 70px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.6;
    color: var(--gray-800);
}

/* =============================================
   CONTAINER
   ============================================= */

.container {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 0 1.5rem;
}

/* =============================================
   HEADER & NAVBAR
   ============================================= */

.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: var(--shadow-sm);
    transition: var(--transition-base);
}

/* Scrolled State */
.header.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: var(--shadow-md);
}

.header.scrolled .navbar {
    padding: 0.75rem 0;
}

.header.scrolled .logo a {
    font-size: 1.375rem;
}

.header.scrolled .logo i {
    font-size: 1.75rem;
}

.navbar {
    padding: 1rem 0;
    transition: var(--transition-base);
}

.nav-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
}

/* =============================================
   LOGO
   ============================================= */

.logo a {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
    text-decoration: none;
    transition: var(--transition-fast);
}

.logo a:hover {
    transform: scale(1.05);
    color: var(--primary-dark);
}

.logo i {
    font-size: 2rem;
    transition: var(--transition-base);
    animation: rotateIcon 3s ease-in-out infinite;
}

@keyframes rotateIcon {
    0%, 100% { transform: rotate(0deg); }
    50% { transform: rotate(10deg); }
}

.logo a:hover i {
    animation: none;
    transform: rotate(15deg);
}

/* =============================================
   NAVIGATION MENU
   ============================================= */

.nav-menu {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 0.5rem;
}

.nav-menu > li {
    position: relative;
}

.nav-menu > li > a {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.75rem 1.25rem;
    color: var(--gray-700);
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    border-radius: var(--radius-sm);
    transition: var(--transition-fast);
    position: relative;
}

/* Animated Underline Effect */
.nav-menu > li > a::before {
    content: '';
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: var(--primary-color);
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-menu > li > a:hover::before,
.nav-menu > li > a.active::before {
    width: 60%;
}

.nav-menu > li > a:hover,
.nav-menu > li > a.active {
    color: var(--primary-color);
    background: rgba(0, 102, 204, 0.05);
}

.nav-menu > li > a i.fa-chevron-down {
    font-size: 0.75rem;
    transition: transform 0.3s ease;
}

.nav-menu > li:hover > a i.fa-chevron-down {
    transform: rotate(180deg);
}

/* =============================================
   DROPDOWN MENU
   ============================================= */

.dropdown {
    position: relative;
}

.dropdown-menu {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    min-width: 220px;
    background: var(--white);
    box-shadow: var(--shadow-lg);
    border-radius: var(--radius-md);
    padding: 0.75rem 0;
    list-style: none;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-15px);
    transition: var(--transition-base);
    z-index: 100;
}

.dropdown:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.dropdown-menu li {
    padding: 0;
}

.dropdown-menu li a {
    display: flex;
    align-items: center;
    padding: 0.875rem 1.5rem;
    color: var(--gray-700);
    text-decoration: none;
    font-size: 0.9375rem;
    transition: var(--transition-fast);
    position: relative;
}

.dropdown-menu li a::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 60%;
    background: var(--primary-color);
    border-radius: 0 4px 4px 0;
    transition: width 0.3s ease;
}

.dropdown-menu li a:hover::before {
    width: 4px;
}

.dropdown-menu li a:hover {
    background: rgba(0, 102, 204, 0.05);
    color: var(--primary-color);
    padding-left: 1.75rem;
}

/* Dropdown Animation Stagger */
.dropdown:hover .dropdown-menu li {
    animation: slideIn 0.3s ease-out backwards;
}

.dropdown:hover .dropdown-menu li:nth-child(1) { animation-delay: 0.05s; }
.dropdown:hover .dropdown-menu li:nth-child(2) { animation-delay: 0.1s; }
.dropdown:hover .dropdown-menu li:nth-child(3) { animation-delay: 0.15s; }
.dropdown:hover .dropdown-menu li:nth-child(4) { animation-delay: 0.2s; }

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-10px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* =============================================
   NAV ACTIONS (BUTTONS & SEARCH)
   ============================================= */

.nav-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.search-btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    color: var(--gray-600);
    background: var(--gray-100);
    text-decoration: none;
    transition: var(--transition-fast);
    cursor: pointer;
}

.search-btn:hover {
    background: var(--primary-color);
    color: var(--white);
    transform: scale(1.1) rotate(10deg);
    box-shadow: var(--shadow-md);
}

/* Buttons */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.625rem 1.5rem;
    font-size: 0.9375rem;
    font-weight: 600;
    text-decoration: none;
    border-radius: var(--radius-sm);
    transition: var(--transition-fast);
    white-space: nowrap;
    border: 2px solid transparent;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.btn:hover::before {
    width: 300px;
    height: 300px;
}

.btn-primary {
    background: var(--primary-color);
    color: var(--white);
}

.btn-primary:hover {
    background: var(--primary-dark);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 102, 204, 0.3);
}

.btn-secondary {
    background: var(--secondary-color);
    color: var(--white);
}

.btn-secondary:hover {
    background: #e65e2d;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3);
}

.btn-outline {
    background: transparent;
    color: var(--primary-color);
    border-color: var(--primary-color);
}

.btn-outline:hover {
    background: var(--primary-color);
    color: var(--white);
    transform: translateY(-3px);
}

/* =============================================
   HAMBURGER MENU (MOBILE)
   ============================================= */

.menu-toggle {
    display: none;
}

.hamburger {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 24px;
    cursor: pointer;
    padding: 0;
    z-index: 1001;
}

.hamburger .bar {
    width: 100%;
    height: 3px;
    background: var(--primary-color);
    border-radius: 3px;
    transition: var(--transition-base);
}

/* Hamburger Animation to X */
.menu-toggle:checked ~ .hamburger .bar:nth-child(1) {
    transform: translateY(10px) rotate(45deg);
}

.menu-toggle:checked ~ .hamburger .bar:nth-child(2) {
    opacity: 0;
    transform: translateX(-20px);
}

.menu-toggle:checked ~ .hamburger .bar:nth-child(3) {
    transform: translateY(-11px) rotate(-45deg);
}

/* =============================================
   SEARCH OVERLAY
   ============================================= */

.search-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    z-index: 2000;
    display: none;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease-out;
}

.search-overlay.active {
    display: flex;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.search-container {
    width: 90%;
    max-width: 800px;
    position: relative;
    animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.close-search {
    position: absolute;
    top: -60px;
    right: 0;
    width: 50px;
    height: 50px;
    background: transparent;
    border: 2px solid var(--white);
    border-radius: 50%;
    color: var(--white);
    font-size: 1.5rem;
    cursor: pointer;
    transition: var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-search:hover {
    background: var(--white);
    color: var(--black);
    transform: rotate(90deg);
}

.search-content h2 {
    color: var(--white);
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
}

.search-form {
    display: flex;
    gap: 1rem;
    margin-bottom: 3rem;
}

.search-input-wrapper {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
}

.search-input-wrapper i {
    position: absolute;
    left: 1.5rem;
    color: var(--gray-600);
    font-size: 1.25rem;
}

.search-input-wrapper input {
    width: 100%;
    padding: 1.25rem 1.5rem 1.25rem 4rem;
    font-size: 1.125rem;
    border: none;
    border-radius: var(--radius-md);
    background: var(--white);
    color: var(--gray-900);
    font-family: inherit;
}

.search-input-wrapper input:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.3);
}

.search-submit {
    width: 60px;
    height: 60px;
    background: var(--primary-color);
    border: none;
    border-radius: var(--radius-md);
    color: var(--white);
    font-size: 1.25rem;
    cursor: pointer;
    transition: var(--transition-fast);
}

.search-submit:hover {
    background: var(--primary-dark);
    transform: scale(1.05);
}

.popular-searches h3 {
    color: var(--white);
    font-size: 1.125rem;
    margin-bottom: 1rem;
    opacity: 0.9;
}

.search-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.search-tags a {
    padding: 0.5rem 1.25rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-full);
    color: var(--white);
    text-decoration: none;
    font-size: 0.9375rem;
    transition: var(--transition-fast);
}

.search-tags a:hover {
    background: var(--white);
    color: var(--primary-color);
    transform: translateY(-3px);
}

/* =============================================
   DEMO SECTIONS
   ============================================= */

.hero-section {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: var(--white);
    text-align: center;
    padding: 0 2rem;
    margin-top: 80px;
}

.hero-section h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin-bottom: 1rem;
}

.hero-section p {
    font-size: clamp(1rem, 2vw, 1.5rem);
    opacity: 0.95;
}

.content-section {
    padding: 5rem 0;
    background: var(--gray-100);
}

.content-section h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: var(--gray-900);
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.feature-card {
    background: var(--white);
    padding: 2rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    text-align: center;
    transition: var(--transition-base);
}

.feature-card:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-lg);
}

.feature-card i {
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.feature-card h3 {
    font-size: 1.25rem;
    color: var(--gray-900);
    margin-bottom: 0.75rem;
}

.feature-card p {
    color: var(--gray-600);
    line-height: 1.6;
}

/* =============================================
   RESPONSIVE DESIGN - TABLET
   ============================================= */

@media screen and (max-width: 1024px) {
    .nav-menu {
        gap: 0.25rem;
    }

    .nav-menu > li > a {
        padding: 0.75rem 1rem;
        font-size: 0.9375rem;
    }

    .nav-actions {
        gap: 0.5rem;
    }

    .btn {
        padding: 0.5rem 1.25rem;
        font-size: 0.875rem;
    }
}

/* =============================================
   RESPONSIVE DESIGN - MOBILE
   ============================================= */

@media screen and (max-width: 768px) {
    :root {
        --navbar-height: 70px;
    }

    .hamburger {
        display: flex;
    }

    .nav-menu {
        position: fixed;
        top: var(--navbar-height);
        left: -100%;
        width: 100%;
        height: calc(100vh - var(--navbar-height));
        background: var(--white);
        flex-direction: column;
        align-items: flex-start;
        padding: 2rem 1.5rem;
        gap: 0;
        transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        overflow-y: auto;
        box-shadow: var(--shadow-xl);
    }

    .menu-toggle:checked ~ .nav-menu {
        left: 0;
    }

    .nav-menu > li {
        width: 100%;
        border-bottom: 1px solid var(--gray-200);
    }

    .nav-menu > li > a {
        width: 100%;
        padding: 1rem 0;
        justify-content: space-between;
        border-radius: 0;
    }

    .nav-menu > li > a::before {
        display: none;
    }

    .nav-menu > li > a:hover,
    .nav-menu > li > a.active {
        background: transparent;
        color: var(--primary-color);
    }

    /* Mobile Dropdown */
    .dropdown-menu {
        position: static;
        opacity: 1;
        visibility: visible;
        transform: none;
        box-shadow: none;
        background: var(--gray-100);
        border-radius: 0;
        margin: 0.5rem 0;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.4s ease;
    }

    .dropdown.active .dropdown-menu {
        max-height: 500px;
    }

    .dropdown-menu li a {
        padding: 0.875rem 1rem;
    }

    /* Mobile Nav Actions */
    .nav-actions {
        position: fixed;
        bottom: 0;
        left: -100%;
        width: 100%;
        background: var(--white);
        padding: 1.5rem;
        box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
        flex-direction: column;
        gap: 0.75rem;
        transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .menu-toggle:checked ~ .nav-actions {
        left: 0;
    }

    .nav-actions .btn {
        width: 100%;
        justify-content: center;
    }

    .search-btn {
        width: 100%;
        height: 45px;
        border-radius: var(--radius-sm);
    }

    /* Search Overlay Mobile */
    .search-content h2 {
        font-size: 1.75rem;
    }

    .search-form {
        flex-direction: column;
    }

    .search-submit {
        width: 100%;
    }

    .close-search {
        top: -50px;
        width: 40px;
        height: 40px;
        font-size: 1.25rem;
    }
}

@media screen and (max-width: 480px) {
    .logo a {
        font-size: 1.25rem;
    }

    .logo i {
        font-size: 1.5rem;
    }

    .hero-section {
        padding: 0 1rem;
    }

    .features-grid {
        grid-template-columns: 1fr;
    }
}

/* =============================================
   UTILITY CLASSES
   ============================================= */

.no-scroll {
    overflow: hidden;
}'''

# Save navbar CSS
with open('navbar.css', 'w', encoding='utf-8') as f:
    f.write(navbar_css)

print("✅ Navbar CSS created!")
