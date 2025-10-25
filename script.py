
# Create complete responsive navbar with modern animations
navbar_html = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FUUAST - Responsive Navigation</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Header & Navigation -->
    <header class="header" id="header">
        <nav class="navbar">
            <div class="container">
                <div class="nav-wrapper">
                    <!-- Logo -->
                    <div class="logo">
                        <a href="index.html">
                            <i class="fas fa-graduation-cap"></i>
                            <span>FUUAST</span>
                        </a>
                    </div>

                    <!-- Mobile Menu Toggle -->
                    <input type="checkbox" id="menu-toggle" class="menu-toggle">
                    <label for="menu-toggle" class="hamburger">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </label>

                    <!-- Navigation Menu -->
                    <ul class="nav-menu">
                        <li><a href="index.html" class="active">Home</a></li>
                        <li class="dropdown">
                            <a href="index.html#about">About <i class="fas fa-chevron-down"></i></a>
                            <ul class="dropdown-menu">
                                <li><a href="index.html#about">About FUUAST</a></li>
                                <li><a href="index.html#vision">Vision & Mission</a></li>
                                <li><a href="index.html#leadership">Leadership</a></li>
                                <li><a href="index.html#history">History</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="undergraduate.html">Programs <i class="fas fa-chevron-down"></i></a>
                            <ul class="dropdown-menu">
                                <li><a href="undergraduate.html">Undergraduate</a></li>
                                <li><a href="graduate.html">Graduate</a></li>
                            </ul>
                        </li>
                        <li><a href="campus.html">Campus</a></li>
                        <li><a href="index.html#news">News & Events</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>

                    <!-- Nav Actions -->
                    <div class="nav-actions">
                        <a href="#search" class="search-btn" aria-label="Search">
                            <i class="fas fa-search"></i>
                        </a>
                        <a href="auth.html" class="btn btn-outline">Login</a>
                        <a href="auth.html" class="btn btn-secondary">Register</a>
                        <a href="application-form.html" class="btn btn-primary">Apply Now</a>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <!-- Search Overlay -->
    <div class="search-overlay" id="searchOverlay">
        <div class="search-container">
            <button class="close-search" id="closeSearch">
                <i class="fas fa-times"></i>
            </button>
            <div class="search-content">
                <h2>Search FUUAST</h2>
                <form class="search-form">
                    <div class="search-input-wrapper">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="Search programs, courses, faculty..." autofocus>
                    </div>
                    <button type="submit" class="search-submit">
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </form>
                <div class="popular-searches">
                    <h3>Popular Searches:</h3>
                    <div class="search-tags">
                        <a href="#">Computer Science</a>
                        <a href="#">MBA</a>
                        <a href="#">Engineering</a>
                        <a href="#">Admissions 2025</a>
                        <a href="#">Scholarships</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Demo Content -->
    <section class="hero-section">
        <h1>Scroll Down to See Navbar Effects</h1>
        <p>The navbar becomes sticky and changes style when you scroll</p>
    </section>

    <section class="content-section">
        <div class="container">
            <h2>Responsive Navigation Features</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <i class="fas fa-mobile-alt"></i>
                    <h3>Fully Responsive</h3>
                    <p>Adapts seamlessly from desktop to mobile devices</p>
                </div>
                <div class="feature-card">
                    <i class="fas fa-magic"></i>
                    <h3>Smooth Animations</h3>
                    <p>Beautiful transitions and micro-interactions</p>
                </div>
                <div class="feature-card">
                    <i class="fas fa-tachometer-alt"></i>
                    <h3>Sticky Header</h3>
                    <p>Navbar stays visible while scrolling</p>
                </div>
                <div class="feature-card">
                    <i class="fas fa-bars"></i>
                    <h3>Animated Hamburger</h3>
                    <p>Smooth hamburger to X transformation</p>
                </div>
            </div>
        </div>
    </section>

    <script src="navbar.js"></script>
</body>
</html>'''

# Save navbar HTML
with open('navbar.html', 'w', encoding='utf-8') as f:
    f.write(navbar_html)

print("✅ Navbar HTML created!")
