import { useContext, useState, useRef } from "react";
import AuthContext from "../store/AuthContext";
import { useTranslation } from 'react-i18next';

function Signup() {
  const authCtx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAzpBE5CgmmpVJ5JWTU4k-2ROepkem1TKw";
  const [message, setMessage] = useState("")
  const { t } = useTranslation();


  const signup = () => {
    const newUser = {
      "email": emailRef.current.value,
      "password": passwordRef.current.value,
      "returnSecureToken": true
    }

    fetch(url,{
      "method": "POST",
      "body": JSON.stringify(newUser),
      "headers": {
        "Content-Type": "application/json",
      }
    }).then(res => res.json())
    .then(json => {
      if (json.idToken !== undefined) {
        authCtx.login(json.idToken);
      } else if (json.error !== undefined) {
        setMessage(json.error.message);
      }
    });
  }

  return ( 
    <div>
      { message !== "" && <div>{t("firebase." + message)}</div>}
      <label>E-mail</label><br />
      <input ref={emailRef} type="text" /> <br />
      <label>Parool</label><br />
      <input ref={passwordRef} type="text" /> <br />
      <button onClick={signup}>Registreeru</button>
    </div>
   );
}

export default Signup;