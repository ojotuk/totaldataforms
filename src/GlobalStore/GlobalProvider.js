import React, { createContext, useReducer } from "react";
import AppReducer from "./Reducer";

let logState;
if (typeof window !== "undefined") {
  logState = sessionStorage.getItem("logged");
}
// console.log(logState);
//initial state
let initialState = {
  islogged: logState,
  user: {
    "Fullname": "",
    "Phone Number": "",
    "Address": "",
    "Position": "",
    "Date of Employment": "",
    "Signature": ""
  },
  tab: 0,
  notificationMsg: {
    state: false,
    code: 0,
    type: "",
    msg: "",
  },
};

//globalContext
export const GlobalContext = createContext(initialState);
//global provider component
export const GlobalProvider = ({ children }) => {
  //actions
  const logOut = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  const userInfo = (data) => {
    // console.log(data);
    dispatch({
      type: "USER-INFO",
      payload: data,
    });
  };
  const userInfoEditHandler = (data) => {
    dispatch({
      type: "USER-INFO-EDITOR",
      payload: data,
    });
  };
  const ChangeTab = (data) => {
    dispatch({
      type: "CHANGE-TAB",
      payload: data,
    });
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        islogged: state.islogged,
        user: state.user,
        logOut: logOut,
        userInfo: userInfo,
        userInfoEditHandler: userInfoEditHandler,
        notificationMsg: state.notificationMsg,
        ChangeTab: ChangeTab,
        tab:state.tab
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
