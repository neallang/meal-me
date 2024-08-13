import React, { useState, useEffect } from "react";
import { doSignOut, getFormData } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase"
import { calculateCaloricNeeds } from "../utils/calories";
import {getFormattedDate} from '../utils/date'
import Recipe from "./Recipe";
import './home.css'

const Home = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [caloriesPerDay, setCaloriesPerDay] = useState(null);
  const [firstName, setFirstName] = useState(null);

    useEffect(() => {
        const user= auth.currentUser;
        if (user) {
            setUserID(user.uid);
        }
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        if (userID) {
          const formData = await getFormData(userID);
          if (formData) {
            const calories = calculateCaloricNeeds(formData.weight, formData.heightIn, formData.heightFt, formData.age, formData.sex, formData.activity, formData.goal);
            setCaloriesPerDay(calories);
            setFirstName(formData.firstName);
          }
        }
      };
      fetchData();
    }, [userID]);


  const handleSignOut = async () => {
    await doSignOut();
    navigate("/", { replace: true });
  };

  if (!userLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div id="home">
      <div className="top-row">
        <img src="../menu.png" />
        <h1>Recipes for {getFormattedDate()}</h1>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <p>Daily caloric need: {caloriesPerDay}</p>

      <div className="meal-buttons">
        <button>Breakfast</button>
        <button>Lunch</button>
        <button>Dinner</button>
      </div>

      <Recipe />
      
    </div>
  );
};

export default Home;
