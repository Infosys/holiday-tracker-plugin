# Welcome to the Holiday Tracker Plugins Repository for Backstage!

The Holiday Tracker Plugin for Backstage provides real-time public holiday information for a specified country or region using the Calendarific API. This plugin includes a secure backend proxy configuration to fetch holiday data without exposing your API key.

---

## How It Works

### Backend Proxy Configuration:

The plugin uses a secure backend proxy to fetch holiday data from the Calendarific API. This ensures that your API key is not exposed to the client-side code.  
You need to configure the backend proxy in your `app-config.yaml` file to point to the Calendarific API with your API key.

### Fetching Holiday Data:

The plugin fetches real-time holiday data for a specified location and year. You can configure the default country and year in the `app-config.yaml` file.  
The holiday data includes information such as the holiday name, date, type, description, and the country in which it is observed.

### Displaying Holiday Information:

The plugin provides a `HolidayTableComponent` that you can embed in any Backstage page to display the holiday information.  
The component displays upcoming holidays, their descriptions, dates, and whether they are national, local, or religious holidays.

### Error Handling:

The plugin handles errors gracefully by displaying error messages in the `HolidayTableComponent` if the API call fails or if there is an issue with the configuration.

---

**FOR MORE INFORMATION AND SETUP PLEASE VISIT PLUGIN DOCS [HOLIDAY TRACKER PLUGIN](https://github.com/Infosys/holiday-tracker-plugin/blob/main/plugins/holiday-tracker/README.md)**
