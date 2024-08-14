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
  const [dailyRecipes, setDailyRecipes] = useState(null);
  const [currentMeal, setCurrentMeal] = useState(null);
  const [currentRecipe, setCurrentRecipe] = useState(null);

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
          setDailyRecipes(recipes);
          setCurrentRecipe(recipes[0]);
          setCurrentMeal('Breakfast');
        }
      };
    
      fetchRecipeData();
    }, [caloriesPerDay]);



  const handleSignOut = async () => {
    await doSignOut();
    navigate("/", { replace: true });
  };

  const handleRecipeChange = (mealType) => {
    if (dailyRecipes) {
      switch (mealType) {
        case 'breakfast':
          setCurrentRecipe(dailyRecipes[0]);
          setCurrentMeal('Breakfast');
          break;
        case 'lunch':
          setCurrentRecipe(dailyRecipes[1]);
          setCurrentMeal('Lunch');
          break;
        case 'dinner':
          setCurrentRecipe(dailyRecipes[2]);
          setCurrentMeal('Dinner');
          break;
        default:
          break;
      }
    }
  };

  if (!userLoggedIn) {
    return <Navigate to="/" />;
  }

  // if (currentRecipe) {
  // console.log(currentRecipe)
  // }


  return (
    <div id="home">
      <div className="top-row">
        <img src="../menu.png" />
        <h1>Recipes for {getFormattedDate()}</h1>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <p>Daily caloric need: {caloriesPerDay}</p>

      <div className="meal-buttons">
        <button onClick={() => handleRecipeChange('breakfast')}>Breakfast</button>
        <button onClick={() => handleRecipeChange('lunch')}>Lunch</button>
        <button onClick={() => handleRecipeChange('dinner')}>Dinner</button>
      </div>

      {currentRecipe && currentMeal && <Recipe recipe={currentRecipe} currentMeal={currentMeal}/>}
      
    </div>
  );
};

export default Home;
