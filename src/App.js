import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from './screens/Home';
import Login from './screens/Login';
import UserList from './screens/UserList';
import TeamEdit from './components/TeamEdit';
import TeamCreate from './components/TeamCreate';
import NotFound from './components/NotFound';

import DefaultLayout from './layouts/DefaultLayout';

const defaultRoutes = [
  { path: '/', component: Home, title: '' },
  { path: '/home', component: Home, title: '' },
  { path: '/login', component: Login, title: '' },
  { path: '/users', component: UserList, title: '' },
  { path: '/profile/:id/edit', component: TeamEdit, title: '' },
  { path: '/profile/create', component: TeamCreate, title: '' },
];

const App = () => (
  <Router>
    <Switch>
      {defaultRoutes.map(route => (
        <DefaultLayout
          key={route.path}
          exact
          path={route.path}
          component={route.component}
          title={route.title}
        />
      ))}
      <DefaultLayout component={NotFound} title="Not Found" />
    </Switch>
  </Router>
);


export default App;
