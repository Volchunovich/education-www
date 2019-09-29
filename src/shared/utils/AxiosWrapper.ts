import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { provide } from './IoC';

@provide.singleton()
export class AxiosWrapper {
  private readonly client = axios.create({
    baseURL: `https://auth-diplom.herokuapp.com`,
  });

  constructor() {
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  public setAuthToken(jwtToken: string) {
    this.client.defaults.headers = {
      'Authorization': 'Bearer ' + jwtToken,
    };
  }

  // noinspection JSMethodCanBeStatic
  public onSuccess(response: AxiosResponse) {
    const { url } = response.config;

    console.debug(`Request Successful! (${url})`, response); // tslint:disable-line

    return response.data;
  }

  // noinspection JSMethodCanBeStatic
  public onError(error: AxiosError): Promise<AxiosResponse | string>  {
    const { url } = error.config;

    console.error(`Request Failed (${url}):`, error.config); // tslint:disable-line

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.error('Status:',  error.response.status); // tslint:disable-line
      console.error('Data:',    error.response.data); // tslint:disable-line
      console.error('Headers:', error.response.headers); // tslint:disable-line
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error('Error Message:', error.message); // tslint:disable-line
    }


    return Promise.reject(error.response || error.message);
  }

  public async request(options: AxiosRequestConfig) {

    return this.client(options)
      .then(this.onSuccess)
      .catch(this.onError);
  }

  public async get<ResponseType = any>(path: string, options?: AxiosRequestConfig): Promise<ResponseType> {
    return this.request({ method: 'GET', url: path, ...options });
  }

  public async post<PayloadType = any, ResponseType = any>(path: string, payload?: PayloadType, options?: AxiosRequestConfig):
    Promise<ResponseType>
  {
    return this.request({ method: 'POST', url: path, data: payload, ...options });
  }

  public async put<PayloadType = any, ResponseType = any>(path: string, payload?: PayloadType, options?: AxiosRequestConfig):
    Promise<ResponseType>
  {
    return this.request({ method: 'PUT', url: path, data: payload, ...options });
  }

  public async delete<ResponseType = any, PayloadType = any>(path: string, payload?: PayloadType, options?: AxiosRequestConfig):
    Promise<ResponseType>
  {
    return this.request({ method: 'DELETE', url: path, data: payload, ...options });
  }
}
