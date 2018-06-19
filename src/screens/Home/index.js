import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';

import FieldCard from '../../components/FieldCard';

import { getFieldList, getFieldSensor } from '../../actions/field';

class Home extends Component {
  componentWillMount() {
    this.props.getFieldList();
  }

  render() {
    return (
      <div>
        <h3 style={{ fontSize: 42, fontWeight: 100, marginTop: 30 }}>{(this.props.me && this.props.me.companyId && this.props.me.companyId.name) || 'Dashboard'}</h3>
        <p className="row-subtitle">Bienvenido a Agrobolt.</p>
        <Row>
          <Col xs={12} sm={12} md={8} lg={8} className="calendar">
            {this.props.fields && this.props.fields.data && this.props.fields.data.map(field => (
              <FieldCard key={field._id} field={field} getFieldSensor={this.props.getFieldSensor} />
            ))}
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} className="calendar">
            <h1>The News</h1>
          </Col>
        </Row>
      </div >
    );
  }
}

Home.propTypes = {
  getFieldList: PropTypes.func.isRequired,
  me: PropTypes.shape({
    companyId: PropTypes.object
  }),
  fields: PropTypes.shape({
    data: PropTypes.array
  }).isRequired
};

Home.defaultProps = {
  me: null
};

const mapStateToProps = state => ({ // eslint-disable-line
  me: state.me.data,
  fields: state.fieldList
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
  getFieldList: () => dispatch(getFieldList()),
  getFieldSensor: () => dispatch(getFieldSensor()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
