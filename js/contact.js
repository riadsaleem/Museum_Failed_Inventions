// Contact form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            const value = field.value.trim();
            
            if (!value) {
                showFieldError(field, 'This field is required.');
                isValid = false;
            } else {
                clearFieldError(field);
                
                // Email validation
                if (fieldId === 'email' && !isValidEmail(value)) {
                    showFieldError(field, 'Please enter a valid email address.');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFieldError(field, message) {
        field.classList.add('is-invalid');
        const feedback = field.parentNode.querySelector('.invalid-feedback');
        if (feedback) {
            feedback.textContent = message;
        }
    }
    
    function clearFieldError(field) {
        field.classList.remove('is-invalid');
    }
    
    // Real-time validation
    const formFields = document.querySelectorAll('.form-control');
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                showFieldError(this, 'This field is required.');
            } else if (this.type === 'email' && this.value.trim() && !isValidEmail(this.value.trim())) {
                showFieldError(this, 'Please enter a valid email address.');
            } else {
                clearFieldError(this);
            }
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                clearFieldError(this);
            }
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                showSuccessMessage();
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });
    
    function showSuccessMessage() {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <strong>Thank you!</strong> Your failed invention submission has been received. 
            We'll review it and get back to you soon!
        `;
        
        // Insert message at the top of the form
        const formContainer = document.querySelector('.contact-form-container');
        formContainer.insertBefore(successMessage, contactForm);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
        
        // Scroll to top of form
        formContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Character counter for message field
    const messageField = document.getElementById('message');
    const maxLength = 1000;
    
    // Create character counter
    const charCounter = document.createElement('div');
    charCounter.className = 'char-counter';
    charCounter.style.cssText = `
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.9rem;
        text-align: right;
        margin-top: 0.5rem;
    `;
    messageField.parentNode.appendChild(charCounter);
    
    function updateCharCounter() {
        const currentLength = messageField.value.length;
        const remaining = maxLength - currentLength;
        
        charCounter.textContent = `${currentLength}/${maxLength} characters`;
        
        if (remaining < 50) {
            charCounter.style.color = '#ff6b6b';
        } else if (remaining < 100) {
            charCounter.style.color = '#ffa726';
        } else {
            charCounter.style.color = 'rgba(255, 255, 255, 0.6)';
        }
    }
    
    messageField.addEventListener('input', updateCharCounter);
    messageField.setAttribute('maxlength', maxLength);
    updateCharCounter();
    
    // Phone number formatting
    const phoneField = document.getElementById('phone');
    phoneField.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
        }
        this.value = value;
    });
    
    // Smooth scrolling for form focus
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            setTimeout(() => {
                this.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 100);
        });
    });
});

// Add custom styles for success message
const style = document.createElement('style');
style.textContent = `
    .success-message {
        background: rgba(76, 175, 80, 0.2);
        border: 1px solid rgba(76, 175, 80, 0.5);
        color: #fff;
        padding: 1rem;
        border-radius: 10px;
        margin-bottom: 2rem;
        backdrop-filter: blur(10px);
    }
    
    .success-message i {
        color: #4caf50;
        margin-right: 0.5rem;
    }
    
    .char-counter {
        transition: color 0.3s ease;
    }
`;
document.head.appendChild(style);

