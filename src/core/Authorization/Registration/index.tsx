import * as React from 'react';
import { Button, Form, Icon, Input, Layout, message } from 'antd';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { lazyInject } from 'shared/utils/IoC';
import { SessionStore } from 'shared/stores/SessionStore';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { IOutRegistrationPayloadDTO } from './dto/output/IOutRegistrationPayloadDTO';
import { RegistrationStore } from './store';
import { FormProps } from 'antd/es/form';

@observer
class RegistrationContainer extends React.Component<FormProps & RouteComponentProps> {

  @lazyInject(SessionStore)
  private readonly session: SessionStore;

  @lazyInject(RegistrationStore)
  private readonly registrationStore: RegistrationStore;

  @observable
  private payload = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  private onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.payload[e.currentTarget.name as keyof IOutRegistrationPayloadDTO] = e.currentTarget.value;
  }

  private onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll(async (errors, values) => {
      if (!!errors) {
        return;
      }

      try {
        await this.registrationStore.register(this.payload);
        this.props.history.push('/login');
        message.success('User successfully registered!');
      } catch (e) {
        message.error(e.message);
      }
    });
  }

  private compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  private validateToNextPassword = (rule: any, value: any, callback: any) => {
    const { form } = this.props;
    if (value) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  public render() {

    const usernamePrefix = <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />;
    const passwordPrefix = <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />;

    const { getFieldDecorator } = this.props.form;

    return (
      <Layout className='container'>
        <div className='login'>
          <Layout.Header>
            Registration
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
                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                })(<Input.Password
                  name='password'
                  placeholder='Enter your password'
                  prefix={passwordPrefix}
                  onChange={this.onInputChangeHandler}
                />)}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator('confirmPassword', {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                })(<Input.Password
                  name='confirmPassword'
                  placeholder='Enter your confirm password'
                  prefix={passwordPrefix}
                  onChange={this.onInputChangeHandler}
                />)}
              </Form.Item>

              <Button htmlType='submit' type='primary'>
                Submit
              </Button>

              <Link to='/login'>
                Have an account? Log in.
              </Link>

            </Form>

          </Layout.Content>
        </div>
      </Layout>
    );
  }
}

export default withRouter(RegistrationContainer);
