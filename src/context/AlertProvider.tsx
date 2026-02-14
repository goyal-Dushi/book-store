import React, { useState, useRef, useEffect } from 'react';
import { AlertContext, AlertsI, AlertT } from './alertContext';

interface AlertStateI extends AlertsI {}

interface AlertProviderI {
  children: React.ReactNode;
}

const AlertProvider: React.FC<AlertProviderI> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertStateI[]>([]);
  const timeoutRefArr = useRef<number[]>([]);

  const removeAlert = (id: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const addAlert = (type = 'info', message: string, duration = 3000) => {
    const id = Date.now();
    setAlerts((prev) => {
      return [...prev, { id, message, type: type as AlertT }];
    });
    
    if (duration) {
      const timeout = setTimeout(() => removeAlert(id), duration);
      timeoutRefArr.current.push(timeout);
    }
  };

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeoutRefArr.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  const values = { alerts, addAlert, removeAlert };

  return(
    <AlertContext value={values}>
      {children}
    </AlertContext>
  );
};

export default AlertProvider;
