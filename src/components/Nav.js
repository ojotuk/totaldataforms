import React from "react";
import styles from "./style/Landing.module.css";
import logo from "./style/total data logo.webp";

import { Link } from "react-router-dom";
const Nav = ({ path }) => {
  //   console.log(path);
  return (
    <section>
      <header className={styles.header}>
        <div className={"container " + styles.container}>
          <a href="https://totaldatalimited.com">
            <img src={logo} alt="logo" />
          </a>
          <ul>
            <li className={path === "/" ? "active" : ""}>
              <Link to="/">Tax Card</Link>
            </li>
            <li className={path === "/pension" ? "active" : ""}>
              <Link to="/pension">Pension Update</Link>
            </li>
            <li className={path === "/nhf" ? "active" : ""}>
              <Link to="/nhf">NHF Update</Link>
            </li>
          </ul>
        </div>
      </header>
    </section>
  );
};

export default Nav;
