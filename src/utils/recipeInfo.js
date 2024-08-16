import axios from "axios";

const getRecipeCacheKey = (userID, recipeID) => {
    const today = new Date().toISOString().split('T')[0]; //YYYY-MM-DD
    return `recipeInfo_${userID}_${today}_${recipeID}`;
}

const getCachedRecipe = (userID, recipeID) => {
    const key = getRecipeCacheKey(userID, recipeID);
    const cached = localStorage.getItem(key);
    return cached ? JSON.parse(cached) : null;
}

const setCachedRecipe = (userID, recipeID, recipe) => {
    const key = getRecipeCacheKey(userID, recipeID);
    localStorage.setItem(key, JSON.stringify(recipe));
}

export const getRecipeInfo = async (userID, recipeID) => {
    const cachedRecipe = getCachedRecipe(userID, recipeID)
    if (cachedRecipe) {
        return cachedRecipe;
    }

    const apiKey = import.meta.env.VITE_SPOONACULAR_KEY;
    const url = `https://api.spoonacular.com/recipes/${recipeID}/information`;

    try {
        const response = await axios.get(url, {
            params: {
                apiKey: apiKey,
            }
        });

        const result = await response.data;
        setCachedRecipe(userID, recipeID, result);
        return result;
    } catch (error) {
        console.error(`Error fetching information for recipe ${recipeID}: ${error}`)
    }
};