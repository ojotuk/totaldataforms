import React,{useEffect,useRef} from "react";
import PdfViewer from "./PdfViewer";
import PDF from "./TDL-HR-34 EMPLOYEE HANDBOOK.pdf";
import Nav from "./../../Nav"
// import "./App.css";
import { fromBottom } from "./../../Animate";
import styles from './../../../components/style/Landing.module.css'

const App = () =>{
  
  let main = useRef(null);
  useEffect(() => {
    fromBottom(main.current);
  }, []);
  return (
  <div className="content">
    <div className={styles.main} ref={main}>
    <PdfViewer pdf={PDF} />
    </div>
  </div>
)};

export default App;
