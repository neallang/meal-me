import React, { useState, useEffect } from 'react';
import Recipe from './Recipe';
import { setFavoritesToLocalStorage, setFavoritesInfoToLocalStorage, getFavoritesFromLocalStorage, getFavoritesInfoFromLocalStorage } from '../utils/favorites';
import { useAuth } from "../contexts/authContext";

const Favorites = () => {
    const { currentUser } = useAuth();
    const [userID, setUserID] = useState();
    const [favorites, setFavorites] = useState([]);
    const [favoritesInfo, setFavoritesInfo] = useState([]);

    useEffect(() => {
        if (currentUser) {
            const uID = currentUser.uid;
            setUserID(uID);
            const loadedFavorites = getFavoritesFromLocalStorage(uID);
            const loadedFavoritesInfo = getFavoritesInfoFromLocalStorage(uID);

            setFavorites(loadedFavorites);
            setFavoritesInfo(loadedFavoritesInfo);
        }
    }, [currentUser]);

    if (favorites.length === 0 || favoritesInfo.length === 0) {
        return <p>No favorite recipes found.</p>;
    }

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
    
      const toggleFavoriteInfo = (recipeInfo) => {
        setFavoritesInfo((prevFavoritesInfo) => {
          let updatedFavoritesInfo;
          
          if (prevFavoritesInfo.some(info => info.id === recipeInfo.id)) {
            updatedFavoritesInfo = prevFavoritesInfo.filter(info => info.id !== recipeInfo.id);
          } else {
            updatedFavoritesInfo = [...prevFavoritesInfo, recipeInfo];
          }
      
          setFavoritesInfoToLocalStorage(userID, updatedFavoritesInfo);
          
          return updatedFavoritesInfo;
        });
      };
    
      const handleFavoriteToggle = (recipe, recipeInfo) => {
        toggleFavorite(recipe);
        toggleFavoriteInfo(recipeInfo);
      }

    return (
        <div id="favorites">
            <h1>Your Favorite Recipes</h1>
            <div className="favorites-list">
                {favorites.map((recipe, index) => (
                    <Recipe 
                        recipe={recipe}
                        recipeInfo={favoritesInfo.find(info => info.id === recipe.id)}
                        handleFavoriteToggle={handleFavoriteToggle}
                        isFavorite={isFavorite} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Favorites;
