// =============================================
// UNIVERSITY APPLICATION FORM - JAVASCRIPT
// =============================================

// Global Variables
let currentStep = 1;
const totalSteps = 5;
const form = document.getElementById('applicationForm');
const progressFill = document.getElementById('progressFill');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');

// Initialize form
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    updateProgress();
    attachEventListeners();
});

// Initialize Form
function initializeForm() {
    // Set default date restrictions
    const dobInput = document.getElementById('dob');
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
    const minDate = new Date(today.getFullYear() - 30, today.getMonth(), today.getDate());

    dobInput.max = maxDate.toISOString().split('T')[0];
    dobInput.min = minDate.toISOString().split('T')[0];
}

// Attach Event Listeners
function attachEventListeners() {
    // Navigation buttons
    nextBtn.addEventListener('click', nextStep);
    prevBtn.addEventListener('click', prevStep);
    submitBtn.addEventListener('click', submitForm);

    // CNIC formatting
    document.getElementById('cnic').addEventListener('input', formatCNIC);

    // Phone formatting
    document.getElementById('phone').addEventListener('input', formatPhone);

    // Same address checkbox
    document.getElementById('sameAddress').addEventListener('change', toggleMailingAddress);

    // Auto-calculate percentages
    document.getElementById('matricTotal').addEventListener('input', calculateMatricPercentage);
    document.getElementById('matricObtained').addEventListener('input', calculateMatricPercentage);
    document.getElementById('interTotal').addEventListener('input', calculateInterPercentage);
    document.getElementById('interObtained').addEventListener('input', calculateInterPercentage);

    // File upload handlers
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', handleFileUpload);
    });

    // Form input validation on blur
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

// Format CNIC
function formatCNIC(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 5) {
        value = value.slice(0, 5) + '-' + value.slice(5);
    }
    if (value.length > 13) {
        value = value.slice(0, 13) + '-' + value.slice(13, 14);
    }
    e.target.value = value.slice(0, 15);
}

// Format Phone
function formatPhone(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) {
        value = value.slice(0, 4) + '-' + value.slice(4);
    }
    e.target.value = value.slice(0, 12);
}

// Toggle Mailing Address
function toggleMailingAddress() {
    const mailingGroup = document.getElementById('mailingAddressGroup');
    const mailingAddress = document.getElementById('mailingAddress');
    const permanentAddress = document.getElementById('permanentAddress').value;

    if (this.checked) {
        mailingGroup.style.display = 'none';
        mailingAddress.value = permanentAddress;
    } else {
        mailingGroup.style.display = 'block';
        mailingAddress.value = '';
    }
}

// Calculate Matric Percentage
function calculateMatricPercentage() {
    const total = parseFloat(document.getElementById('matricTotal').value) || 0;
    const obtained = parseFloat(document.getElementById('matricObtained').value) || 0;

    if (total > 0 && obtained <= total) {
        const percentage = ((obtained / total) * 100).toFixed(2);
        document.getElementById('matricPercentage').value = percentage + '%';
    } else {
        document.getElementById('matricPercentage').value = '';
    }
}

// Calculate Inter Percentage
function calculateInterPercentage() {
    const total = parseFloat(document.getElementById('interTotal').value) || 0;
    const obtained = parseFloat(document.getElementById('interObtained').value) || 0;

    if (total > 0 && obtained <= total) {
        const percentage = ((obtained / total) * 100).toFixed(2);
        document.getElementById('interPercentage').value = percentage + '%';
    } else {
        document.getElementById('interPercentage').value = '';
    }
}

// Handle File Upload
function handleFileUpload(e) {
    const file = e.target.files[0];
    const fileNameSpan = e.target.parentElement.querySelector('.file-name');
    const uploadCard = e.target.closest('.upload-card');

    if (file) {
        // Check file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('File size should not exceed 2MB');
            e.target.value = '';
            return;
        }

        // Update file name display
        fileNameSpan.textContent = file.name;
        fileNameSpan.style.color = 'var(--success-color)';

        // Add success styling to upload card
        uploadCard.style.borderColor = 'var(--success-color)';
        uploadCard.style.background = 'rgba(40, 167, 69, 0.05)';

        // Remove error if exists
        e.target.classList.remove('error');
    } else {
        fileNameSpan.textContent = 'No file chosen';
        fileNameSpan.style.color = 'var(--gray-600)';
        uploadCard.style.borderColor = 'var(--gray-300)';
        uploadCard.style.background = 'var(--gray-50)';
    }
}

// Validate Field
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    // Check if required
    if (field.hasAttribute('required') && value === '') {
        isValid = false;
    }

    // Email validation
    if (field.type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    }

    // CNIC validation
    if (field.id === 'cnic' && value !== '') {
        const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
        isValid = cnicRegex.test(value);
    }

    // Phone validation
    if (field.id === 'phone' && value !== '') {
        const phoneRegex = /^\d{4}-\d{7}$/;
        isValid = phoneRegex.test(value);
    }

    // Add or remove error class
    if (!isValid) {
        field.classList.add('error');
    } else {
        field.classList.remove('error');
    }

    return isValid;
}

// Validate Step
function validateStep(step) {
    const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
    const inputs = currentStepElement.querySelectorAll('input, select, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required')) {
            // Check radio buttons
            if (input.type === 'radio') {
                const name = input.name;
                const checked = currentStepElement.querySelector(`input[name="${name}"]:checked`);
                if (!checked) {
                    const radioGroup = input.closest('.radio-group');
                    if (radioGroup) {
                        const errorMsg = radioGroup.nextElementSibling;
                        if (errorMsg && errorMsg.classList.contains('error-message')) {
                            errorMsg.style.display = 'block';
                        }
                    }
                    isValid = false;
                }
            }
            // Check checkboxes
            else if (input.type === 'checkbox' && input.id === 'declaration') {
                if (!input.checked) {
                    const errorMsg = input.closest('.declaration-box').querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.style.display = 'block';
                    }
                    isValid = false;
                }
            }
            // Check file inputs
            else if (input.type === 'file') {
                if (!input.files || input.files.length === 0) {
                    input.classList.add('error');
                    const uploadCard = input.closest('.upload-card');
                    const errorMsg = uploadCard.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.style.display = 'block';
                    }
                    isValid = false;
                }
            }
            // Check other inputs
            else {
                if (!validateField(input)) {
                    isValid = false;
                }
            }
        }
    });

    return isValid;
}

// Next Step
function nextStep() {
    if (!validateStep(currentStep)) {
        // Scroll to first error
        const firstError = document.querySelector('.form-step.active .error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    if (currentStep < totalSteps) {
        // Mark current step as completed
        const currentStepIcon = document.querySelector(`.step[data-step="${currentStep}"]`);
        currentStepIcon.classList.remove('active');
        currentStepIcon.classList.add('completed');

        // Move to next step
        currentStep++;
        showStep(currentStep);
        updateProgress();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Previous Step
function prevStep() {
    if (currentStep > 1) {
        // Mark current step as not active
        const currentStepIcon = document.querySelector(`.step[data-step="${currentStep}"]`);
        currentStepIcon.classList.remove('active');

        // Move to previous step
        currentStep--;

        // Mark previous step as active again
        const prevStepIcon = document.querySelector(`.step[data-step="${currentStep}"]`);
        prevStepIcon.classList.remove('completed');
        prevStepIcon.classList.add('active');

        showStep(currentStep);
        updateProgress();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Show Step
function showStep(step) {
    // Hide all steps
    const steps = document.querySelectorAll('.form-step');
    steps.forEach(s => s.classList.remove('active'));

    // Show current step
    const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
    currentStepElement.classList.add('active');

    // Update navigation buttons
    if (step === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'inline-flex';
    }

    if (step === totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
        // Populate review section
        populateReview();
    } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
    }
}

// Update Progress
function updateProgress() {
    const progress = (currentStep / totalSteps) * 100;
    progressFill.style.width = progress + '%';

    // Update step indicators
    const stepIndicators = document.querySelectorAll('.step');
    stepIndicators.forEach((step, index) => {
        const stepNumber = index + 1;
        if (stepNumber === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else if (stepNumber < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

// Populate Review Section
function populateReview() {
    // Personal Information
    document.getElementById('review-fullName').textContent = document.getElementById('fullName').value || '-';
    document.getElementById('review-fatherName').textContent = document.getElementById('fatherName').value || '-';
    document.getElementById('review-cnic').textContent = document.getElementById('cnic').value || '-';
    document.getElementById('review-email').textContent = document.getElementById('email').value || '-';

    // Academic Information
    document.getElementById('review-matricBoard').textContent = document.getElementById('matricBoard').value || '-';
    document.getElementById('review-matricPercentage').textContent = document.getElementById('matricPercentage').value || '-';
    document.getElementById('review-interBoard').textContent = document.getElementById('interBoard').value || '-';
    document.getElementById('review-interPercentage').textContent = document.getElementById('interPercentage').value || '-';

    // Program Selection
    const campusSelect = document.getElementById('campus');
    document.getElementById('review-campus').textContent = campusSelect.options[campusSelect.selectedIndex]?.text || '-';

    const facultySelect = document.getElementById('faculty');
    document.getElementById('review-faculty').textContent = facultySelect.options[facultySelect.selectedIndex]?.text || '-';

    const program1Select = document.getElementById('program1');
    document.getElementById('review-program1').textContent = program1Select.options[program1Select.selectedIndex]?.text || '-';

    const admissionType = document.querySelector('input[name="admissionType"]:checked');
    document.getElementById('review-admissionType').textContent = admissionType ? admissionType.nextElementSibling.nextElementSibling.textContent : '-';
}

// Submit Form
function submitForm(e) {
    e.preventDefault();

    if (!validateStep(currentStep)) {
        alert('Please complete all required fields and accept the declaration.');
        return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

    // Collect form data
    const formData = new FormData(form);

    // Simulate API call
    setTimeout(() => {
        // Generate reference number
        const refNumber = 'FUUAST-2025-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        document.getElementById('referenceNumber').textContent = refNumber;

        // Hide form and show success message
        form.style.display = 'none';
        document.querySelector('.progress-container').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Log form data (in production, send to server)
        console.log('Form submitted successfully!');
        console.log('Reference Number:', refNumber);

        // You can send data to server here
        // fetch('/api/submit-application', {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Success:', data);
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        // });

    }, 2000);
}

// Smooth scroll for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Prevent form submission on Enter key (except in textarea)
form.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        return false;
    }
});

// Auto-save to localStorage (optional)
function autoSave() {
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    localStorage.setItem('fuuast_application_draft', JSON.stringify(data));
}

// Load draft on page load (optional)
function loadDraft() {
    const draft = localStorage.getItem('fuuast_application_draft');
    if (draft && confirm('Would you like to continue from your saved draft?')) {
        const data = JSON.parse(draft);
        Object.keys(data).forEach(key => {
            const field = form.querySelector(`[name="${key}"]`);
            if (field) {
                if (field.type === 'radio' || field.type === 'checkbox') {
                    if (field.value === data[key]) {
                        field.checked = true;
                    }
                } else {
                    field.value = data[key];
                }
            }
        });
    }
}

// Clear localStorage on successful submission
function clearDraft() {
    localStorage.removeItem('fuuast_application_draft');
}

// Call loadDraft on page load if needed
// loadDraft();

// Auto-save every 30 seconds (optional)
// setInterval(autoSave, 30000);