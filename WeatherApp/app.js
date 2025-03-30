// app.js
const apiKey = '6e79f6ef5406421091f143210253003';  // Replace with your API key
const baseUrl = 'http://api.weatherapi.com/v1/current.json';

const getWeatherButton = document.getElementById('getWeather');
const cityInput = document.getElementById('city');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');

getWeatherButton.addEventListener('click', async () => {
  const city = cityInput.value.trim();
  if (!city) {
    alert('Please enter a city name');
    return;
  }

  try {
    // Fetch data from the API
    const response = await fetch(`${baseUrl}?key=${apiKey}&q=${city}&aqi=no`)
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();

    // Update the DOM with the weather data
    cityName.textContent = `${data.location.name}, ${data.location.country}`;
temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
description.textContent = `Condition: ${data.current.condition.text}`;


  } catch (error) {
    // Handle errors (e.g., invalid city, no response)
    alert('Error: ' + error.message);
  }

  // Get user's location and fetch weather data
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
  
      // Fetch weather based on coordinates
      fetch(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then((response) => response.json())
        .then((data) => {
          cityName.textContent = `${data.name}, ${data.sys.country}`;
          temperature.textContent = `Temperature: ${data.main.temp}°C`;
          description.textContent = `Condition: ${data.weather[0].description}`;
        });
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
  
});
