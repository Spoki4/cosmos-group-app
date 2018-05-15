import {Route} from 'react-router';
import * as React from 'react';
import {EmployeeListContainer} from './containers/EmployeeListContainer';
import {CreateEmployeeContainer} from './containers/CreateEmployeeContainer';
import {EditEmployeeContainer} from './containers/EditEmployeeContainer';

export const EmployeeRoutes = ({ match }) => (
  <>
    <Route
      path={`${match.url}/employee`}
      exact
      component={EmployeeListContainer}
    />
    <Route
      path={`${match.url}/employee/create`}
      exact
      component={CreateEmployeeContainer}
    />
    <Route
      path={`${match.url}/employee/edit/:id`}
      exact
      component={EditEmployeeContainer}
    />
  </>
);
