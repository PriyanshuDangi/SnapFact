import { GoogleGenerativeAI } from '@google/generative-ai';

const REACT_APP_GEMINI_API_KEY = 'AIzaSyBjvfOHB78IkZGZy3_bwmF6uCjRwOSpWP8';

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(REACT_APP_GEMINI_API_KEY);

// Convert file to base64
const fileToGenerativePart = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const analyzeImage = async (imageFile) => {
  try {
    if (!REACT_APP_GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured. Please add REACT_APP_GEMINI_API_KEY to your .env file.');
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Convert the image file to the format expected by Gemini
    const imagePart = await fileToGenerativePart(imageFile);

    // Create a detailed prompt for object detection and fact generation
//     const prompt = `Analyze this image and provide the following information:

// 1. **Object Detection**: Identify the main objects, items, or subjects in the image. Be specific and detailed.

// 2. **Interesting Facts**: For each identified object, provide 2-3 fascinating, educational, or surprising facts that most people wouldn't know. Make the facts engaging and informative.

// 3. **Context**: If relevant, mention the setting, environment, or context of the image.

// Format your response in a clear, engaging way that would be interesting to read. Use emojis where appropriate to make it more visually appealing.

// Example format:
// 🔍 **Objects Detected:**
// - [Object 1]: [Brief description]
// - [Object 2]: [Brief description]

// ✨ **Fascinating Facts:**

// **About [Object 1]:**
// • [Interesting fact 1]
// • [Interesting fact 2]

// **About [Object 2]:**
// • [Interesting fact 1]
// • [Interesting fact 2]

// 🌍 **Context:** [Any relevant context about the scene]`;

const prompt = `Analyze the uploaded image and identify the main subject or object. Based on what is recognized, classify it under the most suitable category from the list below (choose only one).

Then provide 2–3 useful, real-world facts that someone might want to know if they came across this in everyday life. Prioritize practical, surprising, or insightful info, not generic trivia.

Categories & Expectations:
🍽 Food & Beverages – Show calories, macronutrients, common allergens, benefits or downsides, origin, and cultural usage.
🌿 Plants & Nature – Include scientific name, whether it's edible or medicinal, its environmental role, and if it's protected or invasive.
🏛 Architecture & Landmarks – Give unique historical facts, architectural style, construction era, hidden symbolism, or fun visitor facts.
🐾 Animals – Include species name, behavior, habitat, whether it's endangered, and any interesting adaptations.
🚗 Vehicles & Tech – Provide make & model (if possible), horsepower/performance, tech innovation, and popularity or rarity.
👥 People & Fashion – Identify the fashion style or cultural dress, its origin, when it's typically worn, and any social or historical meaning.
🎨 Art & Objects – State medium (e.g. oil, sculpture), time period, style or movement, and its significance or creator.

🧠 Guidelines:
Keep it concise, factual, and directly useful

Avoid surface-level or obvious info — prefer "things you'd point out to a friend"

Don’t explain everything — make it snappy and scroll-worthy`;

    // Generate content with the image and prompt
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error('No analysis received from Gemini AI');
    }

    return text;
  } catch (error) {
    console.error('Error analyzing image:', error);
    
    if (error.message.includes('API key')) {
      throw new Error('API key configuration error. Please check your Gemini API key.');
    } else if (error.message.includes('quota')) {
      throw new Error('API quota exceeded. Please try again later.');
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection and try again.');
    } else {
      throw new Error(`Failed to analyze image: ${error.message}`);
    }
  }
}; 