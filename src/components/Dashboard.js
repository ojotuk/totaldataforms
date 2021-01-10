import React, { useState } from "react";
import ExportCSV from "./ExcelDownloader";
import styles from "./style/Landing.module.css";
import logo from "./style/total data logo.webp";
import axios from "axios";
import Notification from "./Notification";
import Loader from "./Loader";
import { Link } from "react-router-dom";
const Dashboard = ({ setIslogged }) => {
  const [data, setData] = useState(null);
  const [notificationMsg, setNotifyMsg] = useState({
    msg: "",
    state: false,
    type: "",
  });
  const [state, setState] = useState(false);
  const today = new Date().toLocaleDateString();
  const fileName = `Tax Card Updates ${today}`;
  const token = sessionStorage.getItem("auth-token");
  const requesthandler = () => {
    setState(true);
    setData(null);
    axios
      .get("https://total-data-feeds.herokuapp.com/widecat/get", {
        headers: { "auth-token": token },
      })
      .then((response) => {
        if (response.data.status === 200) {
          setState(false);
          if (response.data.doc.lenght === 0)
            return setNotifyMsg({
              state: true,
              msg: "Submission is empty at this time",
              type: "Error",
            });
          setData(response.data.doc);
        }
        // console.log(response);
      })
      .catch(() => {
        setState(false);
        setNotifyMsg({
          state: true,
          msg: "Error occured",
          type: "Error",
        });
      });
  };
  const logOut = () => {
    sessionStorage.clear();
    setIslogged(false);
  };
  return (
    <div className={styles.admin}>
      <header className={styles.header}>
        <div className={"container " + styles.container}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>

          <button onClick={logOut}>LogOut</button>
        </div>
      </header>
      <section className={styles.downloadArea}>
        <button
          className={"btn"}
          className={styles.requestBtn}
          onClick={requesthandler}
        >
          Request Data
        </button>
        {data ? (
          <div className={styles.downloadBtn}>
            <ExportCSV csvData={data} fileName={fileName}></ExportCSV>
          </div>
        ) : (
          ""
        )}
      </section>
      <Notification
        notificationMsg={notificationMsg}
        setNotify={setNotifyMsg}
      />
      <Loader state={state} />
    </div>
  );
};

export default Dashboard;
