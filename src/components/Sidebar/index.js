import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  List,
  ListItem,
  Subheader,
  Divider,
} from 'material-ui';

import Home from 'material-ui/svg-icons/action/home';
import BeachIcon from 'material-ui/svg-icons/places/beach-access';
import PeopleIcon from 'material-ui/svg-icons/social/group';
import AddPeopleIcon from 'material-ui/svg-icons/social/person-add';
import LogoutIcon from 'material-ui/svg-icons/action/highlight-off';
import MapsIcon from 'material-ui/svg-icons/maps/layers';

import { removeAuth } from '../../actions/auth';

const SideBar = ({
  history, me, removeAuth, fields
}) => (
  <div style={{ marginTop: 20, height: '100%' }}>
    <Divider />
    <List>
      <ListItem primaryText="Inicio" leftIcon={<Home />} onClick={() => history.push('/home')} />
    </List>
    <Divider />
    <List>
      <Subheader>Campos</Subheader>
      {fields && fields.data && fields.data.map((field => (
        <ListItem key={field._id} primaryText={field.title} leftIcon={<MapsIcon />} onClick={() => history.push('/vacations/create')} />
      )))
      }
    </List>
    <List>
      {me.data && (me.data.role === 'admin' || me.data.role === 'manager' || me.data.role === 'boss') &&
          <div>
            <Subheader>Administración</Subheader>
            <ListItem primaryText="Usuarios" leftIcon={<PeopleIcon />} onClick={() => history.push('/users')} />
            <ListItem primaryText="Crear usuario" leftIcon={<AddPeopleIcon />} onClick={() => history.push('/profile/create')} />
          </div>
      }
    </List>
    <Divider />
    <List>
      <ListItem
        primaryText="Salir"
        leftIcon={<LogoutIcon />}
        onClick={() => {
          removeAuth();
          history.push('/login');
        }}
      />
    </List>
  </div>
);

SideBar.propTypes = {
  me: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({ // eslint-disable-line
  me: state.me,
  fields: state.fieldList
});

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
  removeAuth: () => dispatch(removeAuth()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar));
