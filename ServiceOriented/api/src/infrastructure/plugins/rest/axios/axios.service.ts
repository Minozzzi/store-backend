import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
} from 'axios';
import { Agent as AgentHttp } from 'http';
import { Agent as AgentHttps } from 'https';

import { RequestProvider } from 'src/infrastructure/interfaces';

export class AxiosService implements RequestProvider {
  private readonly client: AxiosInstance;

  constructor(
    private readonly baseUrl: string,
    private readonly contentType?: string,
  ) {
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: this.contentType
        ? {
            'Content-Type': this.contentType,
          }
        : {},
      httpAgent: new AgentHttp(),
      httpsAgent: new AgentHttps({
        rejectUnauthorized: false,
      }),
    });
  }

  async get(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse | AxiosError> {
    return this.client.get(url, config);
  }

  async post(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse | AxiosError> {
    return this.client.post(url, data, config);
  }

  async put(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse | AxiosError> {
    return this.client.put(url, config, data);
  }

  async delete(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse | AxiosError> {
    return this.client.delete(url, config);
  }
}
