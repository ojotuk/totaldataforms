import React from "react";
import loading from "./style/loading.gif";
const styles = {
  show: {
    minHeight: "100vh",
    width: "100vw",
    position: "fixed",
    top: "0",
    right: "0",
    backgroundColor: "rgba(0,0,0,.3)",
    transition: "0.3s",
    fontSize: "1.4rem",
    boxShadow: "0 0.4rem 1rem rgba(0,0,0,0.4)",
    color: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  hide: {
    display: "none",
  },
};
const Loader = ({ state }) => {
  return (
    <div style={state ? styles.show : styles.hide}>
      <img src={loading} alt="loading" />
    </div>
  );
};

export default Loader;
