import axios from 'axios';

// Calling the spoonacular API to fetch recipes. Saving to local storage daily to avoid unnecessary API calls.

const getCachedData = (userID, calories) => {
  const key = getCacheKey(userID, calories);
  const cached = localStorage.getItem(key);
  return cached ? JSON.parse(cached) : null;
};

const setCachedData = (userID, data, calories) => {
  const key = getCacheKey(userID, calories);
  localStorage.setItem(key, JSON.stringify(data));
}

const getCacheKey = (userID, calories) => {
  const today = new Date().toISOString().split('T')[0]; //YYYY-MM-DD
  return `mealPlan_${userID}_${today}_${calories}`;
}

export const getMealPlan = async (userID, caloriesPerDay) => {
  const cachedRecipes = getCachedData(userID, caloriesPerDay);
  if (cachedRecipes) {
    return cachedRecipes;
  };

  const apiKey = import.meta.env.VITE_SPOONACULAR_KEY; 
  const url = 'https://api.spoonacular.com/recipes/complexSearch';

  const caloriesPerMeal = (caloriesPerDay / 3);
  const minCalories = caloriesPerMeal - 50;
  const maxCalories = caloriesPerMeal + 50;

  const meals = {
    breakfast: null,
    lunch: null,
    dinner: null
  }

  //Breakfast
  try {
    const response = await axios.get(url, {
      params: {
        apiKey: apiKey,
        minCalories: minCalories,
        maxCalories: maxCalories,
        number: 10, 
        minProtein: 10,
        minCarbs: 1,
        minFat: 1, 
        type:"breakfast",
      },
    });

    const result = await response.data.results;
    const randIdx =  Math.floor(Math.random() * result.length)
    meals.breakfast = result[randIdx];
  } catch (error) {
    console.error('Error fetching breakfast:', error);
  }

  //Lunch and Dinner
  try {
    const response = await axios.get(url, {
      params: {
        apiKey: apiKey,
        minCalories: minCalories,
        maxCalories: maxCalories,
        number: 10,
        minProtein: 15,
        minCarbs: 1,
        minFat: 1, 
        type:"lunch, dinner",
      },
    });

    const results = await response.data.results;
    const randIdx1 =  Math.floor(Math.random() * results.length);
    const randIdx2 = (randIdx1 + 1) % 10;
    meals.lunch = results[randIdx1];
    meals.dinner = results[randIdx2];
  } catch (error) {
    console.error('Error fetching lunch/dinner:', error);
  }

  setCachedData(userID, meals, caloriesPerDay);

  return meals;

};