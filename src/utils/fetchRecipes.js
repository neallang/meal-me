import axios from 'axios';

export const getMealPlan = async (caloriesPerDay) => {
  const appId = import.meta.env.VITE_EDAMAM_ID;
  const appKey = import.meta.env.VITE_EDAMAM_KEY;
  const mealCalories = Math.round(caloriesPerDay / 3);
  const caloriesRange = `${mealCalories - 100}-${mealCalories + 100}`;
  const totalCalls = 4; 
  const resultsPerCall = 20; 

  let allRecipes = [];

  try {
    for (let i = 0; i < totalCalls; i++) {
      const from = i * resultsPerCall;
      const to = from + resultsPerCall;

      const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
        params: {
          type: 'public',
          app_id: appId,
          app_key: appKey,
          calories: caloriesRange,
          from: from,
          to: to,
        },
      });

      if (response.data.hits && response.data.hits.length > 0) {
        allRecipes = allRecipes.concat(response.data.hits.map(hit => hit.recipe));
      }
    }


    const selectedMeals = filterRecipes(allRecipes);
    return selectedMeals;

  } catch (error) {
    console.error('Error fetching recipes:', error);
    return null;
  }
};

// Helper function to filter recipes by meal type and protein content
const filterRecipes = (recipes) => {
  const meals = {
    breakfast: [],
    lunchAndDinner: [],
  };

  recipes.forEach(recipe => {
    const protein = recipe.totalNutrients.PROCNT ? recipe.totalNutrients.PROCNT.quantity : 0;

    if (recipe.mealType.includes("lunch/dinner")) {
      if (protein >= 15) {
        meals.lunchAndDinner.push(recipe);
      }
    } else if (recipe.mealType.includes('breakfast')) {
      meals.breakfast.push(recipe);
    }
  });

  const selectedMeals = {
    breakfast: meals.breakfast.length > 0 ? meals.breakfast[Math.floor(Math.random() * meals.breakfast.length)] : null,
  };

  if (meals.lunchAndDinner.length > 1) {
    // Ensure lunch and dinner are different meals
    const lunchIndex = Math.floor(Math.random() * meals.lunchAndDinner.length);
    let dinnerIndex;

    do {
      dinnerIndex = Math.floor(Math.random() * meals.lunchAndDinner.length);
    } while (dinnerIndex === lunchIndex);

    selectedMeals.lunch = meals.lunchAndDinner[lunchIndex];
    selectedMeals.dinner = meals.lunchAndDinner[dinnerIndex];
  }

  return Object.values(selectedMeals).filter(meal => meal !== null);
};
