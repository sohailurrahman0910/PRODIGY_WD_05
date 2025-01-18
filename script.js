const apiKey = 'a14c9de7ad52cf772695b6f89ec1b499';

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoordinates(latitude, longitude);
        }, () => {
            document.getElementById('weather').innerText = 'Unable to retrieve your location';
        });
    }
});

function getWeatherByCoordinates(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function getWeatherByInput() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => console.error('Error fetching weather data:', error));
    }
}

function displayWeather(data) {
    if (data.cod === 200) {
        document.getElementById('weather').innerHTML = `
            <p><strong>Location:</strong> ${data.name}, ${data.sys.country}</p>
            <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
            <p><strong>Weather:</strong> ${data.weather[0].description}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `;
    } else {
        document.getElementById('weather').innerText = 'Weather data not found';
    }
}