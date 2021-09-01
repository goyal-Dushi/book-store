import axios from "axios";
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    console.log(userDetail);
    if (props?.type === "register") {
      res = await axios
        .post("http://localhost:5000/users/register", userDetail)
        .then((res) => res.data)
        .catch((err) => {
          console.log("Error Registration:", err);
        });
      console.log("Registration: ", res);
    } else {
      const loginDetail = {
        email: userDetail.email,
        password: userDetail.password,
      };
      res = await axios
        .post("http://localhost:5000/users/login", loginDetail)
        .then((res) => res.data)
        .catch((err) => {
          console.log("Error Registration:", err);
        });
      console.log("Login: ", res);
    }
    setUserDetail(initialState);
    if (res?.userID) {
      history.push("/profile/" + res?.userID);
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
                <FormLabel>{"Name"}</FormLabel>
                <FormControl
                  value={userDetail?.name}
                  onChange={(e) =>
                    setUserDetail({ ...userDetail, name: e.target.value })
                  }
                  required
                  placeholder={"Enter Your Name"}
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
            <FormLabel>{"Email ID"}</FormLabel>
            <FormControl
              value={userDetail?.email}
              onChange={(e) =>
                setUserDetail({ ...userDetail, email: e.target.value })
              }
              type={"email"}
              required
              placeholder={"Enter Email"}
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
