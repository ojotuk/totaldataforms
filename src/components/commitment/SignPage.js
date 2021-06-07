import React, { useEffect, useRef, useState,useContext } from "react";
import styles from "../style/Landing.module.css";
// import logo from "./style/total data logo.webp";
import axios from "axios";
import Notification from "../Notification";
import Loader from "../Loader";
import Nav from "../Nav";
import { fromBottom } from "../Animate";
import {GlobalContext} from '../../GlobalStore/GlobalProvider'
import SignatureManager from "./SignatureManager";

// 
const Landing = () => {
  // const path = match.path;
  const {user,ChangeTab,userInfoEditHandler} = useContext(GlobalContext);

  let main = useRef(null);
  useEffect(() => {
    fromBottom(main.current);
  }, []);
  const [inputs, setInput] = useState({...user});
  const [notificationMsg, setNotifyMsg] = useState({
    msg: "",
    state: false,
    type: "",
  });
  const [state, setState] = useState(false);
  const handleChange = (e) => {
    inputs[e.target.name]=e.target.value
        setInput({ ...inputs });
    }
  const handleSubmit = () => {
   userInfoEditHandler({...inputs})
   ChangeTab(1)
  };
  return (
    <section>
      <main className={styles.main} ref={main}>
        <div className={"container"}>
          <div className={styles.title + " text-center"}>
            <h1>Total Data Employee Commitment Form</h1>
            <p>Please sign using the space provided</p>
          </div>
          <div className={styles.formArea}>
            <div className={styles.content}>
              <div className={styles.form}>
              <label className='text-dark'>Fullname</label>
              <div className={styles.item}>
                  <i className={"fa fa-user"}></i>
                  <input
                    type="text"
                    placeholder="Fullname (surname first)"
                    value={inputs["Fullname"]}
                    onChange={(e) => handleChange(e)}
                    maxLength={100}
                    name="Fullname"
                    readOnly
                  />
                </div>
                <label className='text-dark'>Address</label>
                <div className={styles.item}>
                  <i className={"fa fa-building"}></i>
                  <input
                    type="text"
                    placeholder="Address"
                    value={inputs["Address"]}
                    onChange={(e) => handleChange(e)}
                    maxLength={100}
                    name="Address"
                    readOnly
                  />
                </div>
                <label className='text-dark'>Employment Date</label>
                <div className={styles.item}>
                  <i className={"fa fa-calendar"}></i>
                  <input
                    type="date"
                    placeholder="Employment Date"
                    value={inputs["Date of Employment"]}
                    onChange={(e) => handleChange(e)}
                    name="Date of Employment"
                    readOnly
                  />
                </div>
                <label className='text-dark'>Position</label>
                <div className={styles.item}>
                  <i className={"fa fa-id-card-o"}></i>
                  <input
                    type="text"
                    placeholder="Position"
                    value={inputs["Position"]}
                    onChange={(e) => handleChange(e)}
                    maxLength={50}
                    name="Position"
                    readOnly
                  />
                </div>
                <label className='text-dark'>Phone Number</label>
                <div className={styles.item}>
                  <i className={"fa fa-phone"}></i>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={inputs["Phone Number"]}
                    onChange={(e) => {
                      if(isNaN(Number(e.target.value))){ return}
                     else { handleChange(e)}
                    }}
                    readOnly
                    name="Phone Number"
                  />
                </div>
                <SignatureManager />
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
