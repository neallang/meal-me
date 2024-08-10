import React, { useState } from "react";
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

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
      
      // Check the isFirstTimeUser flag
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.isFirstTimeUser) {
          alert("Welcome to your first login!");
          await updateDoc(doc(db, "users", userCredential.user.uid), {
            isFirstTimeUser: false,
          });
        }
      }

      navigate("/home"); // Redirect to home or another page after sign-in
    } catch (error) {
      console.error("Sign-in error:", error.message);
      setErrorMessage(error.message);
      setIsSigningIn(false);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
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
        <button type="submit" disabled={isSigningIn}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
