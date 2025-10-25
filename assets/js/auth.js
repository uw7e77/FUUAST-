// =============================================
// AUTHENTICATION FORM - JAVASCRIPT
// =============================================

// DOM Elements
const authContainer = document.getElementById('authContainer');
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const successModal = document.getElementById('successModal');
const loadingOverlay = document.getElementById('loadingOverlay');
const modalMessage = document.getElementById('modalMessage');

// Switch Form Links
const switchFormLinks = document.querySelectorAll('.switch-form');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
    attachEventListeners();
});

// Initialize Authentication
function initializeAuth() {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    if (token) {
        // Redirect to dashboard or home
        // window.location.href = 'dashboard.html';
    }
}

// Attach Event Listeners
function attachEventListeners() {
    // Panel switch buttons
    if (signUpButton) {
        signUpButton.addEventListener('click', () => {
            authContainer.classList.add('right-panel-active');
        });
    }

    if (signInButton) {
        signInButton.addEventListener('click', () => {
            authContainer.classList.remove('right-panel-active');
        });
    }

    // Form switch links
    switchFormLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            if (target === 'register') {
                authContainer.classList.add('right-panel-active');
            } else {
                authContainer.classList.remove('right-panel-active');
            }
        });
    });

    // Password toggle buttons
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            togglePasswordVisibility(this);
        });
    });

    // Phone number formatting
    const phoneInput = document.getElementById('registerPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhoneNumber);
    }

    // Password strength checker
    const registerPassword = document.getElementById('registerPassword');
    if (registerPassword) {
        registerPassword.addEventListener('input', checkPasswordStrength);
    }

    // Form validations on blur
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        // Remove error on focus
        input.addEventListener('focus', function() {
            this.classList.remove('error');
            const errorMsg = this.closest('.form-group').querySelector('.error-message');
            if (errorMsg) {
                errorMsg.style.display = 'none';
            }
        });
    });

    // Form submissions
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Social login buttons
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const provider = this.classList.contains('google-btn') ? 'Google' : 'Facebook';
            handleSocialLogin(provider);
        });
    });
}

// Toggle Password Visibility
function togglePasswordVisibility(button) {
    const targetId = button.getAttribute('data-target');
    const input = document.getElementById(targetId);
    const icon = button.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Format Phone Number
function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) {
        value = value.slice(0, 4) + '-' + value.slice(4);
    }
    e.target.value = value.slice(0, 12);
}

// Check Password Strength
function checkPasswordStrength(e) {
    const password = e.target.value;
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');

    let strength = 0;

    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;

    // Character variety checks
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    // Update UI based on strength
    strengthFill.classList.remove('weak', 'medium', 'strong');
    strengthText.classList.remove('weak', 'medium', 'strong');

    if (strength <= 2) {
        strengthFill.classList.add('weak');
        strengthText.classList.add('weak');
        strengthText.textContent = 'Weak password';
    } else if (strength <= 4) {
        strengthFill.classList.add('medium');
        strengthText.classList.add('medium');
        strengthText.textContent = 'Medium password';
    } else {
        strengthFill.classList.add('strong');
        strengthText.classList.add('strong');
        strengthText.textContent = 'Strong password';
    }
}

// Validate Field
function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const id = field.id;
    let isValid = true;
    let errorMessage = '';

    // Required field check
    if (field.hasAttribute('required') && value === '') {
        isValid = false;
        errorMessage = 'This field is required';
    }

    // Email validation
    if (type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }

    // Phone validation
    if (id === 'registerPhone' && value !== '') {
        const phoneRegex = /^\d{4}-\d{7}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter valid phone number (03XX-XXXXXXX)';
        }
    }

    // Password validation
    if (type === 'password' && value !== '' && id !== 'confirmPassword') {
        if (value.length < 8) {
            isValid = false;
            errorMessage = 'Password must be at least 8 characters';
        }
    }

    // Confirm password validation
    if (id === 'confirmPassword' && value !== '') {
        const password = document.getElementById('registerPassword').value;
        if (value !== password) {
            isValid = false;
            errorMessage = 'Passwords do not match';
        }
    }

    // Checkbox validation
    if (field.type === 'checkbox' && field.hasAttribute('required')) {
        if (!field.checked) {
            isValid = false;
            errorMessage = 'You must agree to continue';
        }
    }

    // Update UI
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');

    if (!isValid) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
        }
    } else {
        field.classList.remove('error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    return isValid;
}

// Validate Form
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

// Handle Login
async function handleLogin(e) {
    e.preventDefault();

    if (!validateForm(loginForm)) {
        return;
    }

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Show loading
    showLoading();

    try {
        // Simulate API call
        await simulateAPICall();

        // In production, replace with actual API call:
        // const response = await fetch('/api/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ email, password, rememberMe })
        // });
        // const data = await response.json();

        // Simulate successful login
        const token = 'fake-jwt-token-' + Date.now();
        localStorage.setItem('authToken', token);
        localStorage.setItem('userEmail', email);

        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        }

        hideLoading();
        showSuccessModal('Login successful! Redirecting to your dashboard...');

        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = 'index.html'; // Change to dashboard.html
        }, 2000);

    } catch (error) {
        hideLoading();
        showErrorModal('Login failed. Please check your credentials and try again.');
        console.error('Login error:', error);
    }
}

// Handle Register
async function handleRegister(e) {
    e.preventDefault();

    if (!validateForm(registerForm)) {
        return;
    }

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    // Additional validation
    if (password !== confirmPassword) {
        showErrorModal('Passwords do not match!');
        return;
    }

    if (!agreeTerms) {
        showErrorModal('You must agree to the terms and conditions!');
        return;
    }

    // Show loading
    showLoading();

    try {
        // Simulate API call
        await simulateAPICall();

        // In production, replace with actual API call:
        // const response = await fetch('/api/register', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         firstName,
        //         lastName,
        //         email,
        //         phone,
        //         password
        //     })
        // });
        // const data = await response.json();

        hideLoading();
        showSuccessModal('Registration successful! Please check your email to verify your account.');

        // Reset form and switch to login
        registerForm.reset();
        setTimeout(() => {
            closeModal();
            authContainer.classList.remove('right-panel-active');
        }, 2000);

    } catch (error) {
        hideLoading();
        showErrorModal('Registration failed. Please try again later.');
        console.error('Registration error:', error);
    }
}

// Handle Social Login
async function handleSocialLogin(provider) {
    showLoading();

    try {
        // Simulate API call
        await simulateAPICall();

        // In production, redirect to OAuth provider:
        // window.location.href = `/api/auth/${provider.toLowerCase()}`;

        hideLoading();
        showSuccessModal(`${provider} login successful! Redirecting...`);

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);

    } catch (error) {
        hideLoading();
        showErrorModal(`${provider} login failed. Please try again.`);
        console.error('Social login error:', error);
    }
}

// Show Loading
function showLoading() {
    loadingOverlay.classList.add('show');
}

// Hide Loading
function hideLoading() {
    loadingOverlay.classList.remove('show');
}

// Show Success Modal
function showSuccessModal(message) {
    modalMessage.textContent = message;
    successModal.classList.add('show');
}

// Show Error Modal
function showErrorModal(message) {
    const modal = successModal.cloneNode(true);
    modal.id = 'errorModal';
    modal.querySelector('.modal-icon').classList.remove('success');
    modal.querySelector('.modal-icon').classList.add('error');
    modal.querySelector('.modal-icon i').className = 'fas fa-exclamation-circle';
    modal.querySelector('h3').textContent = 'Error!';
    modal.querySelector('p').textContent = message;
    modal.querySelector('.modal-icon').style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
    document.body.appendChild(modal);
    modal.classList.add('show');

    setTimeout(() => {
        modal.remove();
    }, 3000);
}

// Close Modal
function closeModal() {
    successModal.classList.remove('show');
}

// Simulate API Call (for demonstration)
function simulateAPICall() {
    return new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });
}

// Auto-fill form for testing (development only)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Development mode - Auto-fill available');

    // Add keyboard shortcut for testing: Ctrl+Shift+T
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'T') {
            if (authContainer.classList.contains('right-panel-active')) {
                // Fill register form
                document.getElementById('firstName').value = 'John';
                document.getElementById('lastName').value = 'Doe';
                document.getElementById('registerEmail').value = 'john.doe@example.com';
                document.getElementById('registerPhone').value = '0300-1234567';
                document.getElementById('registerPassword').value = 'Test@123456';
                document.getElementById('confirmPassword').value = 'Test@123456';
                document.getElementById('agreeTerms').checked = true;
            } else {
                // Fill login form
                document.getElementById('loginEmail').value = 'admin@fuuast.edu.pk';
                document.getElementById('loginPassword').value = 'admin123';
            }
        }
    });
}

// Prevent form submission on Enter key in password fields
document.querySelectorAll('input[type="password"]').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const form = this.closest('form');
            const submitBtn = form.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.click();
            }
        }
    });
});

// Auto-logout after inactivity (30 minutes)
let inactivityTimer;
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userEmail');
            showErrorModal('You have been logged out due to inactivity.');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    }, 30 * 60 * 1000); // 30 minutes
}

// Reset timer on user activity
['mousedown', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetInactivityTimer, true);
});

// Initialize inactivity timer
resetInactivityTimer();

// Check for authentication errors in URL
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    if (error) {
        showErrorModal(decodeURIComponent(error));
    }
});