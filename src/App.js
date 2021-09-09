import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import BookList from "./pages/BookList";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Alert from "./components/alert";
import AlertContextBox from "./components/contexts/alertContext";
import AppNavbar from "./components/navbar";
import { UserDetailsContext } from "./components/contexts/userContext";
import { useContext } from "react";

function App() {
  const { userData } = useContext(UserDetailsContext);
  return (
    <>
      <AlertContextBox>
        <Router>
          <AppNavbar />
          <Container fluid={"md"}>
            <Alert />
            <Switch>
              <Route path={"/"} exact component={Home} />
              {userData?._id ? (
                <>
                  <Route path={"/profile"} component={UserProfile} />
                  <Route path={"/booklist"} component={BookList} />
                  <Route path={"/cartCheckout"} component={Checkout} />
                </>
              ) : (
                <>
                  <Route path={"/login"} exact component={Login} />
                  <Route path={"/register"} exact component={RegisterPage} />
                </>
              )}
            </Switch>
          </Container>
        </Router>
      </AlertContextBox>
    </>
  );
}

export default App;
