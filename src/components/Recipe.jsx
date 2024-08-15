import './recipe.css'

const Recipe = ({recipe, currentMeal}) => {

    if (!recipe) {
        return <div id="recipe">Loading...</div>;
    }

    const calories = recipe.nutrition?.nutrients?.[0]?.amount ? Math.round(recipe.nutrition.nutrients[0].amount) : 0;
    const protein = recipe.nutrition?.nutrients?.[1]?.amount ? Math.round(recipe.nutrition.nutrients[1].amount) : 0;
    const fat = recipe.nutrition?.nutrients?.[2]?.amount ? Math.round(recipe.nutrition.nutrients[2].amount) : 0;
    const carbs = recipe.nutrition?.nutrients?.[3]?.amount ? Math.round(recipe.nutrition.nutrients[3].amount) : 0;




    return (
        <div id="recipe">
            <h1>{recipe.title}</h1>
            <div className='recipe-details'>
                <div className='nutrients'>
                    <p>Calories: {calories}</p>
                    <p>Protein: {protein}g</p>
                    <p>Carbohydrates: {carbs}g</p>
                    <p>Fat: {fat}g</p>
                </div>
                <img src={recipe.image}/>
            </div>
             <a target='_blank'>View Full Recipe</a> 
        </div>
    )

};

export default Recipe;