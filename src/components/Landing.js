import React, { useState } from "react";
import styles from "./style/Landing.module.css";
import logo from "./style/total data logo.webp";
import axios from "axios";
import Notification from "./Notification";
import Loader from "./Loader";
const Landing = () => {
  const [inputs, setInput] = useState({
    taxNo: "",
    fullName: "",
    phone: "",
    email: "",
    payerId: "",
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
      case "phone":
        if (isNaN(Number(e.target.value))) return null;
        setInput({ ...inputs, phone: e.target.value });
        break;
      case "email":
        setInput({ ...inputs, email: e.target.value });
        break;
      case "payerId":
        setInput({ ...inputs, payerId: e.target.value });
        break;

      default:
        break;
    }
  };
  const handleSubmit = () => {
    const data = {
      staffId: inputs.taxNo,
      fullName: inputs.fullName.trim(),
      email: inputs.email.trim(),
      phone: inputs.phone.trim(),
      taxPayerId: inputs.payerId.trim(),
    };
    if (!inputs.fullName || !inputs.email || !inputs.phone || !inputs.payerId)
      return setNotifyMsg({
        state: true,
        msg: "Please fill all required field",
        type: "Error",
      });

    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let result = inputs.email.match(reg);
    if (!result)
      return setNotifyMsg({
        state: true,
        msg: "Invalid Email",
        type: "Error",
      });
    setState(true);
    axios
      .post("https://total-data-feeds.herokuapp.com/feedback", data)
      .then((response) => {
        //   console.log(response);
        setState(false);
        if (response.data.status === 400) {
          setState(false);
          return setNotifyMsg({
            state: true,
            msg: "Record already exist",
            type: "Error",
          });
        }
        if (response.data.status === 200) {
          setState(false);
          setNotifyMsg({
            state: true,
            msg: "Update was successful, Thank you",
            type: "Success",
          });
          setInput({
            taxNo: "",
            fullName: "",
            phone: "",
            email: "",
            payerId: "",
          });
        } else {
          setNotifyMsg({
            state: true,
            msg: "Error occured",
            type: "Error",
          });
          setState(false);
        }
      })
      .catch((e) => {
        setNotifyMsg({
          state: true,
          msg: "Error occured",
          type: "Error",
        });
        setState(false);
      });
  };
  return (
    <section>
      <header className={styles.header}>
        <div className={"container"}>
          <a href="https://totaldatalimited.com">
            <img src={logo} alt="logo" />
          </a>
        </div>
      </header>
      <main className={styles.main}>
        <div className={"container"}>
          <div className={styles.title + " text-center"}>
            <h1>Total Data Employee Tax Card Update</h1>
            <p>Please fill the information below</p>
          </div>
          <div className={styles.formArea}>
            <div className={styles.content}>
              <div className={styles.form}>
                <div className={styles.download}>
                  <p>
                    No Tax Card ?{" "}
                    <a href="/">
                      <button>
                        <i className={"fa fa-download"}></i>Download Now
                      </button>
                    </a>
                  </p>
                </div>
                <div className={styles.item}>
                  <i className={"fa fa-id-card-o"}></i>
                  <input
                    type="text"
                    placeholder="Staff Id (optional)"
                    value={inputs.taxNo}
                    onChange={(e) => handleChange("taxNo", e)}
                    maxLength={30}
                  />
                </div>
                <div className={styles.item}>
                  <i className={"fa fa-user"}></i>
                  <input
                    type="text"
                    placeholder="Fullname (surname first)"
                    value={inputs.fullName}
                    onChange={(e) => handleChange("fullName", e)}
                    maxLength={100}
                  />
                </div>
                <div className={styles.item}>
                  <i className={"fa fa-phone"}></i>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={inputs.phone}
                    onChange={(e) => handleChange("phone", e)}
                    maxLength={12}
                  />
                </div>
                <div className={styles.item}>
                  <i className={"fa fa-at"}></i>
                  <input
                    type="email"
                    placeholder="Email"
                    value={inputs.email}
                    onChange={(e) => handleChange("email", e)}
                    maxLength={100}
                  />
                </div>
                <div className={styles.item}>
                  <i className={"fa fa-id-card-o"}></i>
                  <input
                    type="text"
                    placeholder="Payer Id (N-XXXXXXX)"
                    value={inputs.payerId}
                    onChange={(e) => handleChange("payerId", e)}
                    maxLength={10}
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