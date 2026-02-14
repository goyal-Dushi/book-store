import { createContext } from "react";

export interface AlertsI {
    id: number;
    message: string;
    type: AlertT;
}

interface AlertContextI {
  alerts: AlertsI[];
  addAlert: (type: AlertT, message: string, duration?: number) => void;
  removeAlert: (id: number) => void;
}

export const AlertContext = createContext<AlertContextI>({
  alerts: [] as AlertsI[],
  addAlert: () => {},
  removeAlert: () => {},
});

export type AlertT = "success" | "info" | "warning" | "danger";