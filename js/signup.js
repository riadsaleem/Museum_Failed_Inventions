// Sign up form functionality
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirmPassword');
    const submitBtn = document.querySelector('.auth-btn');
    
    // Form validation
    function validateForm() {
        let isValid = true;
        const formData = new FormData(signupForm);
        
        // First name validation
        const firstName = formData.get('firstName').trim();
        if (!firstName) {
            showFieldError(document.getElementById('firstName'), 'First name is required.');
            isValid = false;
        } else if (firstName.length < 2) {
            showFieldError(document.getElementById('firstName'), 'First name must be at least 2 characters.');
            isValid = false;
        } else {
            clearFieldError(document.getElementById('firstName'));
        }
        
        // Last name validation
        const lastName = formData.get('lastName').trim();
        if (!lastName) {
            showFieldError(document.getElementById('lastName'), 'Last name is required.');
            isValid = false;
        } else if (lastName.length < 2) {
            showFieldError(document.getElementById('lastName'), 'Last name must be at least 2 characters.');
            isValid = false;
        } else {
            clearFieldError(document.getElementById('lastName'));
        }
        
        // Email validation
        const email = formData.get('email').trim();
        if (!email) {
            showFieldError(document.getElementById('email'), 'Email is required.');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showFieldError(document.getElementById('email'), 'Please enter a valid email address.');
            isValid = false;
        } else {
            clearFieldError(document.getElementById('email'));
        }
        
        // Password validation
        const password = formData.get('password');
        if (!password) {
            showFieldError(passwordField, 'Password is required.');
            isValid = false;
        } else if (!isStrongPassword(password)) {
            showFieldError(passwordField, 'Password must be at least 8 characters with uppercase, lowercase, number, and special character.');
            isValid = false;
        } else {
            clearFieldError(passwordField);
        }
        
        // Confirm password validation
        const confirmPassword = formData.get('confirmPassword');
        if (!confirmPassword) {
            showFieldError(confirmPasswordField, 'Please confirm your password.');
            isValid = false;
        } else if (password !== confirmPassword) {
            showFieldError(confirmPasswordField, 'Passwords do not match.');
            isValid = false;
        } else {
            clearFieldError(confirmPasswordField);
        }
        
        // Interests validation
        const interests = formData.get('interests');
        if (!interests) {
            showFieldError(document.getElementById('interests'), 'Please select your area of interest.');
            isValid = false;
        } else {
            clearFieldError(document.getElementById('interests'));
        }
        
        // Terms agreement validation
        const agreeTerms = formData.get('agreeTerms');
        if (!agreeTerms) {
            showFieldError(document.getElementById('agreeTerms'), 'You must agree to the terms and conditions.');
            isValid = false;
        } else {
            clearFieldError(document.getElementById('agreeTerms'));
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isStrongPassword(password) {
        // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongRegex.test(password);
    }
    
    function showFieldError(field, message) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        const feedback = field.parentNode.querySelector('.invalid-feedback') || 
                        field.parentNode.parentNode.querySelector('.invalid-feedback');
        if (feedback) {
            feedback.textContent = message;
        }
    }
    
    function clearFieldError(field) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
    }
    
    // Password strength checker
    function checkPasswordStrength(password) {
        const strengthBar = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');
        const strengthContainer = document.querySelector('.password-strength');
        
        if (!password) {
            strengthContainer.className = 'password-strength';
            strengthText.textContent = 'Password strength';
            return;
        }
        
        let score = 0;
        const checks = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            numbers: /\d/.test(password),
            symbols: /[@$!%*?&]/.test(password)
        };
        
        score = Object.values(checks).filter(Boolean).length;
        
        if (score < 2) {
            strengthContainer.className = 'password-strength strength-weak';
            strengthText.textContent = 'Weak password';
        } else if (score < 3) {
            strengthContainer.className = 'password-strength strength-fair';
            strengthText.textContent = 'Fair password';
        } else if (score < 5) {
            strengthContainer.className = 'password-strength strength-good';
            strengthText.textContent = 'Good password';
        } else {
            strengthContainer.className = 'password-strength strength-strong';
            strengthText.textContent = 'Strong password';
        }
    }
    
    // Real-time validation
    const formFields = document.querySelectorAll('.form-control');
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateSingleField(this);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateSingleField(this);
            }
            
            // Password strength check
            if (this.id === 'password') {
                checkPasswordStrength(this.value);
            }
            
            // Confirm password check
            if (this.id === 'confirmPassword') {
                const password = passwordField.value;
                const confirmPassword = this.value;
                if (confirmPassword && password !== confirmPassword) {
                    showFieldError(this, 'Passwords do not match.');
                } else if (confirmPassword && password === confirmPassword) {
                    clearFieldError(this);
                }
            }
        });
    });
    
    function validateSingleField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        switch (fieldName) {
            case 'firstName':
            case 'lastName':
                if (!value) {
                    showFieldError(field, `${fieldName === 'firstName' ? 'First' : 'Last'} name is required.`);
                } else if (value.length < 2) {
                    showFieldError(field, `${fieldName === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters.`);
                } else {
                    clearFieldError(field);
                }
                break;
            case 'email':
                if (!value) {
                    showFieldError(field, 'Email is required.');
                } else if (!isValidEmail(value)) {
                    showFieldError(field, 'Please enter a valid email address.');
                } else {
                    clearFieldError(field);
                }
                break;
            case 'password':
                if (!value) {
                    showFieldError(field, 'Password is required.');
                } else if (!isStrongPassword(value)) {
                    showFieldError(field, 'Password must be at least 8 characters with uppercase, lowercase, number, and special character.');
                } else {
                    clearFieldError(field);
                }
                break;
            case 'interests':
                if (!value) {
                    showFieldError(field, 'Please select your area of interest.');
                } else {
                    clearFieldError(field);
                }
                break;
        }
    }
    
    // Checkbox validation
    const agreeTermsCheckbox = document.getElementById('agreeTerms');
    agreeTermsCheckbox.addEventListener('change', function() {
        if (this.checked) {
            clearFieldError(this);
        } else {
            showFieldError(this, 'You must agree to the terms and conditions.');
        }
    });
    
    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
            submitBtn.disabled = true;
            
            // Simulate account creation
            setTimeout(() => {
                // Success - show modal
                showSuccessModal();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });
    
    function showSuccessModal() {
        const modal = new bootstrap.Modal(document.getElementById('successModal'));
        modal.show();
        
        // Store registration data (for demo purposes)
        const formData = new FormData(signupForm);
        localStorage.setItem('registeredUser', JSON.stringify({
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            interests: formData.get('interests'),
            newsletter: formData.get('newsletter') ? true : false,
            registrationDate: new Date().toISOString()
        }));
    }
});

// Password toggle functionality
function togglePassword(fieldId) {
    const passwordField = document.getElementById(fieldId);
    const toggleIcon = document.getElementById(fieldId + 'ToggleIcon');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Social authentication (demo functions)
function signUpWithGoogle() {
    showSocialAuthDemo('Google');
}

function signUpWithFacebook() {
    showSocialAuthDemo('Facebook');
}

function showSocialAuthDemo(provider) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 20px; color: #fff;">
                <div class="modal-body text-center" style="padding: 2rem;">
                    <div style="font-size: 3rem; color: #4ecdc4; margin-bottom: 1rem;">
                        <i class="fab fa-${provider.toLowerCase()}"></i>
                    </div>
                    <h4>${provider} Sign Up</h4>
                    <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 2rem;">
                        This is a demo website. ${provider} authentication is not actually implemented.
                        Please use the regular sign-up form to create an account.
                    </p>
                    <button type="button" class="btn btn-primary" onclick="this.closest('.modal').remove()">
                        Got it
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
}

// Terms and Privacy modals
function showTerms() {
    const modal = new bootstrap.Modal(document.getElementById('termsModal'));
    modal.show();
}

function showPrivacy() {
    const modal = new bootstrap.Modal(document.getElementById('privacyModal'));
    modal.show();
}

// Redirect to sign in after successful registration
function redirectToSignIn() {
    window.location.href = 'signin.html';
}

// Add custom styles for validation states
const style = document.createElement('style');
style.textContent = `
    .form-control.is-valid {
        border-color: #4caf50;
        box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
    }
    
    .form-control.is-invalid {
        border-color: #ff6b6b;
        box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2);
    }
    
    .form-check-input.is-invalid {
        border-color: #ff6b6b;
    }
    
    .form-check-input.is-valid {
        border-color: #4caf50;
    }
`;
document.head.appendChild(style);

