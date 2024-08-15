import axios from 'axios';

// Calling the spoonacular API to fetch recipes. Saving to local storage daily to avoid unnecessary API calls.

const getCachedData = () => {
  const key = getCacheKey();
  const cached = localStorage.getItem(key);
  return cached ? JSON.parse(cached) : null;
};

const setCachedData = (data) => {
  const key = getCacheKey();
  localStorage.setItem(key, JSON.stringify(data));
}

const getCacheKey = () => {
  const today = new Date().toISOString().split('T')[0]; //YYYY-MM-DD
  return `mealPlan_${today}`;
}

export const getMealPlan = async (caloriesPerDay) => {
  const cachedRecipes = getCachedData();
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
        number: 1, 
        minProtein: 10,
        minCarbs: 1,
        minFat: 1, 
        type:"breakfast",
      },
    });

    const result = await response.data.results;
    meals.breakfast = result[0];
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
        number: 2,
        minProtein: 15,
        minCarbs: 1,
        minFat: 1, 
        type:"lunch, dinner",
      },
    });

    const results = await response.data.results;
    meals.lunch = results[0];
    meals.dinner = results[1];
  } catch (error) {
    console.error('Error fetching lunch/dinner:', error);
  }

  setCachedData(meals);

  return meals;

};