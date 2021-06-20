import React, { useEffect, useContext } from "react";
import {Link} from 'react-router-dom'
import { useQueryParam } from "use-query-param";
import {
  GlobalContext,
} from "./../../../GlobalStore/GlobalProvider";

import Commitment from "./commitment/Index"
import logo from './../../style/total data logo.webp'
import styles from './../../style/Landing.module.css'


export default function Index() {
  const { queryParams } = useQueryParam(window.location.href);

  const { getData } = useContext(GlobalContext);

  const handleDisplay = ()=>{
      switch (queryParams.q) {
          case "commitment-forms":
              return <Commitment />;
          default:
              return <div>not found</div>;
      }
  }
  // getData({q:queryParams.q})
  // console.log(queryParams)

  useEffect(() => {
    getData({ q: queryParams.q });
  }, [getData,queryParams.q]);
  const logOut = () => {
    sessionStorage.clear();
    // setIslogged(false);
    window.location.href='/admin'
  };
  return (<div className={styles.admin}>
        <header className={styles.header}>
        <div className={"container " + styles.container}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <button onClick={logOut}>LogOut</button>
        </div>
      </header>
      <div className='container'>
      {handleDisplay()}
      </div>
      </div>);
}
