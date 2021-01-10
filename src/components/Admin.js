import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";
const Admin = () => {
  const [isLog, setIslogged] = useState(
    sessionStorage.getItem("auth-token") ? true : false
  );
  return (
    <div>
      {!isLog ? (
        <Login setIslogged={setIslogged} />
      ) : (
        <Dashboard setIslogged={setIslogged} />
      )}
    </div>
  );
};

export default Admin;
