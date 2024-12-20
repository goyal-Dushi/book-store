import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import RegisterPage from './pages/Register';
import BookList from './pages/BookList';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import ProtectedRoute from './routes/ProtectedRoute';
import Alert from './components/AppAlert';
import AppNavbar from './components/layout/navbar';
import Profile from './pages/Profile';
import { useEffect, useContext } from 'react';
import { UserDetailsContext } from './contexts';
import { UserUtil } from './utils';

function App() {
  const { updateUserDetails } = useContext(UserDetailsContext);

  useEffect(() => {
    const user = new UserUtil();
    updateUserDetails({ type: 'update', data: user.getUserData() });
  }, []);

  return (
    <>
      <Router>
        <AppNavbar />
        <Container fluid={'md'}>
          <Alert />
          <Switch>
            <Route path={'/'} exact component={Home} />
            <ProtectedRoute path={'/profile'} component={Profile} />
            <ProtectedRoute path={'/booklist'} component={BookList} />
            <ProtectedRoute path={'/cartCheckout'} component={Checkout} />
            <Route path={'/login'} exact component={Login} />
            <Route path={'/register'} exact component={RegisterPage} />
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
