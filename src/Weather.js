import React, { useState } from "react";
import "./App.css";

const apikey =
  "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}"

function Weather() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);

  const fetchWeatherData = async (lat, lon) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=a0325d5dc60d2d6608b1f3e1c5a03904`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      // console.log('API Response:', data);

      await setForecast(data.list);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const getWeatherImage = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clear":
        return "images/sunny.png";
      case "Rain":
        return "images/rainy.png";
      case "Clouds":
        return "images/cloudy.png";
      case "Snow":
        return "images/snowy.png";
      default:
        return "images/default.png";
    }
  };

  const renderWeatherCard = (day,date) => (
    <div key={day.dt} className="card">
      <img
        className="image"
        src={getWeatherImage(day.weather[0].main)}
        alt={day.weather[0].main}
      />
      <p>High: {day.main?.temp?.max}&deg;C</p>
      <p>Low: {day.main?.temp?.min}&deg;C</p>
      <p>
        Geo Coordinates: {day.coord?.lat}, {day.coord?.lon}
      </p>
      <p>Humidity: {day.main?.humidity}%</p>
      {/* <p>Sunrise: {new Date(day.sunrise * 1000).toLocaleTimeString()}</p>
      <p>Sunset: {new Date(day.sunset * 1000).toLocaleTimeString()}</p> */}
      <p>Sunrise: {day.sunrise ? new Date(day.sunrise * 1000).toLocaleTimeString() : 'N/A'}</p>
<p>Sunset: {day.sunset ? new Date(day.sunset * 1000).toLocaleTimeString() : 'N/A'}</p>

    </div>
  );

  const searchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a0325d5dc60d2d6608b1f3e1c5a03904`
      );
      const data = await response.json();

      const lat = data.coord.lat;
      const lon = data.coord.lon;

      fetchWeatherData(lat, lon);
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };

  return (
    <div className="App">
      <h1>5-Day Weather Forecast</h1>
      <div id="weatherCards">{forecast.map(renderWeatherCard)}</div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={searchWeather}>Search</button>
    </div>
  );
}

export default Weather;
