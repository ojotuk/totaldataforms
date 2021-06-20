import React, { createContext, useReducer } from "react";
import AppReducer from "./Reducer";
import axios from 'axios'
import {host} from './../hostEndpoint'

// token
const token = sessionStorage.getItem("auth-token");

//initial state
let initialState = {
  islogged: token ? true : false,
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
  "commitment-forms":[]
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

  const getApplications = async (data)=>{
    const response = await axios.get(`${host}/widecat/get/${data.q}`,{
      headers: { "auth-token": token },
    });
    dispatch({
      type:"APPLICATION-FORMS",
      payload:{data:response.data.all,field:data.q}
    })
  // console.log(response.data)
  }

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
        tab:state.tab,
        getData:getApplications,
  "commitment-forms":state["commitment-forms"]

      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
