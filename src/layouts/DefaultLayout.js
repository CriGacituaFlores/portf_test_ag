import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';

import Header from './Header';
import SideBar from '../components/Sidebar';


import logo from './agrobolt.svg';
import './DefaultLayout.css';

const DefaultLayout = ({ component: Component, title, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => {
      if (matchProps.match.path === '/login') {
        return (
          <div>
            <header>
              <Header {...matchProps} title={title} />
            </header>
            <Grid fluid>
              <Row center="xs" middle="xs">
                <Col xs={12} sm={12} md={6} lg={6} className="login-left">
                  <img src={logo} alt="Logo" style={{ marginTop: 20 }} />
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} className="login-right">
                  <Component {...matchProps} />
                </Col>
              </Row>
            </Grid>
          </div>
        );
      }
      return (
        <div className="content-main">
          <header>
            <Header {...matchProps} title={title} />
          </header>
          <Grid fluid className="main-layout">
            <Row>
              <Col xs={12} sm={12} md={2} lg={2} className="content-left">
                <p className="logo-top"><img src={logo} alt="Logo" /></p>
                <SideBar />
              </Col>
              <Col xs={12} sm={12} md={10} lg={10} className="content-right">
                <Component {...matchProps} />
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }}
  />
);

DefaultLayout.propTypes = {
  title: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};

export default DefaultLayout;
