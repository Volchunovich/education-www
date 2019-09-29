import * as React from 'react';
import { observer } from 'mobx-react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Spin } from 'antd';

import { lazyInject } from 'shared/utils/IoC';

import DashboardContainer from './Dashboard';
import { AuthStore } from './Authorization/authStore';
import AuthRouting from './Authorization/AuthRouting';

const { Suspense } = React;

@observer
class RootRouting extends React.Component {
  @lazyInject(AuthStore)
  authStore: AuthStore;

  public render() {
    const { isLoggedIn, loading } = this.authStore;

    if (loading) {
      return <Spin />;
    }

    if (!isLoggedIn) {
      return <AuthRouting />;
    }

    return (
      <Suspense fallback='Loading ...'>
        <Switch>
          <Route
            path='/dashboard'
            component={DashboardContainer}
          />

          <Redirect to='/dashboard' />
        </Switch>
      </Suspense>
    );
  }
}

export default RootRouting;
