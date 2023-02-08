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
      prompt: "List" + servings + "meals (with at least 1 breakfast, 1 lunch, the rest dinners) using up to 6 ingredients each from the given list (milk, eggs, butter, bread, salt, pepper, oil, sugar, cheese slice, ketchup, mustard) and the additional ingredients"+ text + "Include recipe instructions, cook time, and end each recipe with '||' to separate. Follow a diet type of (diet) or standard American diet. Number each meal and write the recipe following it, using alphabetical bullet points for instructions. Indicate the number of servings needed"+ servings + "\n\n",
      ///PROMPT ENDS HERE
      max_tokens: 1500,
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
