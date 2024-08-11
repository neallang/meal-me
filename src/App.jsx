import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import Form from "./components/form/Form";
import InformationForm from "./components/form/InformationForm";
import ActivityForm from "./components/form/ActivityForm"
import GoalForm from "./components/form/GoalForm";
import { AuthProvider } from "./contexts/authContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/form/*" element={<Form />} />
          <Route path="/" element={<Navigate to="/signin" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
