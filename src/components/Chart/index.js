import React from 'react';
import PropTypes from 'prop-types';
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
  Bar
} from 'recharts';
import './style.css';

class ResponsiveChart extends React.Component {
  renderKey = (key) => {
    switch (key.type) {
      case 'bar':
        return (
          <Bar
            yAxisId={key.yAxis}
            dataKey={key.name}
            fill={key.color}
            stackId={key.stack}
          />
        );
      default:
        return (
          <Line
            yAxisId={key.yAxis}
            type="monotone"
            dataKey={key.name}
            stroke={key.color}
          />
        );
    }
  }

  render() {
    return (
      <div className="chart-container">
        <ResponsiveContainer>
          <ComposedChart
            width={600}
            height={300}
            data={this.props.data}
            margin={{
              top: 20,
              right: 10,
              left: 10,
              bottom: 5
            }}
          >
            <XAxis dataKey="id" style={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" style={{ fontSize: 12 }} />
            <YAxis yAxisId="left" orientation="left" style={{ fontSize: 12 }} />
            <CartesianGrid strokeDasharray="1" />
            <Tooltip />
            <Legend />
            {this.props.keys.map(this.renderKey)}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

ResponsiveChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  keys: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ResponsiveChart;
