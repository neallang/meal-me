import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: import.meta.env.REACT_APP_OPENAI_API_KEY,
});

export const getMealSuggestions = async (caloriesPerDay) => {
    const prompt = `Provide breakfast, lunch, and dinner recipes that together total approximately ${caloriesPerDay} calories.`;

    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: prompt }],
        max_tokens: 1000,
        temperature: 0.7,
    });

    return response.choices[0].message.content;
};
