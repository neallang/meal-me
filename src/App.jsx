import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/authComponents/SignUp";
import SignIn from "./components/authComponents/SignIn";
import Home from "./components/Home";
import Form from "./components/form/Form";
import InformationForm from "./components/form/InformationForm";
import ActivityForm from "./components/form/ActivityForm"
import GoalForm from "./components/form/GoalForm";
import { AuthProvider } from "./contexts/authContext";
import Landing from "./components/Landing";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/form/*" element={<Form />} />
          <Route path="/" element={<Landing/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
