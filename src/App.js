import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import BookList from "./pages/BookList";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";

function App() {
  return (
    <Container fluid={"md"}>
      <Router>
        <Switch>
          <Route path={"/"} exact component={Home} />
          <Route path={"/login"} exact component={Login} />
          <Route path={"/register"} exact component={RegisterPage} />
          <Route path={"/profile/:id"} component={UserProfile} />
          <Route path={"/booklist/:id"} component={BookList} />
          <Route path={"/cartCheckout/:id"} component={Checkout} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
