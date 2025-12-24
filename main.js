const form =document.getElementById("form");
const emailInput = document.getElementById("email");
const countryInput = document.getElementById("country");
const postalCodeInput = document.getElementById("postal-code");
const passwordInput = document.getElementById("password");
const passwordConfirmInput = document.getElementById("password-confirm");

// Display errors
function showErrors(input, message) {
    const errorSpan = input.nextElementSibling;
    errorSpan.textContent = message;
    input.setCustomValidity(message);
}

// clear messages
function clearErrors(input) {
    const errorSpan = input.nextElementSibling;
    errorSpan.textContent = '';
    input.setCustomValidity('');
}

//Email Validation pattern
function validateEmail(emailAddress) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(emailAddress);
}

// Add event listeners for validation
emailInput.addEventListener('input', () => {
    const emailValue = emailInput.value;
    console.log(emailInput.validity.valid);
    if (validateEmail(emailValue)) {
        emailInput.setCustomValidity('');
    }
    if (!emailInput.validity.valid) {
        showErrors(emailInput, 'Please enter a valid email address.');
    } else {
        clearErrors(emailInput);
    }
});

countryInput.addEventListener('input', () => {
    countryInput.setCustomValidity('');
    console.log(countryInput.value);
    console.log(countryInput.validity.valid);
    if (!countryInput.validity.valid) {
        showErrors(countryInput, 'Please select a country');
    } else {
        clearErrors(countryInput);
    }
});

postalCodeInput.addEventListener('input', () => {
    console.log(postalCodeInput.value);
    console.log(postalCodeInput.validity.valid);
    postalCodeInput.setCustomValidity('');
    // Postal codes vary by country, so general text input is fine with 'required'
    if (!postalCodeInput.validity.valid) {
        showErrors(postalCodeInput, 'Postal code is required.');
    } else {
        clearErrors(postalCodeInput);
    }
})

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$/;

passwordInput.addEventListener('input', () => {
    const passwordValue = passwordInput.value;
    passwordInput.setCustomValidity('');
    clearErrors(passwordInput);
    console.log(passwordValue);
    console.log(passwordInput.validity.valid);
    if (passwordPattern.test(passwordValue)) {
        console.log('Valid password.');
        clearErrors(passwordInput);
    } else {
        if (passwordInput.validity.valueMissing) {
            showErrors(passwordInput, 'Password is required.');
        } else if (passwordInput.validity.tooShort) {
            showErrors(passwordInput, `Password should be at least ${passwordInput.minLength} characters long.`);
        } else if (passwordInput.validity.patternMismatch) {
            showErrors(passwordInput, `Pattern Mismatch. 8 characters minimum, 1 Capital Letter, 1 Lower Case Letter, and 1 Special Character`);  
        }
    }
     console.log(passwordInput.validity.valid);
    // Also re-validate password confirmation when the first password changes
    validatePasswordConfirmation();
});

// Function for Password Confirmation
function validatePasswordConfirmation() {
    if (passwordConfirmInput.value !== passwordInput.value) {
        showErrors(passwordConfirmInput, 'Passwords do not match.');
    } else {
        clearErrors(passwordConfirmInput);
    }
}

passwordConfirmInput.addEventListener('input', validatePasswordConfirmation);


// Form submission handler
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
    console.log(passwordInput.validity.valid);

    // Re-validate all fields on submit to catch any unhandled cases
    if (!emailInput.validity.valid) showErrors(emailInput, 'Please enter a valid email address.');
    if (!countryInput.validity.valid) showErrors(countryInput, 'Please select a country.');
    if (!postalCodeInput.validity.valid) showErrors(postalCodeInput, 'Postal code is required.');
    if (!passwordInput.validity.valid) {
        if (passwordInput.validity.valueMissing) showErrors(passwordInput, 'Password is required.');
        if (passwordInput.validity.tooShort) showErrors(passwordInput, `Password should be at least ${passwordInput.minLength} characters long.`);
        if (passwordInput.validity.patternMismatch)showErrors(passwordInput, `Pattern Mismatch. 8 characters minimum, 1 Capital Letter, 1 Lower Case Letter, and 1 Special Character.`);
    }

    validatePasswordConfirmation();

    // Check if the form is valid using checkValidity()
    //console.log(form.validity.valid);
    if (!form.checkValidity()) {
        alert('Form contains errors. Please correct them.');
    } else {
        // Form is valid
        alert('Form submitted successfully! High five!');
    }
});
