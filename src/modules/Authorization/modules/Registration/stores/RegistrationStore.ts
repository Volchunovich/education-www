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
  async registration(payload: IOutRegistrationPayloadDTO): Promise<Error> {
    try {
      await this.api.post('https://auth-diplom.herokuapp.com/auth/register', payload);
    } catch (e) {
      // console.error(e.message);

      return new Error(e.data.message.toString());
    }
  }
}
