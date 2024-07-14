import { createContext, useReducer } from "react";

const initialState = {
  name: "",
  address: "",
  _id: ""
}

function userReducer(state=initialState, action){
  switch(action.type){
    case "update":
      return {
        ...state,
        ...action.data,
      }
    default: 
      return {
        ...initialState,
      }
  }
}

export const UserDetailsContext = createContext();

function UserContextWrapper(props) {
  const [userState, dispatchUserDetails] = useReducer(userReducer, initialState);

  return (
    <UserDetailsContext.Provider value={{ userState, dispatchUserDetails }}>
      {props.children}
    </UserDetailsContext.Provider>
  );
}

export default UserContextWrapper;
