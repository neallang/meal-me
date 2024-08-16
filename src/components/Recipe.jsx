import './recipe.css'
import { getCookTime } from '../utils/cookTime';

const Recipe = ({recipe, currentMeal, recipeInfo }) => {

    if (!recipe) {
        return <div id="recipe">Loading...</div>;
    }

    const calories = recipe.nutrition?.nutrients?.[0]?.amount ? Math.round(recipe.nutrition.nutrients[0].amount) : 0;
    const protein = recipe.nutrition?.nutrients?.[1]?.amount ? Math.round(recipe.nutrition.nutrients[1].amount) : 0;
    const fat = recipe.nutrition?.nutrients?.[2]?.amount ? Math.round(recipe.nutrition.nutrients[2].amount) : 0;
    const carbs = recipe.nutrition?.nutrients?.[3]?.amount ? Math.round(recipe.nutrition.nutrients[3].amount) : 0;
    const url = recipeInfo.sourceUrl;
    const prepMinutes = recipeInfo.preperationMinutes ? recipeInfo.preperationMinutes : 0;
    const readyInMinutes = recipeInfo.readyInMinutes;

    console.log(recipeInfo);

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
            <p>Prep and cook time: {totalTime}</p>
            <div className='recipe-details'>
                <div className='nutrients'>
                    <p>Calories: {calories}</p>
                    <p>Protein: {protein}g</p>
                    <p>Carbohydrates: {carbs}g</p>
                    <p>Fat: {fat}g</p>
                </div>
                <img src={recipe.image}/>
            </div>
             <a href={url} target='_blank'>View Full Recipe</a> 
        </div>
    )

};

export default Recipe;