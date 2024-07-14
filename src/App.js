import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import BookList from "./pages/BookList";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import ProtectedRoute from './routes/ProtectedRoute';
import Alert from "./components/AppAlert";
import AppNavbar from "./components/navbar";
import AlertContextWrapper from "./contexts/AlertContextWrapper";
import UserContextWrapper from "./contexts/UserContextWrapper";

function App() {
  return (
    <>
    <UserContextWrapper>
      <AlertContextWrapper>
        <Router>
          <AppNavbar />
          <Container fluid={"md"}>
            <Alert />
            <Switch>
              <Route path={"/"} exact component={Home} />
              <ProtectedRoute path={"/profile"} component={UserProfile} />
              <ProtectedRoute path={"/booklist"} component={BookList} />
              <ProtectedRoute path={"/cartCheckout"} component={Checkout} />
              <Route path={"/login"} exact component={Login} />
              <Route path={"/register"} exact component={RegisterPage} />
            </Switch>
          </Container>
        </Router>
      </AlertContextWrapper>
      </UserContextWrapper>
    </>
  );
}

export default App;
