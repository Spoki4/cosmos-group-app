import {Route} from 'react-router';
import * as React from 'react';
import {UserListContainer} from './containers/UserListContainer';
import {CreateUserContainer} from './containers/CreateUserContainer';

export const UsersRoutes = ({ match }) => (
  <>
    <Route path={`${match.url}/users`} exact component={UserListContainer} />
    <Route path={`${match.url}/users/create`} component={CreateUserContainer} />
  </>
);
