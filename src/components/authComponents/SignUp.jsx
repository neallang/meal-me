import React, { useState } from "react";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import './sign-in.css'

const SignUp = ({ toggleAuthMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSigningUp(true);
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      alert("Sign-Up Successful");
      navigate("/");
    } catch (error) {
      console.error("Sign-up error:", error.message);
      setErrorMessage(error.message);
      setIsSigningUp(false);
    }
  };

  return (
    <div id="sign-in">
      <h1>Sign Up</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form className="form-content" onSubmit={onSubmit}>
        <div className="form-el">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-el">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div className="form-el">
          <button type="submit" disabled={isSigningUp}>Sign Up</button>
        </div>
      </form>
      <p>Already have an account?</p>
      <a onClick={toggleAuthMode}>Sign in here </a>
    </div>
  );
};

export default SignUp;
