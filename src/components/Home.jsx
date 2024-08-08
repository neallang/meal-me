import React from "react";
import { doSignOut } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { currentUser, userLoggedIn } = useAuth();

  const handleSignOut = async () => {
    await doSignOut();
  };

  if (!userLoggedIn) {
    return <Navigate to="/signin" />;
  }

  return (
    <div>
      <h1>Welcome, {currentUser.email}</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Home;
