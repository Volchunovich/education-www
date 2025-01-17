import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Form, Icon, Input, Layout, message } from 'antd';
import { FormProps } from 'antd/es/form';
import '../styles/auth-main.scss';
import { lazyInject } from 'shared/utils/IoC';
import { AuthStore } from '../authStore';
import { InLoginDto } from '../dto/in.login.dto';

@observer
class LoginContainer extends React.Component<FormProps & RouteComponentProps> {
  @lazyInject(AuthStore)
  private readonly loginStore: AuthStore;

  @observable
  private payload: InLoginDto = {
    username: '',
    password: '',
  };

  private onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.payload[e.currentTarget.name as keyof InLoginDto] = e.currentTarget.value;
  }

  private onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll(async (errors, values) => {
      if (!!errors) {
        return;
      }

      try {
        await this.loginStore.login(this.payload);

        this.props.history.push('/dashboard');
      } catch (e) {
        message.error(e.message);
      }
    });
  }

  public render() {
    const usernamePrefix = <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />;
    const passwordPrefix = <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />;

    const { getFieldDecorator } = this.props.form;

    return (
      <Layout className='container'>
        <div className='login'>
          <Layout.Header>
            Authorization
          </Layout.Header>
          <Layout.Content>
            <Form onSubmit={this.onSubmitHandler}>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your username',
                    }
                  ],
                })(<Input
                  name='username'
                  placeholder='Enter your username'
                  prefix={usernamePrefix}
                  onChange={this.onInputChangeHandler}
                />)}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ],
                })(<Input.Password
                  name='password'
                  placeholder='Enter your password'
                  prefix={passwordPrefix}
                  onChange={this.onInputChangeHandler}
                />)}
              </Form.Item>

              <Button htmlType='submit' type='primary'>
                Submit
              </Button>

              <Link to='/registration'>
                Don't have an account? Register.
              </Link>

            </Form>

          </Layout.Content>
        </div>
      </Layout>
    );
  }
}

export default Form.create({name: 'login'})(withRouter(LoginContainer));
