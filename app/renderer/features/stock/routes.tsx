import {Route} from 'react-router';
import * as React from 'react';
import {StockListContainer} from './containers/StockListContainer';
import {CreateStockContainer} from './containers/CreateStockContainer';
import {EditStockContainer} from './containers/EditStockContainer';

export const StocksRoutes = ({match}) => (
  <>
    <Route
      path={`${match.url}/stocks`}
      exact
      component={StockListContainer}
    />
    <Route
      path={`${match.url}/stocks/create`}
      exact
      component={CreateStockContainer}
    />
    <Route
      path={`${match.url}/stocks/edit/:id`}
      exact
      component={EditStockContainer}
    />
  </>
);
