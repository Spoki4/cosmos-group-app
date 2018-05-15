import * as React from 'react';

import {Redirect, Route} from 'react-router-dom';
import {LoginContainer} from './containers/LoginContainer';

export const AuthRoutes = () => (
  <>
    <Route
      path='/'
      exact
      render={(props) => {
        const token = localStorage.getItem('token');
        if (token) {
          return <Redirect to='/panel'/>;
        }

        return <LoginContainer {...props} />;
      }}
    />
  </>
);
