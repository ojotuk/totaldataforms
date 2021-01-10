import React, { useState } from "react";
import styles from "./style/Landing.module.css";
import logo from "./style/total data logo.webp";
import axios from "axios";
import Notification from "./Notification";
import Loader from "./Loader";
import { Link } from "react-router-dom";
const Landing = ({ setIslogged }) => {
  const [inputs, setInput] = useState({
    taxNo: "",
    fullName: "",
  });
  const [notificationMsg, setNotifyMsg] = useState({
    msg: "",
    state: false,
    type: "",
  });
  const [state, setState] = useState(false);
  const handleChange = (type, e) => {
    switch (type) {
      case "taxNo":
        setInput({ ...inputs, taxNo: e.target.value });
        break;
      case "fullName":
        setInput({ ...inputs, fullName: e.target.value });
        break;

      default:
        break;
    }
  };
  const handleSubmit = () => {
    const data = {
      password: inputs.taxNo,
      user: inputs.fullName.trim(),
    };
    if (!inputs.fullName || !inputs.taxNo)
      return setNotifyMsg({
        state: true,
        msg: "Please fill all required field",
        type: "Error",
      });
    setState(true);
    axios
      .post("https://total-data-feeds.herokuapp.com/widecat/login", data)
      .then((response) => {
        // console.log(response);
        setState(false);
        if (response.data.status === 200) {
          sessionStorage.setItem("auth-token", response.data.token);
          setState(false);
          setNotifyMsg({
            state: true,
            msg: "Logged In",
            type: "Success",
          });
          setInput({
            taxNo: "",
            fullName: "",
            phone: "",
            email: "",
            payerId: "",
          });
          setIslogged(true);
        } else {
          setNotifyMsg({
            state: true,
            msg: "Wrong password",
            type: "Error",
          });
          setState(false);
        }
      })
      .catch((e) => {
        setNotifyMsg({
          state: true,
          msg: "Wrong password",
          type: "Error",
        });
        setState(false);
      });
  };
  return (
    <section>
      <header className={styles.header}>
        <div className={"container"}>
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>
      </header>
      <main className={styles.main}>
        <div className={"container"}>
          <div className={styles.title + " text-center"}>
            <h1>Total Data Limited (Admin)</h1>
          </div>
          <div className={styles.formArea}>
            <div className={styles.content}>
              <div className={styles.form}>
                <div className={styles.item}>
                  <i className={"fa fa-id-card-o"}></i>
                  <input
                    type="text"
                    placeholder="Token"
                    value={inputs.taxNo}
                    onChange={(e) => handleChange("taxNo", e)}
                    maxLength={30}
                  />
                </div>
                <div className={styles.item}>
                  <i className={"fa fa-user"}></i>
                  <input
                    type="text"
                    placeholder="Username"
                    value={inputs.fullName}
                    onChange={(e) => handleChange("fullName", e)}
                    maxLength={100}
                  />
                </div>
                <div className={styles.item} onClick={handleSubmit}>
                  <i className={"fa fa-check"}></i>
                  <input type="submit" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Notification
        notificationMsg={notificationMsg}
        setNotify={setNotifyMsg}
      />
      <Loader state={state} />
    </section>
  );
};

export default Landing;
