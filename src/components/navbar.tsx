import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import useAlert from "@hooks/useAlert";
import React from "react";

interface AppNavbarProps {}

const AppNavbar: React.FC<AppNavbarProps> = () => {
  const navigate = useNavigate();
  const { addAlert } = useAlert();

  const handleLogout = async () => {
    const res = await axios
      .get("http://localhost:5000/users/logout", { withCredentials: true })
      .then((res) => res.data)
      .catch((err) => {
        console.log("Error logging out: ", err);
      });
    addAlert("warning", res?.msg);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-brand">
          <NavLink
            style={{ textDecoration: "none", color: "inherit" }}
            to={"/"}
          >
            {"BookStore"}
          </NavLink>
        </div>
        <div className="d-flex">
          
            <>
              <div className="nav-item">
                <button
                  onClick={() => handleLogout()}
                  className="btn btn-outline-warning"
                >
                  {"Logout"}
                </button>
              </div>
              <div className="nav-item">
                <Link to={"/profile"} style={{ textDecoration: "none" }}>
                  <button className="btn btn-outline-primary">{"Profile"}</button>
                </Link>
              </div>
            </>
            <>
              <div className="nav-item">
                <Link to={"/login"} style={{ textDecoration: "none" }}>
                  <span className="nav-link">{"Login"}</span>
                </Link>
              </div>
              <div className="nav-item">
                <Link to={"/register"} style={{ textDecoration: "none" }}>
                  <span className="nav-link">{"Register"}</span>
                </Link>
              </div>
            </>
          </div>
      </div>
    </nav>
  );
}

export default AppNavbar;
