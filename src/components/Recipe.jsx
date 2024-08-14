import './recipe.css'

const Recipe = ({recipe, currentMeal}) => {

    console.log(recipe)


    return (
        <div id="recipe">
            <h1>{currentMeal}</h1>
            <h2>{recipe.label}</h2>
            <a href={recipe.url} target='_blank'>recipe</a>
        </div>
    )

};

export default Recipe;