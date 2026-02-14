import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAlert from "../hooks/useAlert";

const initialState = {
  name: "",
  email: "",
  address: "",
  password: "",
  isSeller: false,
};

interface UserFormsI {
}

const UserForms: React.FC<UserFormsI> = () => {
  const [userDetail, setUserDetail] = useState(initialState);
  const navigate = useNavigate();
  const { addAlert } = useAlert();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

      const loginDetail = {
        username: userDetail.name,
        password: userDetail.password,
      };
     const res = await axios
        .post("http://localhost:5000/users/login", loginDetail, {
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((err) => {
          console.log("Error Logging in:", err);
        });

    setUserDetail(initialState);
    if (res?.status) {
      addAlert("success", res?.msg);
        navigate("/profile");
    } else {
      addAlert("danger", res?.msg);
    }
    return;
  };

  return (
    <>
      <h3 className="display-4 mb-3"> Login </h3>
      <div className="container-sm p-2">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              value={userDetail?.name}
              onChange={(e) =>
                setUserDetail({ ...userDetail, name: e.target.value })
              }
              required
              placeholder="Enter Name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              required
              className="form-control"
              value={userDetail?.password}
              onChange={(e) =>
                setUserDetail({ ...userDetail, password: e.target.value })
              }
              type="password"
              placeholder="Enter Password"
            />
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default UserForms;
