import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import { AlertContext } from "./contexts/alertContext";
import { useContext, memo } from "react";
import { UserDetailsContext } from "./contexts/userContext";

function AppNavbar() {
  const history = useHistory();
  const { setAlertState } = useContext(AlertContext);
  const { setUserData, userData } = useContext(UserDetailsContext);
  console.log("navbar userData: ", userData);
  const handleLogout = async () => {
    const res = await axios
      .get("http://localhost:5000/users/logout", { withCredentials: true })
      .then((res) => res.data)
      .catch((err) => {
        console.log("Error logging out: ", err);
      });
    console.log(res);
    setAlertState({ show: true, msg: res?.msg, type: "warning" });
    setUserData({});
    history.push("/");
  };

  return (
    <Navbar bg='light' variant='light'>
      <Container>
        <Navbar.Brand>
          <NavLink
            style={{ textDecoration: "none", color: "inherit" }}
            to={"/"}>
            {"BookStore"}
          </NavLink>
        </Navbar.Brand>
        <Nav>
          {userData?._id ? (
            <>
              <Nav.Link>
                <Button
                  onClick={() => handleLogout()}
                  variant={"outline-warning"}>
                  {"Logout"}
                </Button>
              </Nav.Link>
              <Nav.Link>
                <Link to={"/profile"} style={{ textDecoration: "none" }}>
                  <Button variant={"outline-primary"}>{"Profile"}</Button>
                </Link>
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link>
                <Link to={"/login"} style={{ textDecoration: "none" }}>
                  {"Login"}
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to={"/register"} style={{ textDecoration: "none" }}>
                  <Nav.Item> {"Register"} </Nav.Item>
                </Link>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default memo(AppNavbar);
