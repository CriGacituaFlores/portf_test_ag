import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Paper
} from 'material-ui';

import LayerIcon from 'material-ui/svg-icons/maps/layers';

import { getWeatherForecast } from '../../actions/weather';

import WeatherForecast from '../WeatherForecast';
import Device from '../Device';

import './style.css';


class FieldCard extends Component {
  componentWillMount() {
    console.log(this.props.field._id);
    this.props.getWeatherForecast(this.props.field.loc.coordinates[1], this.props.field.loc.coordinates[0], this.props.field._id);
  }
  render() {
    return (
      <Paper className="card" zDepth={1} >
        <h3 className="card-title">
          <LayerIcon color="#bbcb32" /> {this.props.field.title} <span style={{ fontSize: 14 }}>({this.props.field.crops})</span>
        </h3>
        <WeatherForecast weatherForecast={this.props.weatherForecast} />
        {this.props.field.devices.length > 0 &&
          <div className="device-list">
            <h4>Sensores</h4>
            {this.props.field.devices && this.props.field.devices.map(device => (
              <Device key={device._id} device={device} />
            ))}
          </div>
        }
      </Paper>
    );
  }
}

FieldCard.propTypes = {
  field: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    crops: PropTypes.string,
    devices: PropTypes.array
  }).isRequired,
};

const mapStateToProps = (state, props) => {
  let weatherForecast = {};
  if (state.weather && state.weather.data && state.weather.data[props.field._id]) {
    weatherForecast = state.weather.data[props.field._id];
  }

  return ({ // eslint-disable-line
    fieldSensor: state.fieldSensor,
    weatherForecast
  });
};

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
  getWeatherForecast: (lat, lon, fieldId) => dispatch(getWeatherForecast(lat, lon, fieldId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FieldCard);
