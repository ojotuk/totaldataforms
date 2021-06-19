// import { button } from '@material-ui/core'
import axios from "axios";
import React, { useRef, useContext, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { GlobalContext } from "./../../GlobalStore/GlobalProvider";
import Flash from "./../Flash";
import Loader from "../Loader";
import { host } from "./../../hostEndpoint";
//

export default function SignatureManager() {
  let sigCanvas = useRef(null);
  const { user, userInfoEditHandler } = useContext(GlobalContext);

  const reset = () => {
    sigCanvas.clear();
  };
  const confirm = () => {
    userInfoEditHandler({ Signature: sigCanvas.toDataURL() });
    // console.log(user);
  };
  const [state, setState] = useState(false);

  const handleSubmit = () => {
    // console.log(user)
    setState(true);
    axios
      .post(`${host}/commitment/form-new`, user)
      .then((res) => {
        // console.log(res)
        setState(false);

        if (res.data.code === 201) {
          Flash("success", "Record submitted successfully", "", 3000, () =>
            setTimeout(() => window.location.reload(), 2000)
          );
          return 
        }
        if (res.data.code === 400) {
          Flash("error", "Record exist", "", 3000, null);
          return
        } else {
          Flash("error", "Network/server error", "", 3000, null);
          return;
        }
      })
      .catch((e) => {
        setState(false);
        Flash("error", "Network/server error", "", 3000, null);
        return
      });
  };
  return (
    <>
      <div className="containe">
        <p className="text-dark">Sign here</p>
        <div
          style={{
            border: "2px solid #eee",
            width: "fit-content",
            padding: "5px",
          }}
        >
          <SignatureCanvas
            penColor="green"
            canvasProps={{ width: 200, height: 100, className: "sigCanvas" }}
            ref={(ref) => {
              sigCanvas = ref;
            }}
          />
          ,
        </div>
        <div className={`${!user.Signature ? "mt-2" : "d-none"}`}>
          <button onClick={() => reset()}>Reset</button>
          <button className="btn-confirm" onClick={() => confirm()}>
            Confirm
          </button>
        </div>
        <div className="mt-4">
          <button
            className={`${user.Signature ? "w-100 btn-submit" : "d-none"}`}
            onClick={() => handleSubmit()}
          >
            Submit
          </button>
        </div>
      </div>
      <Loader state={state} />
    </>
  );
}
