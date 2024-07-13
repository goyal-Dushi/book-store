import { useContext } from 'react';
import { Alert } from 'react-bootstrap';
import { AlertContext } from '../contexts/AlertContextWrapper';

function AppAlert() {
  const { state, dispatchAlert } = useContext(AlertContext);

  if (!state.show) {
    return null;
  }

  return (
    <Alert onClose={() => dispatchAlert()} variant={state.type || 'info'}>
      <p className={`alert alert-${state.type}`}>{state.msg}</p>
    </Alert>
  );
}

export default AppAlert;
