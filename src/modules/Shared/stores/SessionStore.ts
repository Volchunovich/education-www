import { provide } from '../../../IoC';
import { action, observable } from 'mobx';
import { inject } from 'inversify';
import { AxiosWrapper } from '../services/AxiosWrapper';

@provide.singleton()
export class SessionStore {

  @inject(AxiosWrapper)
  private readonly api: AxiosWrapper;

  @observable
  public state: ISessionState = {
    isLoggedIn: false,
  };

  @action
  async session() {
    const response = await this.api.get('mock');
  }
}

interface ISessionState {
  isLoggedIn: boolean;
}
