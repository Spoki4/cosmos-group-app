import * as React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {AuthRoutes} from './login/routes';
import {PanelLayout} from '../ui/PanelLayout';
import {UsersRoutes} from './users/routes';
import {EmployeeRoutes} from './employee/routes';
import {ProductsRoutes} from './product/routes';
import {StocksRoutes} from './stock/routes';
import {SuppliersRoutes} from './supplier/routes';
import {ClientsRoutes} from './client/routes';

export default () => (
  <>
    <AuthRoutes />
    <Route
      path='/panel'
      render={(props) => {
        const token = localStorage.getItem('token');
        if (!token) {
          return <Redirect to='/'/>;
        }
        return (
          <PanelLayout
            renderContent={() => (
              <>
                <UsersRoutes {...props} />
                <EmployeeRoutes {...props} />
                <ProductsRoutes {...props} />
                <StocksRoutes {...props} />
                <SuppliersRoutes {...props} />
                <ClientsRoutes {...props} />
              </>
            )}
          />
        );
      }}
    />
  </>
);
