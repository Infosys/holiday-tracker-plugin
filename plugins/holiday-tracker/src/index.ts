/**
 * New frontend system plugin (default export). Apps using
 * `@backstage/frontend-defaults` can discover and install it automatically.
 */
export { holidayTrackerFrontendPlugin as default } from './alpha/plugin';
export { holidayTrackerApi, holidayTrackerPage } from './alpha/plugin';

/**
 * Legacy frontend system exports, kept for apps that have not migrated yet.
 */
export { holidayTrackerPlugin, HolidayTrackerPage } from './plugin';
export * from './components/HolidayTableComponent/HolidayTableComponent';
export { holidayApiRef } from './api/HolidayApi';
export type { HolidayApi } from './api/HolidayApi';
export type { Holiday, HolidayResponse } from './api/types';
