import React from "react";

const styles = {
  show: {
    minHeight: "70px",
    width: "300px",
    maxWidth: "90vw",
    position: "fixed",
    top: "10rem",
    right: "1rem",
    backgroundColor: "rgba(255,255,255,1)",
    transition: "0.3s",
    fontSize: "14px",
    boxShadow: "0 0.4rem 1rem rgba(0,0,0,0.4)",
  },
  hide: {
    minHeight: "10rem",
    width: "30rem",
    maxWidth: "90vw",
    position: "fixed",
    top: "12rem",
    right: "-100rem",
    backgroundColor: "rgba(0,0,0,0.1)",
    transition: "0.3s",
    fontSize: "14px",
  },
  titleBarError: {
    backgroundColor: "rgba(220,20,60,1)",
    color: "#ffffff",
    fontSize: "14px",
  },
  titleBarSuccess: {
    backgroundColor: "rgba(31,200,129,0.5)",
    color: "#ffffff",
    fontSize: "14px",
  },
};
const Notification = ({ notificationMsg, setNotify }) => {
  if (notificationMsg.state) {
    setTimeout(() => {
      setNotify({
        state: false,
        msg: "",
        type: "Error",
      });
    }, 5000);
  }
  return (
    <div style={notificationMsg.state ? styles.show : styles.hide}>
      <div
        className={"p-2 text-center"}
        style={
          notificationMsg.type === "Success"
            ? styles.titleBarSuccess
            : styles.titleBarError
        }
      >
        {notificationMsg.type}
      </div>
      <div className={"p-2"}>{notificationMsg.msg}</div>
    </div>
  );
};

export default Notification;
