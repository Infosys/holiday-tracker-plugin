import { DiscoveryApi, FetchApi } from '@backstage/core-plugin-api';
import { ResponseError } from '@backstage/errors';
import { HolidayApi } from './HolidayApi';
import { HolidayResponse } from './types';

export class HolidayClient implements HolidayApi {
  private readonly discoveryApi: DiscoveryApi;
  private readonly fetchApi: FetchApi;

  constructor(opts: { discoveryApi: DiscoveryApi; fetchApi: FetchApi }) {
    this.discoveryApi = opts.discoveryApi;
    this.fetchApi = opts.fetchApi;
  }

  private async getServiceUrl(): Promise<string> {
    const proxyUrl = await this.discoveryApi.getBaseUrl('proxy');
    return `${proxyUrl}/holidays`;
  }

  private async fetch<T = any>(input: string, init?: RequestInit): Promise<T> {
    const serviceUrl = await this.getServiceUrl();
    const apiUrl = `${serviceUrl}${input}`;
    const response = await this.fetchApi.fetch(apiUrl, init);
    if (!response.ok) {
      console.error(`Response Error: ${response.statusText}`);
      throw await ResponseError.fromResponse(response);
    }
    const jsonResponse = await response.json();
    return jsonResponse;
  }

  public async getHolidays(): Promise<HolidayResponse> {
    const url = '';
    const response = await this.fetch<HolidayResponse>(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  }
}
