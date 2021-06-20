import React, { useState } from "react";
import ExportCSV from "./ExcelDownloader";
import styles from "./style/Landing.module.css";
import logo from "./style/total data logo.webp";
import axios from "axios";
import Notification from "./Notification";
import Loader from "./Loader";
import { Link } from "react-router-dom";


const Dashboard = () => {
  const [data, setData] = useState(null);
  const [notificationMsg, setNotifyMsg] = useState({
    msg: "",
    state: false,
    type: "",
  });
  const [state, setState] = useState(false);
  const [action, setAction] = useState("none");

  const handleActionChange = (e) => {
    setData(null);
    setAction(e.target.value);
  };
  const today = new Date().toLocaleDateString();
  const fileName = `${action} Updates ${today}`;
  const token = sessionStorage.getItem("auth-token");
  const requesthandler = () => {
    setState(true);
    setData(null);
    axios
      .get("https://total-data-feeds.herokuapp.com/widecat/get/tax", {
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
  const requestPensionhandler = () => {
    setState(true);
    setData(null);
    axios
      .get("https://total-data-feeds.herokuapp.com/widecat/get/pension", {
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
  const requestNhfhandler = () => {
    setState(true);
    setData(null);
    axios
      .get("https://total-data-feeds.herokuapp.com/widecat/get/nhf", {
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
  const handleGetAction = () => {
    setData(null);
    switch (action) {
      case "tax-card":
        requesthandler();
        break;
      case "pension":
        requestPensionhandler();
        break;
      case "nhf":
        requestNhfhandler();
        break;
      default:
        break;
    }
  };
  const logOut = () => {
    sessionStorage.clear();
    window.location.href='/panel'
  };
  return (
    <div className={styles.admin}>
      <header className={styles.header}>
        <div className={"container " + styles.container}>
          <Link to="/">
            <img src={logo} alt="logo" width='100px'/>
          </Link>

          <button onClick={logOut}>LogOut</button>
        </div>
      </header>
      
      <section className={styles.downloadArea}>
        <div className='container'>
        <div className={styles.reques}>
          <Link to="/admin/applications?q=commitment-forms"><button>Commitment Form</button></Link>
        </div>
        </div>
      
        <select value={action} onChange={(e) => handleActionChange(e)}>
          <option value="none">Select a request</option>
          <option value="tax-card">Tax Card</option>
          <option value="pension">Pension</option>
          <option value="nhf">NHF</option>
        </select>
        {action === "tax-card" || action === "pension" || action === "nhf" ? (
          <button
            className={"btn " + styles.requestBtn}
            onClick={handleGetAction}
          >
            Request Data
          </button>
        ) : (
          ""
        )}
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
