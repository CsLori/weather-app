import React, { Component } from 'react';
import './App.css';
import Weather from './components.js/Weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Form from './components.js/Form';

const APIkey = 'c23238187b6c6b474154010ab5328b44';

class App extends Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: '',
      error: false
    };
    this.weatherIcon = {
      Thunderstorm: 'wi-thunderstorm',
      Drizzle: 'wi-sleet',
      Rain: 'wi-storm-showers',
      Snow: 'wi-snow',
      Atmosphere: 'wi-fog',
      Clear: 'wi-day-sunny',
      Clouds: 'wi-day-fog'
    };
  }

  getCelsius(temp) {
    let cels = Math.floor(temp - 273.15);
    return cels;
  }

  getWeatherIcon(icons, rangeID) {
    switch (true) {
      case rangeID >= 200 && rangeID <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeID >= 300 && rangeID <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangeID >= 500 && rangeID <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeID >= 600 && rangeID <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangeID >= 700 && rangeID <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case rangeID >= 800:
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case rangeID >= 801 && rangeID <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
    }
  }

  getWeather = async e => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIkey}`
      );
      const res = await api_call.json();
      console.log(res);
      this.setState({
        city: `${res.name}, ${res.sys.country}`,
        celsius: this.getCelsius(res.main.temp),
        temp_max: this.getCelsius(res.main.temp_max),
        temp_min: this.getCelsius(res.main.temp_min),
        description: res.weather[0].description
      });
      this.getWeatherIcon(this.weatherIcon, res.weather[0].id);
    } else {
      this.setState({ error: true });
    }
  };
  render() {
    const {
      city,
      country,
      icon,
      main,
      celsius,
      temp_max,
      temp_min,
      description
    } = this.state;
    return (
      <div className="App">
        <Form loadWeather={this.getWeather} error={this.state.error} />
        <Weather
          city={city}
          country={country}
          celsius={celsius}
          weatherIcon={icon}
          main={main}
          temp_min={temp_min}
          temp_max={temp_max}
          description={description}
        />
      </div>
    );
  }
}

export default App;
