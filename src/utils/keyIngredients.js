export const getKeyIngredients = (ingredients) => {
    let keyIngredients = `Key Ingredients: `
    for (let i=0; i < 5; i++) {
        if (ingredients[i]) {
            const titleCaseIngredient = ingredients[i].name.charAt(0).toUpperCase() + ingredients[i].name.substring(1).toLowerCase();
            keyIngredients += `${titleCaseIngredient}, `
        }
    }

    return keyIngredients.slice(0,-2);
}