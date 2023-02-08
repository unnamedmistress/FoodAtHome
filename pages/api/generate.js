import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const text = req.body.text || '';
  const meals = req.body.meals || 1;
  const servings = req.body.servings || 1;
  const diet = req.body.diet || " ";
  const words = text.trim().split(/\s+/).length;

  if (words < 5 || words > 250) {
    res.status(400).json({
      error: {
        message: "Please enter a text input between 5 and 250 words",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      // PROMPT GOES HERE// To Do: add your own prompt here
      prompt: "List" + meals + "meals that can be cooked with only these ingredients included in this prompt, use only 6 ingredients or less in each recipe, Show the recipe as well, Diet type " +diet + " or just use the standard american diet. include at least one breakfast meal and a at least one lunch meal and the rest are dinners. Each meal to be numbered and the recipe following it and a line space between meals, recipe instructions should be not numbered but alphabetical (a,b,c) and so on. include cook time. End each recipe with || to separate them. Ingredients: milk, eggs, butter, bread, salt, pepper, oil, sugar, cheese slice, ketchup, mustard" + text + "for number of servings" + servings +"\n\n",
      ///PROMPT ENDS HERE
      max_tokens: 1000,
      temperature: 0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}
