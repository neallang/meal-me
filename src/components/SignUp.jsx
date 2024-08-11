import React, { useState } from "react";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
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
      navigate("/signin");
    } catch (error) {
      console.error("Sign-up error:", error.message);
      setErrorMessage(error.message);
      setIsSigningUp(false);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={onSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={isSigningUp}>
          Sign Up
        </button>
        <p>Already have an account?</p>
        <a href="signin">Sign in here</a>
      </form>
    </div>
  );
};

export default SignUp;
