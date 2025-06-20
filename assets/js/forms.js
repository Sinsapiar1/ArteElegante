// ===================================
// FORMS MODULE
// forms.js
// ===================================

class FormManager {
    constructor(translationSystem = null) {
        this.translationSystem = translationSystem;
        this.forms = new Map();
        this.validators = new Map();
        this.isSubmitting = false;
    }

    init() {
        this.setupForms();
        this.setupValidation();
        this.setupInteractiveEffects();
        this.addFormStyles();
    }

    setupForms() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach((form, index) => {
            const formId = form.id || `form-${index}`;
            form.id = formId;
            
            this.forms.set(formId, {
                element: form,
                fields: this.getFormFields(form),
                isValid: false,
                submitted: false
            });
            
            this.setupFormSubmission(form);
            this.setupFieldEvents(form);
        });
    }

    getFormFields(form) {
        const fields = {};
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            const name = input.name || input.id || input.type;
            fields[name] = {
                element: input,
                isValid: false,
                value: '',
                errors: []
            };
        });
        
        return fields;
    }

    setupFormSubmission(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (this.isSubmitting) return;
            
            const formData = this.getFormData(form);
            const isValid = this.validateForm(form);
            
            if (isValid) {
                await this.submitForm(form, formData);
            } else {
                this.showValidationErrors(form);
            }
        });
    }

    setupFieldEvents(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('focus', () => {
                this.clearFieldErrors(input);
            });
            
            input.addEventListener('input', () => {
                this.handleInputAnimation(input);
            });
        });
    }

    setupValidation() {
        this.validators.set('email', (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return {
                isValid: emailRegex.test(value),
                message: this.getValidationMessage('email.invalid')
            };
        });
        
        this.validators.set('tel', (value) => {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            return {
                isValid: phoneRegex.test(value.replace(/\s/g, '')),
                message: this.getValidationMessage('phone.invalid')
            };
        });
        
        this.validators.set('required', (value) => {
            return {
                isValid: value.trim().length > 0,
                message: this.getValidationMessage('field.required')
            };
        });
    }

    getValidationMessage(key) {
        const messages = {
            'es': {
                'email.invalid': 'Por favor, introduce un email válido',
                'phone.invalid': 'Por favor, introduce un teléfono válido',
                'field.required': 'Este campo es obligatorio',
            },
            'en': {
                'email.invalid': 'Please enter a valid email',
                'phone.invalid': 'Please enter a valid phone number',
                'field.required': 'This field is required',
            },
            'da': {
                'email.invalid': 'Indtast venligst en gyldig e-mail',
                'phone.invalid': 'Indtast venligst et gyldigt telefonnummer',
                'field.required': 'Dette felt er påkrævet',
            }
        };
        
        const currentLang = this.translationSystem?.getCurrentLanguage() || 'es';
        return messages[currentLang]?.[key] || messages['es'][key];
    }

    validateField(input) {
        const value = input.value;
        const type = input.type;
        let isValid = true;
        let errors = [];

        if (input.required) {
            const result = this.validators.get('required')(value);
            if (!result.isValid) {
                isValid = false;
                errors.push(result.message);
            }
        }

        if (value && this.validators.has(type)) {
            const result = this.validators.get(type)(value);
            if (!result.isValid) {
                isValid = false;
                errors.push(result.message);
            }
        }

        this.showFieldValidation(input, isValid, errors);
        return isValid;
    }

    showFieldValidation(input, isValid, errors) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;

        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        input.classList.remove('error', 'success');
        input.classList.add(isValid ? 'success' : 'error');

        if (!isValid && errors.length > 0) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errors[0];
            formGroup.appendChild(errorDiv);
        }
    }

    getFormData(form) {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        return data;
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    async submitForm(form, formData) {
        this.isSubmitting = true;
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
        
        try {
            await this.simulateSubmission(formData);
            
            const successMessage = this.translationSystem?.getSuccessMessage() || '¡Solicitud Enviada!';
            submitButton.textContent = successMessage;
            submitButton.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
            
            setTimeout(() => {
                form.reset();
                submitButton.textContent = originalText;
                submitButton.style.background = 'var(--gradient-primary)';
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                this.clearAllErrors(form);
            }, 3000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            submitButton.textContent = 'Error - Intentar de nuevo';
            submitButton.style.background = 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)';
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = 'var(--gradient-primary)';
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            }, 3000);
        }
        
        this.isSubmitting = false;
    }

    simulateSubmission(formData) {
        return new Promise((resolve) => {
            console.log('Form submitted with data:', formData);
            setTimeout(resolve, 1000);
        });
    }

    clearFieldErrors(input) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            const errorMessage = formGroup.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
            input.classList.remove('error');
        }
    }

    clearAllErrors(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            this.clearFieldErrors(input);
            input.classList.remove('error', 'success');
        });
    }

    handleInputAnimation(input) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            if (input.value.length > 0) {
                formGroup.classList.add('focused');
            } else {
                formGroup.classList.remove('focused');
            }
        }
    }

    setupInteractiveEffects() {
        const inputs = document.querySelectorAll('.form-input');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.transform = 'scale(1.02)';
                input.style.boxShadow = '0 0 25px rgba(212, 175, 55, 0.4)';
            });
            
            input.addEventListener('blur', () => {
                input.style.transform = 'scale(1)';
                if (!input.classList.contains('error')) {
                    input.style.boxShadow = 'none';
                }
            });
        });
    }

    addFormStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .form-group {
                position: relative;
                margin-bottom: 1.5rem;
            }

            .form-input {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .form-input.error {
                border-color: #dc3545 !important;
                box-shadow: 0 0 20px rgba(220, 53, 69, 0.3) !important;
                animation: shake 0.5s ease-in-out;
            }

            .form-input.success {
                border-color: #28a745 !important;
                box-shadow: 0 0 20px rgba(40, 167, 69, 0.3) !important;
            }

            .error-message {
                color: #dc3545;
                font-size: 0.875rem;
                margin-top: 0.5rem;
                display: flex;
                align-items: center;
                animation: fadeInUp 0.3s ease-out;
            }

            .error-message::before {
                content: '⚠️';
                margin-right: 0.5rem;
            }

            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }

            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .form-group.focused .form-input {
                border-color: var(--primary-gold) !important;
            }
        `;
        
        document.head.appendChild(style);
    }

    showValidationErrors(form) {
        const firstErrorInput = form.querySelector('.form-input.error');
        if (firstErrorInput) {
            firstErrorInput.focus();
        }
    }
}

window.FormManager = FormManager;