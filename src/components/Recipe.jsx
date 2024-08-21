import './recipe.css'
import { getCookTime } from '../utils/cookTime';
import { getKeyIngredients } from '../utils/keyIngredients';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const Recipe = ({recipe, currentMeal, recipeInfo, handleFavoriteToggle, isFavorite }) => {

    if (!recipe) {
        return <div id="recipe">Loading...</div>;
    }

    const calories = recipe.nutrition?.nutrients?.[0]?.amount ? Math.round(recipe.nutrition.nutrients[0].amount) : 0;
    const protein = recipe.nutrition?.nutrients?.[1]?.amount ? Math.round(recipe.nutrition.nutrients[1].amount) : 0;
    const fat = recipe.nutrition?.nutrients?.[2]?.amount ? Math.round(recipe.nutrition.nutrients[2].amount) : 0;
    const carbs = recipe.nutrition?.nutrients?.[3]?.amount ? Math.round(recipe.nutrition.nutrients[3].amount) : 0;
    const url = recipeInfo.spoonacularSourceUrl;
    const prepMinutes = recipeInfo.preperationMinutes ? recipeInfo.preperationMinutes : 0;
    const readyInMinutes = recipeInfo.readyInMinutes;
    const ingredients = recipeInfo.extendedIngredients;
    const keyIngredients = getKeyIngredients(ingredients);

    // console.log(recipeInfo);
    

    const getTotalTime = (prepMins, readyMins) => {
        const totalMinutes = prepMins + readyMins;
        const cookTime = getCookTime(totalMinutes);
       
        if (cookTime[0] === 0) {
            return `${cookTime[1]} minutes`
        }
        else if (cookTime[0] === 1) {
            return `${cookTime[0]} hour and ${cookTime[1]} minutes`
        }
        return `${cookTime[0]} hours and ${cookTime[1]} minutes`

    }

    const totalTime = getTotalTime(prepMinutes, readyInMinutes);




    return (
        <div id="recipe">
            <h1>{recipe.title}</h1>
            <button className="favorite-button" onClick={() => handleFavoriteToggle(recipe, recipeInfo)}>
                    <FontAwesomeIcon 
                        icon={isFavorite ? solidHeart : regularHeart} 
                        className="favorite-icon" 
                    />
                </button>
            <p>Prep and cook time: {totalTime}</p>
            <div className='recipe-details'>
                <div className='nutrients'>
                    <p><span style={{fontWeight: 'bold'}}>Calories: </span>{calories}</p>
                    <p><span style={{fontWeight: 'bold'}}>Protein: </span> {protein}g</p>
                    <p><span style={{fontWeight: 'bold'}}>Carbohydrates: </span> {carbs}g</p>
                    <p><span style={{fontWeight: 'bold'}}>Fat: </span> {fat}g</p>
                </div>
                <img src={recipe.image}/>
            </div>
            <p><span style={{fontWeight: 'bold'}}>Key Ingredients:</span> {keyIngredients}</p>
             <a href={url} target='_blank'>View Full Recipe</a> 
        </div>
    )

};

export default Recipe;