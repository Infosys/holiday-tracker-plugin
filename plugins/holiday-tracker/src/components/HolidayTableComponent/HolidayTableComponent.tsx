import React from 'react';
import { useState, useEffect } from 'react';
import { useApi, configApiRef } from '@backstage/core-plugin-api';
import { holidayApiRef } from '../../api/HolidayApi';
import { Table, TableColumn } from '@backstage/core-components';
import { Card, CardContent, Typography, CircularProgress } from '@material-ui/core';
import { Holiday } from '../../api/types'; 

const columns: TableColumn[] = [
  { title: 'Name', field: 'name' },
  { title: 'Description', field: 'description' },
  { title: 'Date', field: 'date.iso' }, 
  { title: 'Country', field: 'country.name' },
  { title: 'Type', field: 'type' },
];

const HolidayTableComponent = () => {
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

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Table
          title="Holidays"
          options={{ paging: true, pageSize: 5 }}
          columns={columns}
          data={holidays}
        />
      </CardContent>
    </Card>
  );
};

export default HolidayTableComponent;
