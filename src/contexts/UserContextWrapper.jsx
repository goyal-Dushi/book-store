import { createContext, useReducer } from 'react';

const initialState = {
  name: '',
  address: '',
  _id: '',
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'update':
      if (!action.data) {
        return state;
      }

      return {
        ...state,
        ...action.data,
      };
    case 'delete':
      return initialState;
    default:
      return {
        ...initialState,
      };
  }
}

export const UserDetailsContext = createContext({
  userState: initialState,
  updateUserDetails: () => {},
});

function UserContextWrapper(props) {
  const [userState, updateUserDetails] = useReducer(userReducer, initialState);

  return (
    <UserDetailsContext.Provider value={{ userState, updateUserDetails }}>
      {props.children}
    </UserDetailsContext.Provider>
  );
}

export default UserContextWrapper;
