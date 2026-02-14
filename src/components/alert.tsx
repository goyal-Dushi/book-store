import useAlert from "@hooks/useAlert";

function Alert() {
  const { alerts, removeAlert } = useAlert();
  
  return (
    <div className="container-fluid" style={{ height: "50px" }}>
     {alerts.map((alert) => {
        return (
          <div
            key={alert.id}
            onClick={() => removeAlert(alert.id)}
            className={`alert alert-${alert.type}`}>
            {alert.message}
          </div>
        );
      }      
     )}
    </div>
  );
}

export default Alert;
