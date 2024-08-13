import axios from 'axios';

export const getRecipes = async (caloriesPerDay) => {
  const appId = '20c6cf6d';
  const appKey = 'de90d131818e63d03aaaa4770b73a8b1';
  // const calories = await caloriesPerDay.toString();
  const calories = '700-900';
  try {
    const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
      params: {
        type: 'public',
        app_id: appId,
        app_key: appKey,
        calories: calories,
        to: 20, // Retrieve up to 20 results
      },
    });

    if (response.data.hits && response.data.hits.length > 0) {
      // Filter the results based on calories
      const filteredRecipes = response.data.hits.filter(hit => {
        const recipeCalories = hit.recipe.calories;
        return recipeCalories >= 200 && recipeCalories <= 1100;
      });

      if (filteredRecipes.length > 0) {
        return filteredRecipes[0].recipe;
      } else {
        console.log('No recipes found within the calorie range.');
        return null;
      }
    } else {
      console.log('No recipes found for the given calorie count.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return null;
  }
};
