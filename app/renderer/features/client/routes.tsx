import {Route} from 'react-router';
import * as React from 'react';
import {ClientListContainer} from './containers/ClientListContainer';
import {CreateClientContainer} from './containers/CreateClientContainer';
import {EditClientContainer} from './containers/EditClientContainer';

export const ClientsRoutes = ({match}) => (
  <>
    <Route
      path={`${match.url}/clients`}
      exact
      component={ClientListContainer}
    />
    <Route
      path={`${match.url}/clients/create`}
      exact
      component={CreateClientContainer}
    />
    <Route
      path={`${match.url}/clients/edit/:id`}
      exact
      component={EditClientContainer}
    />
  </>
);
