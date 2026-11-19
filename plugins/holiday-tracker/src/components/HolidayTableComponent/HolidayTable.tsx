import { Table, TableColumn } from '@backstage/core-components';
import { Holiday } from '../../api/types';

const columns: TableColumn[] = [
  { title: 'Name', field: 'name' },
  { title: 'Description', field: 'description' },
  { title: 'Date', field: 'date.iso' },
  { title: 'Country', field: 'country.name' },
  { title: 'Type', field: 'type' },
];

type HolidayTableProps = {
  holidays: Holiday[];
};

export const HolidayTable = ({ holidays }: HolidayTableProps) => (
  <Table
    title="Holidays"
    options={{ paging: true, pageSize: 5 }}
    columns={columns}
    data={holidays}
  />
);
