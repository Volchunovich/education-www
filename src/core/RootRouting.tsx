import * as React from 'react';
import { observer } from 'mobx-react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Spin } from 'antd';

import { useStore } from 'shared/utils/IoC';

import DashboardContainer from './Dashboard';
import { AuthStore } from './Authorization/authStore';
import AuthRouting from './Authorization/AuthRouting';

function RootRouting() {
  const { isLoggedIn, loading } = useStore(AuthStore);

  if (loading) {
    return <Spin />;
  }

  if (!isLoggedIn) {
    return <AuthRouting />;
  }

  return (
    <Switch>
      <Route
        path='/dashboard'
        component={DashboardContainer}
      />

      <Redirect to='/dashboard' />
    </Switch>
  );
}

export default observer(RootRouting);
