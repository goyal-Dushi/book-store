import { createContext, useReducer } from 'react';

const initialState = {
  show: false,
  msg: '',
  type: '',
};

function alertReducer(state = initialState, action) {
  switch (action.type) {
    case 'warning':
    case 'success':
    case 'danger':
      return {
        ...state,
        type: action.type,
        msg: action.msg || '',
        show: action.show ?? false,
      };
    case 'close':
      return state;
    default:
      console.error(`Unhandled action type: ${action.type}`);
      return state;
  }
}

export const AlertContext = createContext({
  state: initialState,
  alertSuccess: () => {},
  alertWarning: () => {},
  alertError: () => {},
  alertClose: () => {},
});

function AlertContextWrapper(props) {
  const [state, dispatchAlert] = useReducer(alertReducer, initialState);

  const alertWarning = (msg) => {
    dispatchAlert({ type: 'warning', msg, show: true });
  };

  const alertSuccess = (msg) => {
    dispatchAlert({ type: 'success', msg, show: true });
  };

  const alertError = (msg) => {
    dispatchAlert({ type: 'danger', msg, show: true });
  };

  const alertClose = () => {
    dispatchAlert({ type: 'close', show: false });
  };

  return (
    <AlertContext.Provider
      value={{ state, alertWarning, alertSuccess, alertClose, alertError }}
    >
      {props.children}
    </AlertContext.Provider>
  );
}

export default AlertContextWrapper;
