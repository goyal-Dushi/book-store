import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAlert from '../hooks/useAlert';

const FORM_INIT_STATE = {
  name: "",
  email: "",
  address: "",
  password: "",
  isSeller: false,
};

interface UserFormsI {}

const UserForms: React.FC<UserFormsI> = () => {
  const [userDetail, setUserDetail] = useState(FORM_INIT_STATE);
  const navigate = useNavigate();
  const { addAlert } = useAlert();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios
        .post("http://localhost:5000/users/register", userDetail, {
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((err) => {
          console.log("Error Registration:", err);
        });

    setUserDetail(FORM_INIT_STATE);
    if (res?.status) {
      addAlert("success", res?.msg);
      navigate("/login");
    } else {
      addAlert("danger", res?.msg);
    }
    return;
  };

  return (
    <>
      <h3 className="display-4 mb-3"> Sign Up </h3>
      <div className="container-sm p-2">
        <form onSubmit={(e) => handleSubmit(e)}>
            <>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={userDetail?.email}
                  onChange={(e) =>
                    setUserDetail({ ...userDetail, email: e.target.value })
                  }
                  required
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  className="form-control"
                  value={userDetail?.address}
                  onChange={(e) =>
                    setUserDetail({ ...userDetail, address: e.target.value })
                  }
                  required
                  placeholder="Enter Your Address"
                />
              </div>
              <div className="mb-3">
                <select
                  className="form-select"
                  onChange={(e) =>
                    e.target.value === "seller"
                      ? setUserDetail({ ...userDetail, isSeller: true })
                      : setUserDetail({ ...userDetail, isSeller: false })
                  }
                >
                  <option selected value="buyer">
                    User
                  </option>
                  <option value="seller">Seller</option>
                </select>
              </div>
            </>
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
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default UserForms;
