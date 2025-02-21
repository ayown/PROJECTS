async function getWeather() {
    const apiKey = '55549cbe7d0c4a769fc221853252102'; // Using provided API key
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }
    
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=yes&alerts=yes`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.location) {
            document.getElementById('weather-info').innerHTML = `
                <h3>${data.location.name}, ${data.location.country}</h3>
                <p>Current Temperature: ${data.current.temp_c}°C</p>
                <p>Weather: ${data.current.condition.text}</p>
                <p>Humidity: ${data.current.humidity}%</p>
                <p>Wind Speed: ${data.current.wind_kph} kph</p>
                <p>Precipitation: ${data.current.precip_mm} mm</p>
                <p>Air Quality Index: ${data.current.air_quality.pm2_5}</p>
                <h4>Forecast:</h4>
                <p>Expected Temperature: ${data.forecast.forecastday[0].day.avgtemp_c}°C</p>
                <p>Expected Weather: ${data.forecast.forecastday[0].day.condition.text}</p>
                <p>Expected Precipitation: ${data.forecast.forecastday[0].day.totalprecip_mm} mm</p>
            `;
        } else {
            document.getElementById('weather-info').innerHTML = `<p>City not found</p>`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}