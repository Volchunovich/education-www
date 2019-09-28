import * as React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { StaticContext } from 'react-router';
import LoginContainer from './Login';
import RegistrationContainer from './Registration';
import { Form } from 'antd';

const WrappedRegistrationContainer = Form.create({name: 'register'})(RegistrationContainer);
const WrappedLoginContainer = Form.create({name: 'login'})(LoginContainer);

class AuthRouting extends React.Component<any, StaticContext> {
  public render() {
    return (
      <Switch>
        <Route exact path='/login' component={WrappedLoginContainer} />
        <Route exact path='/registration' component={WrappedRegistrationContainer} />

        <Redirect to='/login' />
      </Switch>
    );
  }
}

export default withRouter(AuthRouting);
