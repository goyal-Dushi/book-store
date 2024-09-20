import { useContext, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { AlertContext } from '../contexts/AlertContextWrapper';

function AppAlert() {
  const { state, alertClose } = useContext(AlertContext);

  const handleAlertClose = () => {
    alertClose();
  };

  useEffect(() => {
    let timeout = undefined;
    if (state.show) {
      timeout = setTimeout(() => {
        handleAlertClose();
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [state.show]);

  if (!state.show) {
    return null;
  }

  return (
    <Alert
      onClose={handleAlertClose}
      dismissible
      variant={state.type || 'info'}
    >
      <p className={`alert alert-${state.type || 'info'}`}>{state.msg}</p>
    </Alert>
  );
}

export default AppAlert;
