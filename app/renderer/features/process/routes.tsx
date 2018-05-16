import {Route} from 'react-router';
import * as React from 'react';
import {ProcessListContainer} from './containers/ProcessListContainer';
import {CreateProcessContainer} from './containers/CreateProcessContainer';
import {EditProcessContainer} from './containers/EditProcessContainer';

export const ProcessesRoutes = ({match}) => (
  <>
    <Route
      path={`${match.url}/processes`}
      exact
      component={ProcessListContainer}
    />
    <Route
      path={`${match.url}/processes/create`}
      exact
      component={CreateProcessContainer}
    />
    <Route
      path={`${match.url}/processes/edit/:id`}
      exact
      component={EditProcessContainer}
    />
  </>
);
