import { weatherActions, rootActions } from '../constants/actions';

const defaultState = {
  isLoading: false,
  data: {},
  error: null,
};

export default (state = defaultState, action) => {
  const weatherForecast = {};
  if (action.type === weatherActions.WEATHER_FORECAST) {
    weatherForecast[action.fieldId] = action.weatherForecast;
  }
  switch (action.type) {
    case weatherActions.WEATHER_FORECAST_IS_LOADING:
      console.log('WEATHER_FORECAST_IS_LOADING');
      return {
        ...state,
        isLoading: action.weatherForecastIsLoading,
        data: state.data || {},
        error: null,
      };
    case weatherActions.WEATHER_FORECAST_ERROR:
      console.log('WEATHER_FORECAST_ERROR');
      return {
        ...state,
        isLoading: false,
        data: {},
        error: action.weatherForecastError,
      };
    case weatherActions.WEATHER_FORECAST:
      console.log('WEATHER_FORECAST');
      return {
        ...state,
        isLoading: false,
        data: { ...state.data, ...weatherForecast },
        error: null,
      };

    case weatherActions.CLEAR_WEATHER_FORECAST:
      console.log('CLEAR_WEATHER_FORECAST');
      return {
        ...state,
        isLoading: false,
        data: {},
        error: null,
      };
    case rootActions.CLEAR_STATE:
      console.log('CLEAR_STATE');
      return {
        isLoading: false,
        data: {},
        error: null,
      };
    default:
      // console.log('DEFAULT');
      return state;
  }
};
