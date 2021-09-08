import { useContext } from "react";
import { Container } from "react-bootstrap";
import { AlertContext } from "./contexts/alertContext";

function Alert() {
  const { alertState, setAlertState } = useContext(AlertContext);
  return (
    <Container fluid={"md"} style={{ height: "50px" }}>
      {alertState.show ? (
        <div
          onClick={() => setAlertState({ show: false, msg: "", type: "" })}
          className={`alert alert-${alertState.type}`}>
          {alertState.msg}
        </div>
      ) : null}
    </Container>
  );
}

export default Alert;
