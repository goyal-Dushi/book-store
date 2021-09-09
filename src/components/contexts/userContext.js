import { createContext, useState } from "react";

export const UserDetailsContext = createContext();

function UserContext(props) {
  const [userData, setUserData] = useState({});
  return (
    <UserDetailsContext.Provider value={{ userData, setUserData }}>
      {props.children}
    </UserDetailsContext.Provider>
  );
}

export default UserContext;
