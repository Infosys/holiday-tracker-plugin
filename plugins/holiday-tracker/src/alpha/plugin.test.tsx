import { screen } from '@testing-library/react';
import { coreExtensionData } from '@backstage/frontend-plugin-api';
import {
  createExtensionTester,
  renderInTestApp,
} from '@backstage/frontend-test-utils';
import {
  holidayTrackerApi,
  holidayTrackerFrontendPlugin,
  holidayTrackerPage,
} from './plugin';
import plugin from '../index';
import { holidayApiRef } from '../api/HolidayApi';
import { HolidayResponse } from '../api/types';

const mockResponse: HolidayResponse = {
  meta: { code: 200 },
  response: {
    holidays: [
      {
        name: 'Republic Day',
        description: 'National holiday',
        country: { id: 'in', name: 'India' },
        date: {
          iso: '2026-01-26',
          datetime: { year: 2026, month: 1, day: 26 },
        },
        type: ['National holiday'],
        primary_type: 'National holiday',
        canonical_url: '',
        urlid: '',
        locations: 'All',
        states: 'All',
      },
    ],
  },
};

describe('holiday-tracker (new frontend system)', () => {
  it('exports the new frontend system plugin as default', () => {
    expect(plugin).toBe(holidayTrackerFrontendPlugin);
    expect(plugin.id).toBe('holiday-tracker');
  });

  it('provides the api extension', () => {
    expect(holidayTrackerApi).toBeDefined();
  });

  it('mounts the page at /holiday-tracker', () => {
    const tester = createExtensionTester(holidayTrackerPage);
    expect(tester.get(coreExtensionData.routePath)).toBe('/holiday-tracker');
  });

  it('renders holidays from the api', async () => {
    const holidayApi = {
      getHolidays: jest.fn().mockResolvedValue(mockResponse),
    };
    const tester = createExtensionTester(holidayTrackerPage);
    await renderInTestApp(tester.reactElement(), {
      apis: [[holidayApiRef, holidayApi]],
    });
    expect(await screen.findByText('Republic Day')).toBeInTheDocument();
    expect(holidayApi.getHolidays).toHaveBeenCalledWith('IN');
  });
});
