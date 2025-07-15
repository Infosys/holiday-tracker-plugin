import {
  createPlugin,
  createRoutableExtension,
  createApiFactory,
  discoveryApiRef,
  fetchApiRef,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import {
  HolidayClient,
  holidayApiRef,
} from './api/HolidayApi';

export const holidayTrackerPlugin = createPlugin({
  id: 'holiday-tracker',
  apis: [
    createApiFactory({
      api: holidayApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        fetchApi: fetchApiRef,
      },
      factory: ({ discoveryApi, fetchApi }) =>
        new HolidayClient({
          discoveryApi,
          fetchApi,
        }),
    }),
  ],
  routes: {
    root: rootRouteRef,
  },
});

export const HolidayTrackerPage = holidayTrackerPlugin.provide(
  createRoutableExtension({
    name: 'HolidayTrackerPage',
    component: () =>
      import('./components/HolidayTableComponent/HolidayTableComponent').then(m => m.default),
    mountPoint: rootRouteRef,
  }),
);
