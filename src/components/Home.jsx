import React from "react";
import { doSignOut } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await doSignOut();
    navigate("/signin", { replace: true });
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
