// Sign in form functionality
document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signinForm');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    const submitBtn = document.querySelector('.auth-btn');
    
    // Demo credentials
    const demoCredentials = {
        email: 'demo@failedmuseum.com',
        password: 'FailedInvention123'
    };
    
    // Additional valid credentials for testing
    const validCredentials = [
        { email: 'demo@failedmuseum.com', password: 'FailedInvention123' },
        { email: 'admin@museum.com', password: 'Admin123' },
        { email: 'curator@failedmuseum.org', password: 'Curator456' },
        { email: 'visitor@museum.com', password: 'Visitor789' }
    ];
    
    // Form validation
    function validateForm() {
        let isValid = true;
        
        // Email validation
        const email = emailField.value.trim();
        if (!email) {
            showFieldError(emailField, 'Email is required.');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showFieldError(emailField, 'Please enter a valid email address.');
            isValid = false;
        } else {
            clearFieldError(emailField);
        }
        
        // Password validation
        const password = passwordField.value.trim();
        if (!password) {
            showFieldError(passwordField, 'Password is required.');
            isValid = false;
        } else if (password.length < 6) {
            showFieldError(passwordField, 'Password must be at least 6 characters long.');
            isValid = false;
        } else {
            clearFieldError(passwordField);
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFieldError(field, message) {
        field.classList.add('is-invalid');
        const feedback = field.parentNode.querySelector('.invalid-feedback') || 
                        field.parentNode.parentNode.querySelector('.invalid-feedback');
        if (feedback) {
            feedback.textContent = message;
        }
    }
    
    function clearFieldError(field) {
        field.classList.remove('is-invalid');
    }
    
    // Real-time validation
    emailField.addEventListener('blur', function() {
        const email = this.value.trim();
        if (!email) {
            showFieldError(this, 'Email is required.');
        } else if (!isValidEmail(email)) {
            showFieldError(this, 'Please enter a valid email address.');
        } else {
            clearFieldError(this);
        }
    });
    
    passwordField.addEventListener('blur', function() {
        const password = this.value.trim();
        if (!password) {
            showFieldError(this, 'Password is required.');
        } else if (password.length < 6) {
            showFieldError(this, 'Password must be at least 6 characters long.');
        } else {
            clearFieldError(this);
        }
    });
    
    // Clear errors on input
    [emailField, passwordField].forEach(field => {
        field.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                clearFieldError(this);
            }
        });
    });
    
    // Form submission
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const email = emailField.value.trim();
            const password = passwordField.value.trim();
            
            // Show loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
            submitBtn.disabled = true;
            
            // Simulate authentication
            setTimeout(() => {
                const isValidCredential = validCredentials.some(cred => 
                    cred.email === email && cred.password === password
                );
                
                if (isValidCredential) {
                    // Success - show modal
                    showSuccessModal();
                } else {
                    // Invalid credentials
                    showAuthError('Invalid email or password. Please try again or use the demo credentials.');
                }
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });
    
    function showAuthError(message) {
        // Remove existing error
        const existingError = document.querySelector('.auth-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'auth-error';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            ${message}
        `;
        
        // Insert before form
        signinForm.parentNode.insertBefore(errorDiv, signinForm);
        
        // Remove after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
    
    function showSuccessModal() {
        const modal = new bootstrap.Modal(document.getElementById('successModal'));
        modal.show();
        
        // Store login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', emailField.value.trim());
        localStorage.setItem('loginTime', new Date().toISOString());
    }
});

// Password toggle functionality
function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleIcon = document.getElementById('passwordToggleIcon');
    
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

// Fill demo credentials
function fillDemoCredentials() {
    document.getElementById('email').value = 'demo@failedmuseum.com';
    document.getElementById('password').value = 'FailedInvention123';
    
    // Clear any existing errors
    document.querySelectorAll('.form-control').forEach(field => {
        field.classList.remove('is-invalid');
    });
    
    // Show feedback
    const demoInfo = document.querySelector('.demo-info');
    const originalContent = demoInfo.innerHTML;
    
    demoInfo.innerHTML = `
        <div style="text-align: center; color: #4caf50;">
            <i class="fas fa-check-circle"></i>
            <strong>Demo credentials filled!</strong>
            <p style="margin: 0.5rem 0 0; font-size: 0.9rem;">Now click "Sign In" to test the login.</p>
        </div>
    `;
    
    setTimeout(() => {
        demoInfo.innerHTML = originalContent;
    }, 3000);
}

// Social authentication (demo functions)
function signInWithGoogle() {
    showSocialAuthDemo('Google');
}

function signInWithFacebook() {
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
                    <h4>${provider} Authentication</h4>
                    <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 2rem;">
                        This is a demo website. ${provider} authentication is not actually implemented.
                        Please use the demo credentials to test the login functionality.
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

// Forgot password functionality
function showForgotPassword() {
    const modal = new bootstrap.Modal(document.getElementById('forgotPasswordModal'));
    modal.show();
}

// Forgot password form
document.addEventListener('DOMContentLoaded', function() {
    const forgotForm = document.getElementById('forgotPasswordForm');
    if (forgotForm) {
        forgotForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('resetEmail').value.trim();
            if (!email) {
                return;
            }
            
            // Show success message
            const modalBody = this.parentNode;
            modalBody.innerHTML = `
                <div class="text-center">
                    <div style="font-size: 3rem; color: #4caf50; margin-bottom: 1rem;">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h4>Reset Link Sent!</h4>
                    <p style="color: rgba(255, 255, 255, 0.8);">
                        We've sent a password reset link to <strong>${email}</strong>.
                        Please check your email and follow the instructions.
                    </p>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                        Close
                    </button>
                </div>
            `;
        });
    }
});

// Redirect to home after successful login
function redirectToHome() {
    window.location.href = 'index.html';
}

// Add custom styles for auth error
const style = document.createElement('style');
style.textContent = `
    .auth-error {
        background: rgba(244, 67, 54, 0.2);
        border: 1px solid rgba(244, 67, 54, 0.5);
        color: #fff;
        padding: 1rem;
        border-radius: 10px;
        margin-bottom: 2rem;
        backdrop-filter: blur(10px);
        animation: slideInDown 0.3s ease;
    }
    
    .auth-error i {
        color: #f44336;
        margin-right: 0.5rem;
    }
    
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

