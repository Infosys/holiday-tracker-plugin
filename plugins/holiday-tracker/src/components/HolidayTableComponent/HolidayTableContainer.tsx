import { useState, useEffect } from 'react';
import { useApi, configApiRef } from '@backstage/core-plugin-api';
import { holidayApiRef } from '../../api/HolidayApi';
import { Card, CardContent } from '@material-ui/core';
import { LoadingIndicator } from './LoadingIndicator';
import { ErrorMessage } from './ErrorMessage';
import { Holiday } from '../../api/types';
import { HolidayTable } from './HolidayTable';

export const HolidayTableContainer = () => {
  const config = useApi(configApiRef);
  const holidayApi = useApi(holidayApiRef);
  const defaultCountry = config.getOptionalString('holiday.defaultCountry') || 'IN';
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        setLoading(true);
        const data = await holidayApi.getHolidays(defaultCountry);
        const holidaysArr = data.response.holidays ?? [];
        const uniqueHolidays = Array.from(new Map(holidaysArr.map(h => [h.name, h])).values());
        setHolidays(uniqueHolidays as Holiday[]);
        setError(null);
      } catch (err) {
        setError('Failed to fetch holidays');
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, [defaultCountry, holidayApi]);

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Card>
      <CardContent>
        <HolidayTable holidays={holidays} />
      </CardContent>
    </Card>
  );
};
