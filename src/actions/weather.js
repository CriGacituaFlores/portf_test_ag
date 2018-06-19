import { apiFetch } from '../services/api';
import { weatherActions } from '../constants/actions';

function weatherForecastIsLoading() {
  return {
    type: weatherActions.WEATHER_FORECAST_IS_LOADING,
    fieldIsLoading: true,
  };
}

function weatherForecastError(error) {
  return {
    type: weatherActions.WEATHER_FORECAST_ERROR,
    fieldError: error,
  };
}

function setWeatherForecast(weatherForecast, fieldId) {
  return {
    type: weatherActions.WEATHER_FORECAST,
    fieldId,
    weatherForecast,
  };
}

export function clearWeatherForecast() {
  return {
    type: weatherActions.CLEAR_WEATHER_FORECAST
  };
}

export function getWeatherForecast(lat, lon, fieldId) {
  return (dispatch) => {
    dispatch(weatherForecastIsLoading());
    const _request = {
      method: 'POST',
      url: '/weather',
      body: {
        lat,
        lon
      }
    };

    console.log(_request);
    console.log(fieldId);
    apiFetch(_request)
      .then(_response => _response.body)
      .then((_body) => {
        console.log(_body);
        dispatch(setWeatherForecast(_body, fieldId));
      })
      .catch((e) => {
        console.log(e);
        dispatch(weatherForecastError({ message: 'Something went wrong getting field data' }));
      });
  };
}
