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

// Call updateClock every second
setInterval(updateClock, 1000);

// Initial call to display the time right away
updateClock();
