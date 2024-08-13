import axios from 'axios';

export const getRecipes = async (caloriesPerDay) => {
  const appId = '20c6cf6d';
  const appKey = 'de90d131818e63d03aaaa4770b73a8b1';
  const mealCalories = Math.round(caloriesPerDay / 3);
  const caloriesRange = `${mealCalories - 100}-${mealCalories + 100}`;

  console.log(caloriesRange)

  try {
    const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
      params: {
        type: 'public',
        app_id: appId,
        app_key: appKey,
        calories: caloriesRange,
        to: 20, // Fetch up to 20 recipes
      },
    });

    if (response.data.hits && response.data.hits.length > 2) {
      // Randomly select any three recipes
      const selectedRecipes = getRandomRecipes(response.data.hits, 3);
      return selectedRecipes;
    } else {
      console.log('Not enough recipes found within the calorie range.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return null;
  }
};

// Helper function to randomly select n recipes
const getRandomRecipes = (recipes, n) => {
  const shuffled = recipes.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n).map(hit => hit.recipe);
};
