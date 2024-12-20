import Cookies from 'js-cookie';
import { Route, useHistory } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const { path, exact, component } = props;
  const history = useHistory();

  if (!Cookies.get('token')) {
    history.push('/login');
    return null;
  }

  return <Route path={path} exact={exact || false} component={component} />;
};

export default ProtectedRoute;
