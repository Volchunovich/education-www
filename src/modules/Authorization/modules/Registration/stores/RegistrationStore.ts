import { provide } from '../../../../../IoC';
import { action } from 'mobx';
import { IOutRegistrationPayloadDTO } from '../dto/output/IOutRegistrationPayloadDTO';

@provide.singleton()
export class RegistrationStore {

  @action
  isPayloadValid(payload: IOutRegistrationPayloadDTO): boolean {
    return payload.password === payload.confirmPassword;
  }
}
