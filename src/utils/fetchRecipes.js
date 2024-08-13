import axios from 'axios';

export const getRecipes = async (caloriesPerDay) => {
  const appId = '4ad0c8b8';
  const appKey = 'deb0c52cea35b8da7dfa5b4243c6a73d';
  const calories = await caloriesPerDay.toString();
  console.log(calories);
  try {
    const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
      params: {
        app_id: appId,
        app_key: appKey,
        calories: `lte ${caloriesPerDay}`,
        to: 1,
      },
    });

    if (response.data.hits && response.data.hits.length > 0) {
      return response.data.hits[0].recipe;
    } else {
      console.log('No recipes found for the given calorie count.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return null;
  }
};
