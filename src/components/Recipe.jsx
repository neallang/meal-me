import './recipe.css'

const Recipe = ({recipe, currentMeal}) => {

    console.log(recipe)
    console.log(recipe.calories / 4)
    console.log(recipe.totalDaily.PROCNT.quantity / recipe.yield)
    console.log(recipe.totalDaily.CHOCDF.quantity / recipe.yield)
    console.log(recipe.totalDaily.FAT.quantity / recipe.yield)


    return (
        <div id="recipe">
            <h1>{recipe.label}</h1>
            <div className='recipe-details'>
                <div className='nutrients'>
                    <p>Calories: </p>
                    <p>Protein: </p>
                    <p>Carbohydrates: </p>
                    <p>Fat: </p>
                </div>
                <img src={recipe.image}/>
            </div>
            <a href={recipe.url} target='_blank'>View Full Recipe</a>
        </div>
    )

};

export default Recipe;