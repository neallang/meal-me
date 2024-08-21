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