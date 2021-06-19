import React, { useContext } from "react";

import Nav from "../Nav";
// import { fromBottom } from "../Animate";
import Form from "./Form"
import Book from "./pdf/Index"
import {GlobalContext} from './../../GlobalStore/GlobalProvider'
import Commitment from "./SignPage";

// 
const Index = ({ match }) => {
  const path = match.path;
    const {tab} = useContext(GlobalContext);
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
