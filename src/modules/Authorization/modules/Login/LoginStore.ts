import { provide } from '../../../../IoC';
import { AxiosWrapper } from '../../../Shared/services/AxiosWrapper';
import { inject } from 'inversify';
import { action } from 'mobx';
import { IOutLoginPayloadDTO } from './dto/output/IOutLoginPayloadDTO';

@provide.singleton()
export class LoginStore {

  @inject(AxiosWrapper)
  private readonly api: AxiosWrapper;

  // TODO: unmock request
  @action
  async login(payload: IOutLoginPayloadDTO): Promise<void> {
    try {
      const response = await this.api.post('/auth/login', payload);
    } catch (e) {
      console.error(e.message);
    }
  }
}
