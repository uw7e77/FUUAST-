// =============================================
// STUDENT PORTAL - JAVASCRIPT
// =============================================

// DOM Elements
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mobileToggle = document.getElementById('mobileToggle');
const notificationBtn = document.getElementById('notificationBtn');
const notificationDropdown = document.getElementById('notificationDropdown');
const userMenuBtn = document.getElementById('userMenuBtn');
const userDropdown = document.getElementById('userDropdown');

// Initialize Portal
document.addEventListener('DOMContentLoaded', function() {
    initializePortal();
    attachEventListeners();
    loadDashboardData();
});

// Initialize Portal
function initializePortal() {
    // Check authentication
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        window.location.href = 'auth.html';
        return;
    }

    // Load user data
    loadUserData();
    
    // Set active nav item
    setActiveNavItem();
    
    // Animate progress bars
    animateProgressBars();
}

// Attach Event Listeners
function attachEventListeners() {
    // Sidebar toggle (mobile)
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }

    // Notification dropdown
    if (notificationBtn) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationDropdown.classList.toggle('active');
            userDropdown.classList.remove('active');
        });
    }

    // User menu dropdown
    if (userMenuBtn) {
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
            notificationDropdown.classList.remove('active');
        });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        notificationDropdown.classList.remove('active');
        userDropdown.classList.remove('active');
    });

    // Sidebar navigation
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            
            // Add active to clicked
            this.parentElement.classList.add('active');
            
            // Load section content
            const section = this.getAttribute('href').substring(1);
            loadSection(section);
            
            // Close mobile sidebar
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Mark notifications as read
    document.querySelectorAll('.notification-item').forEach(item => {
        item.addEventListener('click', function() {
            this.classList.remove('unread');
        });
    });
}

// Load User Data
function loadUserData() {
    // In production, fetch from API
    const userData = {
        name: 'Ahmed Khan',
        email: 'ahmed.khan@fuuast.edu.pk',
        program: 'BS Computer Science',
        studentId: 'FUUAST-2023-1234',
        cgpa: 3.75,
        semester: 'Spring 2025'
    };
    
    // Update UI
    updateUserProfile(userData);
}

// Update User Profile
function updateUserProfile(data) {
    const userNameElements = document.querySelectorAll('.user-info h3, .user-dropdown-header h4');
    userNameElements.forEach(el => el.textContent = data.name);
    
    const emailElements = document.querySelectorAll('.user-dropdown-header p');
    emailElements.forEach(el => el.textContent = data.email);
}

// Set Active Nav Item
function setActiveNavItem() {
    const hash = window.location.hash || '#dashboard';
    const activeLink = document.querySelector(`.sidebar-nav a[href="${hash}"]`);
    if (activeLink) {
        document.querySelectorAll('.sidebar-nav li').forEach(li => li.classList.remove('active'));
        activeLink.parentElement.classList.add('active');
    }
}

// Animate Progress Bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
}

// Load Section
function loadSection(section) {
    console.log('Loading section:', section);
    
    // In production, load actual section content via AJAX
    // For demo, just update URL hash
    window.location.hash = section;
    
    // Example: Load courses section
    if (section === 'courses') {
        loadCoursesSection();
    }
}

// Load Dashboard Data
function loadDashboardData() {
    // In production, fetch from API
    const dashboardData = {
        enrolledCourses: 5,
        completedTasks: 12,
        pendingTasks: 3,
        attendance: 92,
        upcomingClasses: [],
        assignments: [],
        grades: []
    };
    
    // Update stats
    updateDashboardStats(dashboardData);
}

// Update Dashboard Stats
function updateDashboardStats(data) {
    // Animate numbers counting up
    const statNumbers = document.querySelectorAll('.stat-info h3');
    statNumbers.forEach((element, index) => {
        const target = parseInt(element.textContent);
        animateValue(element, 0, target, 1000);
    });
}

// Animate Value Counter
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end + (element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
}

// Load Courses Section (Example)
function loadCoursesSection() {
    // Fetch and display courses
    console.log('Loading courses...');
}

// Refresh Dashboard
function refreshDashboard() {
    loadDashboardData();
    showNotification('Dashboard refreshed successfully', 'success');
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `toast-notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Handle Logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        window.location.href = 'auth.html';
    }
}

// Add logout functionality to all logout buttons
document.querySelectorAll('.logout-btn, .logout').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        handleLogout();
    });
});

console.log('✅ Student Portal initialized successfully!');
