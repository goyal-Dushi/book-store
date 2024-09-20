import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { AlertContext, UserDetailsContext } from '../../contexts';
import { useContext, memo } from 'react';
import { UserAPI } from '../../api';
import { UserUtil } from '../../utils';

function AppNavbar() {
  const history = useHistory();
  const { alertSuccess, alertWarning } = useContext(AlertContext);
  const { userState, updateUserDetails } = useContext(UserDetailsContext);
  const user = new UserUtil();

  const handleLogout = async () => {
    try {
      const response = await UserAPI.logout(userState);

      alertSuccess(response.message);
      updateUserDetails({ type: 'delete' });
      user.removeDataFromLs();
      history.push('/login');
    } catch (err) {
      alertWarning(err.message);
    }
  };

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>
          <NavLink className="text-decoration-none" to={'/'}>
            BookStore
          </NavLink>
        </Navbar.Brand>
        <Nav>
          {userState?._id ? (
            <>
              <Nav.Link>
                <Button onClick={handleLogout} variant={'outline-warning'}>
                  Logout
                </Button>
              </Nav.Link>
              <Nav.Link>
                <Link to={'/profile'} className="text-decoration-none">
                  <Button variant={'outline-primary'}>Profile</Button>
                </Link>
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link>
                <Link to={'/login'} className="text-decoration-none">
                  Login
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to={'/register'} className="text-decoration-none">
                  <Nav.Item> Register </Nav.Item>
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
