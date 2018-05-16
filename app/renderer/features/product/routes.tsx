import {Route} from 'react-router';
import * as React from 'react';
import {ProductListContainer} from './containers/ProductListContainer';
import {CreateProductContainer} from './containers/CreateProductContainer';
import {EditProductContainer} from './containers/EditProductContainer';

export const ProductsRoutes = ({match}) => (
  <>
    <Route
      path={`${match.url}/products`}
      exact
      component={ProductListContainer}
    />
    <Route
      path={`${match.url}/products/create`}
      exact
      component={CreateProductContainer}
    />
    <Route
      path={`${match.url}/products/edit/:id`}
      exact
      component={EditProductContainer}
    />
  </>
);
