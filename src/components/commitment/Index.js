import React, { useEffect, useRef, useState,useContext } from "react";
import styles from "../style/Landing.module.css";
// import logo from "./style/total data logo.webp";
import axios from "axios";
import Notification from "../Notification";
import Loader from "../Loader";
import Nav from "../Nav";
import { fromBottom } from "../Animate";
import Form from "./Form"
import Book from "./pdf/Index"
import {GlobalContext} from './../../GlobalStore/GlobalProvider'
import Commitment from "./SignPage";

// 
const Index = ({ match }) => {
  const path = match.path;
    const {user,tab} = useContext(GlobalContext);
    const handleDisplay = ()=>{
        switch (tab) {
            case 0:
                return <Form />
            case 1:
                return <Book />
              case 2:
                return <Commitment />
        
            default:
                break;
        }
    }
  return (
    <>
    <Nav path={path} />
    <div>
    {handleDisplay()}
    </div>
    </>
  );
};

export default Index;
