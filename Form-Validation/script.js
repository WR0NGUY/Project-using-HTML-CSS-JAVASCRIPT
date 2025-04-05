document.getElementById("regForm").addEventListener("submit", function(event) {
    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll('.error').forEach(error => error.style.display = 'none');

    // Validate Name
    const name = document.getElementById("name").value;
    if (name.trim() === "") {
        isValid = false;
        document.getElementById("nameError").innerText = "Name is required.";
        document.getElementById("nameError").style.display = 'block';
    }

    // Validate Email
    const email = document.getElementById("email").value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email.trim() === "") {
        isValid = false;
        document.getElementById("emailError").innerText = "Email is required.";
        document.getElementById("emailError").style.display = 'block';
    } else if (!emailPattern.test(email)) {
        isValid = false;
        document.getElementById("emailError").innerText = "Enter a valid email address.";
        document.getElementById("emailError").style.display = 'block';
    }

    // Validate Password
    const password = document.getElementById("password").value;
    if (password.trim() === "") {
        isValid = false;
        document.getElementById("passwordError").innerText = "Password is required.";
        document.getElementById("passwordError").style.display = 'block';
    }

    // Validate Confirm Password
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (confirmPassword.trim() === "") {
        isValid = false;
        document.getElementById("confirmPasswordError").innerText = "Please confirm your password.";
        document.getElementById("confirmPasswordError").style.display = 'block';
    } else if (confirmPassword !== password) {
        isValid = false;
        document.getElementById("confirmPasswordError").innerText = "Passwords do not match.";
        document.getElementById("confirmPasswordError").style.display = 'block';
    }

    // Prevent form submission if not valid
    if (!isValid) {
        event.preventDefault();
    }
});
