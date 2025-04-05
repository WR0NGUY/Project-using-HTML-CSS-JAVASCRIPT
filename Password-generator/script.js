// Function to generate a random password
function generatePassword() {
    const length = 12;  // You can change the password length
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    let password = "";

    // Generate a random password using the charset
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    // Display the generated password in the input field
    document.getElementById("password").value = password;
}

// Function to toggle password visibility
function togglePassword() {
    const passwordField = document.getElementById("password");
    const toggleButton = document.getElementById("toggle");

    // Toggle the type of the input field (password / text)
    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleButton.textContent = "Hide";  // Change the button text
    } else {
        passwordField.type = "password";
        toggleButton.textContent = "Show";  // Change the button text back
    }
}
