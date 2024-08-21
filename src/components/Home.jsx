import React, { useState, useEffect } from "react";
import { doSignOut, getFormData, doDeleteAccount } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase"
import { calculateCaloricNeeds } from "../utils/calories";
import {getFormattedDate} from '../utils/date'
import Recipe from "./Recipe";
import Settings from "./Settings";
import { getMealPlan } from "../utils/fetchRecipes"; 
import { getRecipeInfo } from "../utils/recipeInfo";
import { getFavoritesFromLocalStorage, setFavoritesToLocalStorage } from "../utils/favorites";
import './home.css'

const Home = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [caloriesPerDay, setCaloriesPerDay] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [dailyRecipes, setDailyRecipes] = useState(null);
  const [currentMeal, setCurrentMeal] = useState(null);     // Breakfast, Lunch, or Dinner
  const [currentRecipe, setCurrentRecipe] = useState(null); // Recipe title, ID, some nutrients
  const [currentRecipeInfo, setCurrentRecipeInfo] = useState(null); // All other recipe data (separate API)
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const user= auth.currentUser;
        if (user) {
            setUserID(user.uid);

            const loadedFavorites = getFavoritesFromLocalStorage(user.uid);
            console.log(loadedFavorites);
            setFavorites(loadedFavorites);
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
          const recipes = await getMealPlan(userID, caloriesPerDay);
          setDailyRecipes(recipes);
          setCurrentRecipe(recipes.breakfast);
          setCurrentMeal('Breakfast');
        }
      };
    
      fetchRecipeData();
    }, [caloriesPerDay]);

      // Update the current recipe info whenever the current recipe changes
  useEffect(() => {
    if (currentRecipe) {
      const fetchRecipeInfo = async () => {
        const recipeInfo = await getRecipeInfo(userID, currentRecipe.id);
        setCurrentRecipeInfo(recipeInfo);
        // console.log(recipeInfo);
      };

      fetchRecipeInfo();
    };
  }, [currentRecipe]);

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  }



  const handleSignOut = async () => {
    const confirmSignout = window.confirm("Are you sure you want to sign out?");

    if (confirmSignout){
      await doSignOut();
      navigate("/", { replace: true });
    }
  };

  const handleDeleteAccount = async (uID) => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

    if (confirmDelete) {
      await doDeleteAccount(uID);
    }
  }

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

  const toggleFavorite = (recipe) => {
    setFavorites((prevFavorites) => {
      let updatedFavorites;
      if (prevFavorites.some(fav => fav.id === recipe.id)) {
        updatedFavorites = prevFavorites.filter(fav => fav.id !== recipe.id);
      }
      else {
        updatedFavorites = [...prevFavorites, recipe];
      }

      setFavoritesToLocalStorage(userID, updatedFavorites);

      return updatedFavorites;
    })
  };

  const isFavorite = (recipe) => {
    return favorites.some(fav => fav.id === recipe.id);
  };

  if (!userLoggedIn) {
    navigate('/');
  }




  return (
    <div id="home">

      {settingsOpen && (
        <Settings 
          handleSignOut={handleSignOut}
          deleteAccount={handleDeleteAccount}
          userID={userID}
        />
      )}
        <div className="home-content">
          <div className="top-row">
          <img 
            className="menu-icon" 
            src="../menu-icon.png" 
            onClick={toggleSettings}
          />
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

        {currentRecipe && currentMeal && currentRecipeInfo &&  
        <Recipe 
          recipe={currentRecipe} 
          currentMeal={currentMeal} 
          recipeInfo={currentRecipeInfo}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite(currentRecipe)}
        />}

      </div>
      
    </div>
  );

};

export default Home;
