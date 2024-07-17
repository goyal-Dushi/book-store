import { createContext, useReducer } from 'react';

const initialState = {
  show: false,
  msg: '',
  type: '',
};

function alertReducer(state = initialState, action) {
  switch (action.type) {
    case 'warning':
      return {
        ...state,
        type: action.type,
        show: true,
      };
    case 'danger':
      return {
        ...state,
        type: action.type,
        show: true,
      };
    default:
      return initialState;
  }
}

export const AlertContext = createContext(initialState);

function AlertContextWrapper(props) {
  const [state, dispatchAlert] = useReducer(alertReducer, initialState);

  return (
    <AlertContext.Provider value={{ state, dispatchAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
}

export default AlertContextWrapper;
