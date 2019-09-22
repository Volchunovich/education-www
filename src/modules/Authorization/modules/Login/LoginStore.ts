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
  async login(payload: IOutLoginPayloadDTO): Promise<Error> {
    try {
      await this.api.post('https://auth-diplom.herokuapp.com/auth/login', payload);
    } catch (e) {
      console.error(e.message);

      return new Error(e.data.message.toString());
    }
  }
}
