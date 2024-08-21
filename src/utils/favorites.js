// Favorite Recipes
export const getFavoritesKey = (userID) => {
    return `favorites_${userID}`;
};

export const setFavoritesToLocalStorage = (userID, favorites) => {
    const key = getFavoritesKey(userID);
    localStorage.setItem(key, JSON.stringify(favorites));
}

export const getFavoritesFromLocalStorage = (userID) => {
    const key = getFavoritesKey(userID);
    const savedFavorites = localStorage.getItem(key);
    return savedFavorites ? JSON.parse(savedFavorites) : [];
}

// Favorite Recipes Information (seperate DS)
export const getFavoritesInfoKey = (userID) => {
    return `favoritesInfo_${userID}`;
};

export const setFavoritesInfoToLocalStorage = (userID, favoritesInfo) => {
    const key = getFavoritesInfoKey(userID);
    localStorage.setItem(key, JSON.stringify(favoritesInfo));
};

export const getFavoritesInfoFromLocalStorage = (userID) => {
    const key = getFavoritesInfoKey(userID);
    const recipeInfoArray = localStorage.getItem(key);
    return recipeInfoArray ? JSON.parse(recipeInfoArray) : [];
}