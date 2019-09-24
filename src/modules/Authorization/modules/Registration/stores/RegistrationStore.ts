import { provide } from '../../../../../IoC';
import { action } from 'mobx';
import { IOutRegistrationPayloadDTO } from '../dto/output/IOutRegistrationPayloadDTO';
import { AxiosWrapper } from '../../../../Shared/services/AxiosWrapper';
import { inject } from 'inversify';

@provide.singleton()
export class RegistrationStore {

  @inject(AxiosWrapper)
  private readonly api: AxiosWrapper;

  @action
  async register(payload: IOutRegistrationPayloadDTO) {
    try {
      await this.api.post('/auth/register', payload);
    } catch (e) {
      throw new Error(e.data.message);
    }
  }
}
