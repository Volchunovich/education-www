import { provide } from 'shared/utils/IoC';
import { action, observable } from 'mobx';
import { AxiosWrapper } from 'shared/utils/AxiosWrapper';
import { inject } from 'inversify';

@provide.singleton()
export class DashboardStore {

  @inject(AxiosWrapper)
  private readonly api: AxiosWrapper;

  @observable
  fields : IFieldsDashboard = {
    file: [],
    stats: [],
  };

  @action
  async fetchStats() {

  }

  @action
  async uploadFile() {

  }
}

interface IFieldsDashboard {
  file?: FormData[];
  stats: IStats[];
}

interface IStats {
  id: number;
  uploadDate: string;
  fileName: string;
  fileSize: number;
}
