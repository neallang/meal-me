import React, { useState, useEffect } from "react";
import { doSignOut, getFormData } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase"
import { calculateCaloricNeeds } from "../utils/calories";
import {getFormattedDate} from '../utils/date'
import Recipe from "./Recipe";
import { getMealPlan } from "../utils/fetchRecipes"; 
import './home.css'

const Home = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [caloriesPerDay, setCaloriesPerDay] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [ recipe1, setRecipe1] = useState(null);
  const [ recipe2, setRecipe2] = useState(null);
  const [ recipe3, setRecipe3] = useState(null);

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

    useEffect(() => {
      const fetchRecipeData = async () => {
        if (caloriesPerDay) {
          // const calorieString = caloriesPerDay.toString();
          const recipes = await getMealPlan(caloriesPerDay);
          console.log(recipes);
          const recipe1URL = recipes[0].url
          setRecipe1(recipe1URL)
          const recipe2URL = recipes[1].url
          setRecipe2(recipe2URL);
          const recipe3URL = recipes[2].url
          setRecipe3(recipe3URL);
          
        }
      };
    
      fetchRecipeData();
    }, [caloriesPerDay]);


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

      <a href={recipe1} target="_blank">Recipe 1</a>
      <a href={recipe2} target="_blank">Recipe 2</a>
      <a href={recipe3} target="_blank">Recipe 3</a>

      <Recipe />
      
    </div>
  );
};

export default Home;
