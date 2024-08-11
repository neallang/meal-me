// Using the Mifflin-St Jeor Equation to calculate daily caloric needs

export const calculateCaloricNeeds = (weightLbs, heightIn, heightFt, age, sex, activity, goal) => {
    const heightCm = ((12 * heightFt) + (heightIn)) * (2.54)
    const weightKg = (weightLbs) * (0.453592)

    let BMR;
    if (sex === "male") {
        BMR = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5
    }
    else if ( sex === "female") {
        BMR = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161
    }

    let caloricNeeds;
    switch (activity) {
        case 'inactive':
            caloricNeeds = BMR * 1.2;
            break;
        case 'midlyActive':
            caloricNeeds = BMR * 1.375;
            break;
        case 'active':
            caloricNeeds = BMR * 1.55;
            break;
        case 'veryActive':
            caloricNeeds = BMR * 1.725
            break;
        case 'extremelyActive':
            caloricNeeds = BMR * 1.9;
            break;
        default:
            caloricNeeds = BMR * 1.50;
    }

    switch(goal) {
        case 'weightLoss':
            caloricNeeds -= 500;
            break;
        case 'mildWeightLoss':
            caloricNeeds -= 250;
            break;
        case 'maintainWeight':
            break;
        case 'mildWeightGain':
            caloricNeeds += 250;
            break;
        case 'weightGain':
            caloricNeeds += 500;
            break;
        default:
            break;
    }

    const roundedCals = Math.round(caloricNeeds)

    return roundedCals;

}