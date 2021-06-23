import React, { useState } from "react";
import styles from "./style/Landing.module.css";
import logo from "./style/total data logo.webp";

import { Link } from "react-router-dom";
import SideBar from "./MobileNav/SideBar";
const Nav = ({ path }) => {
  //   console.log(path);
  const [navToggle,setNavToggle] = useState(false)
  return (
    <section>
      <header className={styles.header}>
        <div className={"container " + styles.container}>
          <div className='brand-logo'>
          <a href="https://totaldatalimited.com">
            <img src={logo} alt="logo" />
          </a>
          <div className='menu-ba'>
          <span className='d-lg-none' onClick={()=>setNavToggle(!navToggle)}><i className='fa fa-bars' style={{fontSize:'18px'}}></i></span>
          </div>
          </div>
          <ul className={styles.ul}>
            <li className={path === "/" ? "active" : ""}>
              <Link to="/">Tax Card</Link>
            </li>
            <li className={path === "/pension" ? "active" : ""}>
              <Link to="/pension">Pension Update</Link>
            </li>
            <li className={path === "/nhf" ? "active" : ""}>
              <Link to="/nhf">NHF Update</Link>
            </li>
            <li className={path === "/commitment" ? "active" : ""} >
              <Link to="/commitment">Employee Handbook Commitment Form</Link>
            </li>
          </ul>
        </div>
      </header>
      <SideBar navToggle={navToggle} setNavToggle={setNavToggle} />
    </section>
  );
};

export default Nav;
