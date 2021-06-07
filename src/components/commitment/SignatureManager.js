// import { button } from '@material-ui/core'
import axios from "axios";
import React, { useRef, useContext } from "react";
import SignatureCanvas from "react-signature-canvas";
import { GlobalContext } from "./../../GlobalStore/GlobalProvider";

export default function SignatureManager() {
  let sigCanvas = useRef(null);
  const { user, ChangeTab, userInfoEditHandler } = useContext(GlobalContext);

  const reset = () => {
    sigCanvas.clear();
  };
  const confirm = () => {
    userInfoEditHandler({ Signature: sigCanvas.toDataURL() });
    console.log(user);
  };

  const handleSubmit=()=>{
      console.log(user)
      axios.post('http://localhost:5000/commitment/form-new',user)
      .then(res=>{
          console.log(res)
          if(res.data.code===201){
              
          }
        })
      .catch(e=>console.log(e))
  }
  return (
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
      <div className={`${!user.Signature ? 'mt-2':'d-none'}`}>
      <button onClick={() => reset()}>Reset</button>
      <button className='btn-confirm' onClick={() => confirm()}>Confirm</button>
      </div>
      <div className='mt-4'>
      <button className={`${user.Signature ? 'w-100 btn-submit':'d-none'}`} onClick={() => handleSubmit()}>Submit</button>
      </div>
    </div>
  );
}
