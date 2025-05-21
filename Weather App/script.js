const cityInput = document.getElementById('city');
const getWeatherBtn = document.getElementById('getWeather');

getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  const apiKey = '1c2b2a7196be26088579fa0cb8782dc9';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      const result = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].main}</p>
        <p>Humidity: ${data.main.humidity}%</p>
      `;
      document.getElementById('weatherResult').innerHTML = result;
    })
    .catch(error => {
      document.getElementById('weatherResult').innerHTML = `<p>${error.message}</p>`;
    });
});

// 👇 Trigger search on Enter key press
cityInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    getWeatherBtn.click();
  }
});
