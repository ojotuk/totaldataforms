import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { host } from "./../../../../hostEndpoint";
import styles from "./../../../style/Landing.module.css";
import { Link } from "react-router-dom";
import logo from "./../../../../components/style/total data logo.webp";

export default function Profile() {
  const params = useParams();
  const [user, setUser] = useState({});
  // token
  const token = sessionStorage.getItem("auth-token");
  useEffect(() => {
    //   console.log(token)
    axios
      .get(`${host}/widecat/get/commitment/application/${params.profile}`, {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => {
        //   console.log(res)
        if (res.data.code === 201) {
          setUser({ ...res.data.user });
          return;
        }
      })
      .catch((e) => {
        console.log(e);
        alert("contact app developer");
        return;
      });
  }, [params.profile, token]);
  const logOut = () => {
    sessionStorage.clear();
    // setIslogged(false);
    window.location.href = "/panel";
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
      <div className="container">
        <Link to="/admin/applications?q=commitment-forms">
          <button className="btn btn-outline">View All</button>
        </Link>
        <form className="mt-4">
          <table border className="table table-border">
            <thead className="thead">
              <h5 className="mb-4">Commitment Form</h5>
            </thead>
            <tbody>
              <tr>
                <td>Fullname</td>
                <td>{user.Fullname}</td>
              </tr>
              <tr>
                <td>Position</td>
                <td>{user.Position}</td>
              </tr>
              <tr>
                <td>Date of Employment (yyyy/mm/dd)</td>
                <td>{user["Date of Employment"]}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{user.Address}</td>
              </tr>
              <tr>
                <td>Signature</td>
                <td>
                  <img src={user.Signature} alt="sign" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}
