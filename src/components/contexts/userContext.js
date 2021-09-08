import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserDetailsContext = createContext();

function UserContext(props) {
  const [userData, setUserData] = useState({});
  const [uid, setUID] = useState("");
  console.log("uid of user: ", uid);
  useEffect(() => {
    const getUser = async () => {
      const info = await axios
        .get("http://localhost:5000/users/profile/" + uid, {
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((err) => {
          console.log("Error fetching user: ", err);
        });
      console.log("Usercontext info: ", info);
      setUserData(info?.data);
    };
    if (uid) {
      getUser();
    }
  }, [uid]);
  return (
    <UserDetailsContext.Provider value={{ userData, setUID, uid }}>
      {props.children}
    </UserDetailsContext.Provider>
  );
}

export default UserContext;
