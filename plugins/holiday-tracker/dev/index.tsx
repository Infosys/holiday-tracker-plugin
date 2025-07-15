import { createDevApp } from '@backstage/dev-utils';
import { holidayTrackerPlugin, HolidayTrackerPage } from '../src/plugin';

createDevApp()
  .registerPlugin(holidayTrackerPlugin)
  .addPage({
    element: <HolidayTrackerPage />,
    title: 'Root Page',
    path: '/holiday-tracker',
  })
  .render();
