export interface Holiday {
  name: string;
  description: string;
  country: {
    id: string;
    name: string;
  };
  date: {
    iso: string;
    datetime: {
      year: number;
      month: number;
      day: number;
      hour?: number;
      minute?: number;
      second?: number;
    };
    timezone?: {
      offset: string;
      zoneabb: string;
      zoneoffset: number;
      zonedst: number;
      zonetotaloffset: number;
    };
  };
  type: string[];
  primary_type: string;
  canonical_url: string;
  urlid: string;
  locations: string;
  states: string;
}

export interface HolidayResponse {
  meta: {
    code: number;
  };
  response: {
    holidays: Holiday[];
  };
}
