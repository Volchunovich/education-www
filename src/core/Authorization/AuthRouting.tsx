import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginContainer from './Login';
import RegistrationContainer from './Registration';

class AuthRouting extends React.Component {

  public render() {
    return (
      <Switch>
        <Route exact path='/login' component={LoginContainer} />
        <Route exact path='/registration' component={RegistrationContainer} />

        <Redirect to='/login' />
      </Switch>
    );
  }
}

export default AuthRouting;
