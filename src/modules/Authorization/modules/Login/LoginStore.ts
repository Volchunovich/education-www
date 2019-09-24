import { provide } from '../../../../IoC';
import { AxiosWrapper } from '../../../Shared/services/AxiosWrapper';
import { inject } from 'inversify';
import { action } from 'mobx';
import { IOutLoginPayloadDTO } from './dto/output/IOutLoginPayloadDTO';

@provide.singleton()
export class LoginStore {
  @inject(AxiosWrapper)
  private readonly api: AxiosWrapper;

  @action
  async login(payload: IOutLoginPayloadDTO) {
    try {
      await this.api.post('/auth/login', payload);
    } catch (e) {
      throw new Error(e.data.message);
    }
  }
}
