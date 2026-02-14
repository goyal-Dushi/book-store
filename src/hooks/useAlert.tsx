import { useContext } from "react";
import { AlertContext } from "../context/alertContext";

const useAlert = () => {
  return useContext(AlertContext);
};

export default useAlert