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
          console.log(recipes);
          setDailyRecipes(recipes);
          setCurrentRecipe(recipes.breakfast);
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
          setCurrentRecipe(dailyRecipes.breakfast);
          setCurrentMeal('Breakfast');
          break;
        case 'lunch':
          setCurrentRecipe(dailyRecipes.lunch);
          setCurrentMeal('Lunch');
          break;
        case 'dinner':
          setCurrentRecipe(dailyRecipes.dinner);
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
  // console.log("Current Recipe: ", currentRecipe)
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
        <button 
          className={currentMeal === 'Breakfast' ? 'active-button' : ''}
          onClick={() => handleRecipeChange('breakfast')}>
          Breakfast
        </button>
        <button 
          className={currentMeal === 'Lunch' ? 'active-button' : ''}
          onClick={() => handleRecipeChange('lunch')}>
            Lunch
          </button>
        <button 
          className={currentMeal === 'Dinner' ? 'active-button' : ''}
          onClick={() => handleRecipeChange('dinner')}>
          Dinner
        </button>
      </div>

      {currentRecipe && currentMeal && <Recipe recipe={currentRecipe} currentMeal={currentMeal}/>}
      
    </div>
  );
};

export default Home;
