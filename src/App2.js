import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState({
    cityName: "",
    lat: "",
    lon: ""
  });
  const [weatherData, setWeatherData] = useState({});
  const mockAPI = new Promise((resolve, reject) => {
    resolve({
      coord: {
        lon: 21.01,
        lat: 52.23
      },
      weather: [
        {
          id: 801,
          main: "Clouds",
          description: "few clouds",
          icon: "02n"
        }
      ],
      base: "stations",
      main: {
        temp: 6.15,
        feels_like: 1.29,
        temp_min: 5,
        temp_max: 7.78,
        pressure: 1001,
        humidity: 87
      },
      visibility: 10000,
      wind: {
        speed: 5.1,
        deg: 280
      },
      clouds: {
        all: 20
      },
      dt: 1580659813,
      sys: {
        type: 1,
        id: 1713,
        country: "PL",
        sunrise: 1580624175,
        sunset: 1580656969
      },
      timezone: 3600,
      id: 756135,
      name: "Warsaw",
      cod: 200
    });
  });
  const fetchForecastCity = e => {
    e.preventDefault();
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${input.cityName}&units=Metric&APPID=b0f893da9108b89159170b10c4fbad4a`
    )
      .then(res => res.json())
      .then(data => setWeatherData(data));
    // mockAPI.then(data => {
    //   console.log(data);
    //   setWeatherData(data);
    // });
  };

  const fetchForecastLatLon = e => {
    console.log(input);
    e.preventDefault();
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${input.lat}&lon=${input.lon}&units=Metric&APPID=b0f893da9108b89159170b10c4fbad4a`
    )
      .then(res => res.json())
      .then(data => {
        setWeatherData(data);
      });
  };

  const handleChange = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setInput({ ...input, [name]: newValue });
  };

  return (
    <>
      <form onSubmit={fetchForecastCity} className="App">
        <label>City name</label>
        <input
          name="cityName"
          data-cy="cityName"
          onChange={handleChange}
          type="text"
        />
        <input data-cy="submitCity" type="submit" value="Submit" />
      </form>
      <form onSubmit={fetchForecastLatLon} className="App">
        <label>Enter latitude and longitude</label>
        <input name="lat" data-cy="lat" onChange={handleChange} type="text" />
        <input name="lon" data-cy="lon" onChange={handleChange} type="text" />
        <input data-cy="submitLatLon" type="submit" value="Submit" />
      </form>
      {Object.entries(weatherData).length !== 0 && (
        <div data-cy="weatherDisplay">
          City: {weatherData.name}
          <ul>
            <li>Temp: {weatherData.main.temp}</li>
            <li>Feels like: {weatherData.main.feels_like}</li>
            <li>Pressure: {weatherData.main.pressure}</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
