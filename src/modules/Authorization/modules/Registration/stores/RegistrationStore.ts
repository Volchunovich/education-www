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
  isPayloadValid(payload: IOutRegistrationPayloadDTO): boolean {
    return payload.password === payload.confirmPassword;
  }

  // TODO: unmock request
  @action
  async registration(payload: IOutRegistrationPayloadDTO): Promise<void> {
    try {
      const response = await this.api.post('/auth/register', payload);
    } catch (e) {
      console.error(e.message);
    }
  }
}
