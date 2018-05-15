import * as React from 'react';
import {Redirect, Router, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {history} from './history';
import FeatureRoutes from './features/routes';
import {LocaleProvider} from 'antd';
import ru_RU from 'antd/lib/locale-provider/ru_RU'

export default ({ store }) => {
  return (
    <LocaleProvider locale={ru_RU}>
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <FeatureRoutes/>
            <Redirect to='/' push/>
          </Switch>
        </Router>
      </Provider>
    </LocaleProvider>
  );
};
