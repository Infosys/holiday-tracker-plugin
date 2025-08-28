import { Typography } from '@material-ui/core';

export const ErrorMessage = ({ message }: { message: string }) => (
  <Typography color="error">{message}</Typography>
);
