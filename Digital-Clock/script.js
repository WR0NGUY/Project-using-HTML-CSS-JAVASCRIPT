// Function to update the clock display
function updateClock() {
    const clockElement = document.getElementById('clock');
    
    // Get the current time
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Add leading zeros if needed
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Update the clock display
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Function to toggle between dark and light mode
function toggleDarkMode() {
    const body = document.body;
    const clock = document.getElementById('clock');
    
    // Toggle the 'dark-mode' class on body and clock
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    clock.classList.toggle('dark-mode');
    clock.classList.toggle('light-mode');
}

// Add event listener to toggle button
document.getElementById('toggle-button').addEventListener('click', toggleDarkMode);

// Call updateClock every second
setInterval(updateClock, 1000);

// Initial call to display the time right away
updateClock();
