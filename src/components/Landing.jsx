import React, { useState } from "react";
import SignIn from "./authComponents/SignIn";
import SignUp from "./authComponents/SignUp";
import './landing.css'

const Landing = () => {
    const [signUpPage, setSignUpPage] = useState(false);

    const toggleAuthMode = () => {
        setSignUpPage(!signUpPage);
    };


    return (
        <div id="landing">
            <h1>Meal Me</h1>
            <p>Welcome to Meal Me, an AI-powered website that reccommends recipes for you based on your health goals! Sign in below to get started!</p>
            {signUpPage ? <SignUp toggleAuthMode={toggleAuthMode} /> : <SignIn toggleAuthMode={toggleAuthMode} />}
            
        </div>
    )
};

export default Landing;