import { action, observable } from 'mobx';

import { lazyInject, provide } from 'shared/utils/IoC';
import { AxiosWrapper } from 'shared/utils/AxiosWrapper';
import { StorageKeys } from 'shared/const/StorageKeys';

import { OutUserDto } from './dto/out.user.dto';
import { OutLoginDto } from './dto/out.login.dto';
import { InLoginDto } from './dto/in.login.dto';
import { InRegisterDto } from './dto/in.register.dto';

@provide.singleton()
export class AuthStore {
  @lazyInject(AxiosWrapper)
  private readonly api: AxiosWrapper;

  @observable
  public isLoggedIn: boolean;

  @observable
  public loading: boolean = true;

  constructor() {
    this.init();
  }

  async init() {
    const token = localStorage.getItem(StorageKeys.authToken);

    if (token) {
      this.api.setAuthToken(token);
      this.isLoggedIn = await this.checkAuth();
    }

    this.loading = false;
  }

  @action
  async login(payload: InLoginDto) {
    try {
      const { token } = await this.api.post<InLoginDto, OutLoginDto>('/auth/login', payload);

      this.api.setAuthToken(token);
      this.isLoggedIn = true;

      localStorage.setItem(StorageKeys.authToken, token);
    } catch (e) {
      throw new Error(e.data.message);
    }
  }

  @action
  async register(payload: InRegisterDto) {
    try {
      await this.api.post<InRegisterDto>('/auth/register', payload);
    } catch (e) {
      throw new Error(e.data.message);
    }
  }

  async checkAuth(): Promise<boolean> {
    try {
      await this.api.get<OutUserDto>('/auth/user');

      return true;
    } catch (e) {
      return false;
    }
  }
}
