import {
  ApiBlueprint,
  createFrontendPlugin,
  discoveryApiRef,
  fetchApiRef,
  PageBlueprint,
} from '@backstage/frontend-plugin-api';
import {
  compatWrapper,
  convertLegacyRouteRef,
} from '@backstage/core-compat-api';
import EventIcon from '@material-ui/icons/Event';
import { holidayApiRef, HolidayClient } from '../api/HolidayApi';
import { rootRouteRef } from '../routes';

/**
 * API extension that provides the {@link holidayApiRef} implementation.
 *
 * @public
 */
export const holidayTrackerApi = ApiBlueprint.make({
  params: defineParams =>
    defineParams({
      api: holidayApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        fetchApi: fetchApiRef,
      },
      factory: ({ discoveryApi, fetchApi }) =>
        new HolidayClient({ discoveryApi, fetchApi }),
    }),
});

/**
 * Page extension that renders the holiday table at `/holiday-tracker`.
 *
 * @public
 */
export const holidayTrackerPage = PageBlueprint.make({
  params: {
    path: '/holiday-tracker',
    title: 'Holiday Tracker',
    icon: <EventIcon />,
    routeRef: convertLegacyRouteRef(rootRouteRef),
    loader: () =>
      import('../components/HolidayTableComponent/HolidayTableComponent').then(
        m => compatWrapper(<m.default />),
      ),
  },
});

/**
 * Holiday Tracker plugin for the Backstage new frontend system.
 *
 * @public
 */
export const holidayTrackerFrontendPlugin = createFrontendPlugin({
  pluginId: 'holiday-tracker',
  info: { packageJson: () => import('../../package.json') },
  extensions: [holidayTrackerApi, holidayTrackerPage],
  routes: {
    root: convertLegacyRouteRef(rootRouteRef),
  },
});
