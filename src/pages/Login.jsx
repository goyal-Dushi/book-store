import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Container,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserAPI } from "../api";
import { useContext, useState } from "react";
import { AlertContext } from "../contexts";
import { UserUtil } from "../utils";

function Login() {
  const history = useHistory();
  const [userDetail, setUserDetail] = useState({
    username: '',
    password: '',
  });
  const { dispatchAlert } = useContext(AlertContext);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await UserAPI.login(userDetail);
      
      const user = new UserUtil();
      user.saveDataToLs(response.data);
      dispatchAlert({ show: true, type: "success", msg: response.msg });
      history.push("/profile");
    } catch (err) {
      console.error('Error in login: ', err);
      dispatchAlert({ show: true, type: "danger", msg: err.msg || err });
    }
  }

  return (
    <>
      <h3 className={"display-4 mb-3"}> Login Form </h3>
      <Container fluid={"sm"} className={"p-2"}>
        <Form onSubmit={handleSubmit}>
          <FormGroup className={"mb-3"}>
            <FormLabel>Username</FormLabel>
            <FormControl
              value={userDetail.username}
              onChange={(e) =>
                setUserDetail({ ...userDetail, username: e.target.value })
              }
              required
              placeholder={"Enter Name"}
            />
          </FormGroup>
          <FormGroup className={"mb-3"}>
            <FormLabel>Password</FormLabel>
            <FormControl
              required
              value={userDetail.password}
              onChange={(e) =>
                setUserDetail({ ...userDetail, password: e.target.value })
              }
              type={"password"}
              placeholder={"Enter Password"}
            />
          </FormGroup>
          <Button type={"submit"} variant={"outline-primary"}>
            Login
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default Login;
