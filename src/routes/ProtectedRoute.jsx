import Cookies from "js-cookie";
import { Route, useHistory } from "react-router-dom";

const ProtectedRoute = (props) => {
    const { path, exact } = props;
    const history = useHistory();

    if(!Cookies.get('token')){
        history.push('/login');
    }

    return(
        <Route path={path} exact={exact || false} component={props.children} />
    )
}

export default ProtectedRoute;