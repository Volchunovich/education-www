import * as React from 'react';
import { Redirect, Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';
import DashboardContainer from './Dashboard/containers/DashboardContainer';
import AuthRouting from './Authorization/AuthRouting';
import { lazyInject } from '../IoC';
import { SessionStore } from './Shared/stores/SessionStore';
import { observer } from 'mobx-react';

const { Suspense } = React;

@observer
class RootRouting extends React.Component<any, StaticContext> {

  @lazyInject(SessionStore)
  private readonly session: SessionStore;

  public render() {
    const canAccessDashboard = this.session.state.isLoggedIn;
    const canAccessAuth = !this.session.state.isLoggedIn;

    const canAccessDashboardRender = () => {
      return canAccessDashboard
        ? <DashboardContainer/>
        : <Redirect to='/login'/>;
    };

    const canAccessAuthRender = () => {
      return canAccessAuth
        ? <AuthRouting/>
        : <Redirect to='/dashboard'/>;
    };

    return (
      <>
        <Suspense fallback='Loading ...'>
          <Switch>
            <Route
              path='/dashboard'
              render={canAccessDashboardRender}
            />

            <Route
              path='/'
              render={canAccessAuthRender}
            />
          </Switch>
        </Suspense>
      </>
    );


  }
}

export default withRouter(RootRouting);
