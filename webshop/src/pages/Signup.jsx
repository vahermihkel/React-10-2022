import { useContext, useRef } from "react";
import AuthContext from "../store/AuthContext";

function Signup() {
  const authCtx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  
  const signup = () => {
    // KUI ON EDUKAS
    authCtx.login();
  }

  return ( 
    <div>
      <label>E-mail</label><br />
      <input ref={emailRef} type="text" /> <br />
      <label>Parool</label><br />
      <input ref={passwordRef} type="text" /> <br />
      <button onClick={signup}>Registreeru</button>
    </div>
   );
}

export default Signup;