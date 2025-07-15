import { createApiRef, DiscoveryApi, FetchApi } from '@backstage/core-plugin-api';
import { HolidayResponse } from './types';
import { HolidayClient } from './HolidayClient';

// Define the API reference
export const holidayApiRef = createApiRef<HolidayApi>({
  id: 'plugin.holiday-tracker.service',
});

// Define the API interface
export interface HolidayApi {
  getHolidays(country: string): Promise<HolidayResponse>;
}

// Export the HolidayClient
export { HolidayClient };

// Create the API factory
export const holidayApiFactory = {
  deps: {
    discoveryApi: createApiRef<DiscoveryApi>({ id: 'core.discovery' }),
    fetchApi: createApiRef<FetchApi>({ id: 'core.fetch' }),
  },
  factory: ({ discoveryApi, fetchApi }: { discoveryApi: DiscoveryApi; fetchApi: FetchApi }) => {
    return new HolidayClient({
      discoveryApi,
      fetchApi,
    });
  },
};
