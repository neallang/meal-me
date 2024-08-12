import React, { useState } from "react";
import { doSignInWithEmailAndPassword, getUserData, updateUserData } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import './sign-in.css';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSigningIn(true);
    try {
      const userCredential = await doSignInWithEmailAndPassword(email, password);
      
      const userData = await getUserData(userCredential.user.uid);

      if (userData && userData.isFirstTimeUser) {
          alert("Welcome to your first login!");
          navigate("/form");

          await updateUserData(userCredential.user.uid, { isFirstTimeUser: false });
      }
      else {
        alert("Welcome back!");
        navigate("/home");
      }
    } catch (error) {
      console.error("Sign-in error:", error.message);
      setErrorMessage(error.message);
      setIsSigningIn(false);
    }
  };

  return (
    <div id="sign-in">
      <h1>Sign In</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form className="form-content" onSubmit={onSubmit}>
        <div className="form-el">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            required
          />
        </div>
        <div className="form-el">
          <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="iloveReact123!"
              required
            />
        </div>
        <div className="form-el">
          <button type="submit" disabled={isSigningIn}>LOGIN</button>
        </div>
      </form>
      <p>Don't have an account?</p>
      <a href="signup">Sign up here</a>
    </div>
  );
};

export default SignIn;
