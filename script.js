
    // Replace with your API keys
const WEATHER_API_KEY = "0511de3b86721a3cddcdceaa1953b568";
const UNSPLASH_ACCESS_KEY = "XvvrV4oI05X9IyRLIj4rj-eP0w33YMB4kkeV6XAOFeU";

async function searchDestination() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  // Display city name
  document.getElementById("cityName").innerText = `You searched for: ${city}`;

  // Fetch Weather
  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
    const weatherRes = await fetch(weatherUrl);
    if (!weatherRes.ok) throw new Error("Weather not found");
    const weatherData = await weatherRes.json();

    document.getElementById("weather-data").innerHTML = `
      <p><strong>Condition:</strong> ${weatherData.weather[0].description}</p>
      <p><strong>Temperature:</strong> ${weatherData.main.temp} °C</p>
      <p><strong>Humidity:</strong> ${weatherData.main.humidity}%</p>
      <p><strong>Wind:</strong> ${weatherData.wind.speed} m/s</p>
    `;
  } catch (error) {
    document.getElementById("weather-data").innerHTML = `<p>⚠️ Could not fetch weather data.</p>`;
  }

  // Fetch Photos
  try {
    const photoUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=6`;
    const photoRes = await fetch(photoUrl);
    if (!photoRes.ok) throw new Error("Photos not found");
    const photoData = await photoRes.json();

    document.getElementById("photo-gallery").innerHTML = photoData.results
      .map(img => `<img src="${img.urls.small}" alt="${city}">`)
      .join('');
  } catch (error) {
    document.getElementById("photo-gallery").innerHTML = `<p>⚠️ Could not load photos.</p>`;
  }
}
