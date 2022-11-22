import { useContext, useRef } from "react";
import AuthContext from "../store/AuthContext";

function Login() {
  const authCtx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  
  const login = () => {
    // KUI ON EDUKAS
    authCtx.login();
  }

  return ( 
    <div>
      <label>E-mail</label><br />
      <input ref={emailRef} type="text" /> <br />
      <label>Parool</label><br />
      <input ref={passwordRef} type="text" /> <br />
      <button onClick={login}>Logi sisse</button>
    </div>
   );
}

export default Login;