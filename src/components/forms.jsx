import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Container,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AlertContext } from "./contexts/alertContext";
import { UserDetailsContext } from "./contexts/userContext";

const initialState = {
  name: "",
  email: "",
  address: "",
  password: "",
  isSeller: false,
};

function UserForms(props) {
  const [userDetail, setUserDetail] = useState(initialState);
  const history = useHistory();

  const { setAlertState } = useContext(AlertContext);
  const { setUserData } = useContext(UserDetailsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    if (props?.type === "register") {
      res = await axios
        .post("http://localhost:5000/users/register", userDetail, {
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((err) => {
          console.log("Error Registration:", err);
        });
    } else {
      const loginDetail = {
        username: userDetail.name,
        password: userDetail.password,
      };
      res = await axios
        .post("http://localhost:5000/users/login", loginDetail, {
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((err) => {
          console.log("Error Logging in:", err);
        });
    }
    console.log("login detail: ", res);
    setUserDetail(initialState);
    if (res?.status) {
      setAlertState({ show: true, type: "success", msg: res?.msg });
      setUserData(res?.data);
      history.push("/profile");
    } else {
      setAlertState({ show: true, type: "danger", msg: res?.msg });
    }
    return;
  };

  return (
    <>
      <h3 className={"display-4 mb-3"}> {props.heading} </h3>
      <Container fluid={"sm"} className={"p-2"}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          {props.type === "register" ? (
            <>
              <FormGroup className={"mb-3"}>
                <FormLabel>{"Email"}</FormLabel>
                <FormControl
                  type={"email"}
                  value={userDetail?.email}
                  onChange={(e) =>
                    setUserDetail({ ...userDetail, email: e.target.value })
                  }
                  required
                  placeholder={"Enter Your Email"}
                />
              </FormGroup>
              <FormGroup className={"mb-3"}>
                <FormLabel>{"Address"}</FormLabel>
                <FormControl
                  value={userDetail?.address}
                  onChange={(e) =>
                    setUserDetail({ ...userDetail, address: e.target.value })
                  }
                  required
                  placeholder={"Enter Your Address"}
                />
              </FormGroup>
              <FormGroup className={"mb-3"}>
                <select
                  className={"form-select"}
                  onChange={(e) =>
                    e.target.value === "seller"
                      ? setUserDetail({ ...userDetail, isSeller: true })
                      : setUserDetail({ ...userDetail, isSeller: false })
                  }>
                  <option selected value={"buyer"}>
                    {"User"}
                  </option>
                  <option value={"seller"}> {"Seller"} </option>
                </select>
              </FormGroup>
            </>
          ) : null}
          <FormGroup className={"mb-3"}>
            <FormLabel>{"Username"}</FormLabel>
            <FormControl
              value={userDetail?.name}
              onChange={(e) =>
                setUserDetail({ ...userDetail, name: e.target.value })
              }
              required
              placeholder={"Enter Name"}
            />
          </FormGroup>
          <FormGroup className={"mb-3"}>
            <FormLabel>{"Password"}</FormLabel>
            <FormControl
              required
              value={userDetail?.password}
              onChange={(e) =>
                setUserDetail({ ...userDetail, password: e.target.value })
              }
              type={"password"}
              placeholder={"Enter Password"}
            />
          </FormGroup>
          <Button type={"submit"} variant={"outline-primary"}>
            {props.type === "register" ? "Register" : "Login"}
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default UserForms;
