import React, { useEffect, useRef, useState,useContext } from "react";
import styles from "../style/Landing.module.css";
import { fromBottom } from "../Animate";
import {GlobalContext} from './../../GlobalStore/GlobalProvider'

// 
const Landing = () => {
  // const path = match.path;
  const {user,ChangeTab,userInfoEditHandler} = useContext(GlobalContext);

  let main = useRef(null);
  useEffect(() => {
    fromBottom(main.current);
  }, []);
  const [inputs, setInput] = useState({...user});
 
  // const [disabled,setDisabled] = useState(true);
  const handleDisabled = ()=>{
    if(
      !inputs["Fullname"]||
      !inputs["Date of Employment"]||
      !inputs["Phone Number"]||
      !inputs["Position"]||
      !inputs["Address"]
      ){
      return true
    }else{
      return false
    }
  }
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
            <p>Please fill the information below</p>
          </div>
          <div className={styles.formArea}>
            <div className={styles.content}>
              <div className={styles.form}>
                <div className={styles.item}>
                  <i className={"fa fa-user"}></i>
                  <input
                    type="text"
                    placeholder="Fullname (surname first)"
                    value={inputs["Fullname"]}
                    onChange={(e) => handleChange(e)}
                    maxLength={100}
                    name="Fullname"
                  />
                </div>
                <div className={styles.item}>
                  <i className={"fa fa-building"}></i>
                  <input
                    type="text"
                    placeholder="Address"
                    value={inputs["Address"]}
                    onChange={(e) => handleChange(e)}
                    maxLength={100}
                    name="Address"
                  />
                </div>
                <div className={styles.item}>
                  <i className={"fa fa-calendar"}></i>
                  <input
                    type="date"
                    placeholder="Employment Date"
                    value={inputs["Date of Employment"]}
                    onChange={(e) => handleChange(e)}
                    name="Date of Employment"
                  />
                </div>
                <div className={styles.item}>
                  <i className={"fa fa-id-card-o"}></i>
                  <input
                    type="text"
                    placeholder="Position"
                    value={inputs["Position"]}
                    onChange={(e) => handleChange(e)}
                    maxLength={50}
                    name="Position"
                  />
                </div>
                <div className={styles.item}>
                  <i className={"fa fa-phone"}></i>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={inputs["Phone Number"]}
                    onChange={(e) => {
                      if(isNaN(Number(e.target.value)) || e.target.value.length > 11){ return}
                     else { handleChange(e)}
                    }}
                    
                    // maxLength={30}
                    name="Phone Number"
                  />
                </div>
                <div className={styles.item} 
                // onClick={handleSubmit}
                onClick={()=>handleSubmit()}
                >
                  <i className={"fa fa-check"}></i>
                  <input type="submit" value="Proceed" disabled={handleDisabled()} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
   
    </section>
  );
};

export default Landing;
