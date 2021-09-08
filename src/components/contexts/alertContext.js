import { createContext, useState } from "react";

export const AlertContext = createContext();
function AlertContextBox(props) {
  const [alertState, setAlertState] = useState({
    show: false,
    msg: "",
    type: "",
  });
  return (
    <AlertContext.Provider value={{ alertState, setAlertState }}>
      {props.children}
    </AlertContext.Provider>
  );
}

export default AlertContextBox;
