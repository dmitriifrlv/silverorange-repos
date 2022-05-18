import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export function ErrorMessage() {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      Something went wrong, please try again later
    </Alert>
  );
}
