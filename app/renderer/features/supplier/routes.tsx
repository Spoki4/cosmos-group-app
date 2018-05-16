import {Route} from 'react-router';
import * as React from 'react';
import {SupplierListContainer} from './containers/SupplierListContainer';
import {CreateSupplierContainer} from './containers/CreateSupplierContainer';
import {EditSupplierContainer} from './containers/EditSupplierContainer';

export const SuppliersRoutes = ({match}) => (
  <>
    <Route
      path={`${match.url}/suppliers`}
      exact
      component={SupplierListContainer}
    />
    <Route
      path={`${match.url}/suppliers/create`}
      exact
      component={CreateSupplierContainer}
    />
    <Route
      path={`${match.url}/suppliers/edit/:id`}
      exact
      component={EditSupplierContainer}
    />
  </>
);
