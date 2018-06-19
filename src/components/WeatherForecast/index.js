import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/es';
import WeatherIcons from 'react-weathericons';

import './style.css';

const icons = {
  'clear-day': 'day-sunny',
  'clear-night': 'night-clear',
  cloudy: 'cloud',
  'partly-cloudy-night': 'night-alt-cloudy',
  rain: 'rain',
  'partly-cloudy-day': 'day-cloudy',
  snow: 'day-snow',
  sleet: 'day-sleet',
  wind: 'day-windy'
};

const WeatherForecast = ({ weatherForecast }) => (
  <div className="weather-forecast">
    <h4 style={{ color: '#333', fontWeight: 100 }}>Pronóstico del tiempo</h4>
    <div className="weather-item">
      {weatherForecast && weatherForecast.daily && weatherForecast.daily.data.slice(0, 5).map(weather => (
        <div key={weather.time} className="weather-box">
          <p>{moment.unix(weather.time).format('dddd D')}</p>
          <div className="temp-box">
            <div className="weather-icon">
              <WeatherIcons name={icons[weather.icon]} size="2x" />
            </div>
            <div>
              <p style={{ fontWeight: 700 }}>{Number.parseFloat(weather.temperatureMax).toFixed(0)} <WeatherIcons name="celsius" /></p>
              <p>{Number.parseFloat(weather.temperatureMin).toFixed(0)} <WeatherIcons name="celsius" /></p>
            </div>
          </div>
          <p style={{ fontSize: 12 }}>{Number.parseFloat(weather.humidity * 100).toFixed(0)} <WeatherIcons name="humidity" /> - {weather.windSpeed}m/s <WeatherIcons name="direction-up" /></p>
          <p style={{ fontSize: 12 }}>{weather.pressure} hPa  <WeatherIcons name="barometer" /></p>
        </div>
      ))}
    </div>
  </div>
);

WeatherForecast.propTypes = {
  weatherForecast: PropTypes.shape({
    daily: PropTypes.object,
  }).isRequired
};

export default WeatherForecast;
