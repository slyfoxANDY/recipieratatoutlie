import { GoogleGenerativeAI } from '@google/generative-ai'

// @ts-ignore - Vite will provide this at runtime
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string

console.log('🔑 API Key loaded:', API_KEY ? '✅ Present' : '❌ Missing')
console.log('API Key length:', API_KEY?.length || 0)

if (!API_KEY) {
  console.error('❌ VITE_GEMINI_API_KEY is not set in environment variables')
}

const client = new GoogleGenerativeAI(API_KEY || 'dummy')
const model = client.getGenerativeModel({ model: 'gemini-1.5-pro' })

export interface AIRecipe {
  name: string
  description: string
  ingredients: string[]
  instructions: string[]
  cookTime: number
  servings: number
  difficulty: string
  tips: string
}

export async function generateRecipesWithAI(
  ingredients: string[],
  userPreferences: {
    skillLevel: string
    timeAvailable: number
    flavorPreferences: string[]
  }
): Promise<AIRecipe[]> {
  const ingredientsList = ingredients.join(', ')
  const flavorsList = userPreferences.flavorPreferences.join(', ')

  const prompt = `You are Nonna Maria, a warm, motherly Italian grandmother chef with 40 years of culinary experience. Your role is to suggest delicious, achievable recipes based on available ingredients.

INGREDIENTS AVAILABLE: ${ingredientsList}

STUDENT PROFILE:
- Cooking Skill Level: ${userPreferences.skillLevel}
- Time Available: ${userPreferences.timeAvailable} minutes
- Flavor Preferences: ${flavorsList}

YOUR TASK: Suggest exactly 3 delicious recipes using ONLY the provided ingredients.

CRITICAL INSTRUCTIONS:
1. Respond with ONLY a valid JSON array - no text before or after
2. No markdown formatting (no \`\`\`json or \`\`\`)
3. Each recipe must use ingredients from the list
4. Each recipe must be appropriate for the skill level
5. Each recipe must fit within the available time (max ${userPreferences.timeAvailable + 15} minutes)
6. Be warm, encouraging, and motherly in descriptions

EXACT JSON FORMAT (respond ONLY with this, nothing else):
[
  {
    "name": "Dish Name",
    "description": "A warm, inviting description of why this dish is wonderful and what makes it special",
    "ingredients": ["ingredient 1 - amount", "ingredient 2 - amount", "ingredient 3 - amount"],
    "instructions": ["Step 1 with clear details", "Step 2 with clear details", "Step 3 with clear details", "Step 4 final touches"],
    "cookTime": 25,
    "servings": 2,
    "difficulty": "Beginner",
    "tips": "A warm grandmotherly tip for perfect results"
  },
  {
    "name": "Second Dish",
    "description": "Another warm description",
    "ingredients": ["ingredient 1 - amount", "ingredient 2 - amount"],
    "instructions": ["Step 1", "Step 2", "Step 3"],
    "cookTime": 30,
    "servings": 3,
    "difficulty": "Intermediate",
    "tips": "A helpful cooking secret"
  },
  {
    "name": "Third Dish",
    "description": "Final warm description",
    "ingredients": ["ingredient 1 - amount", "ingredient 2 - amount"],
    "instructions": ["Step 1", "Step 2"],
    "cookTime": 20,
    "servings": 2,
    "difficulty": "Beginner",
    "tips": "Final tip"
  }
]

Remember: ONLY output the JSON array. Nothing before it, nothing after it.`

  try {
    console.log('🍳 Starting recipe generation with ingredients:', ingredients)
    
    if (!API_KEY) {
      throw new Error('API key not available. Please set VITE_GEMINI_API_KEY')
    }

    const result = await model.generateContent(prompt)
    console.log('📡 Got response from API')
    
    const response = await result.response
    let text = response.text()

    console.log('Raw AI response:', text)

    // Clean up the response - remove all markdown code blocks
    text = text
      .replace(/^```json\s*/gm, '')
      .replace(/^```\s*/gm, '')
      .replace(/```\s*$/gm, '')
      .trim()

    // Try to find JSON array in the text
    const arrayStart = text.indexOf('[')
    const arrayEnd = text.lastIndexOf(']')
    
    if (arrayStart !== -1 && arrayEnd !== -1 && arrayEnd > arrayStart) {
      text = text.substring(arrayStart, arrayEnd + 1)
      console.log('Extracted JSON from response')
    }

    console.log('Cleaned response:', text)

    // Parse the JSON response
    const recipes = JSON.parse(text) as AIRecipe[]
    
    // Validate recipes
    if (!Array.isArray(recipes) || recipes.length === 0) {
      throw new Error('Invalid recipe format - expected array of recipes')
    }

    // Ensure all required fields exist
    const validRecipes = recipes.map((recipe, idx) => ({
      name: recipe.name || `Recipe ${idx + 1}`,
      description: recipe.description || '',
      ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
      instructions: Array.isArray(recipe.instructions) ? recipe.instructions : [],
      cookTime: typeof recipe.cookTime === 'number' ? recipe.cookTime : 30,
      servings: typeof recipe.servings === 'number' ? recipe.servings : 2,
      difficulty: recipe.difficulty || 'Beginner',
      tips: recipe.tips || '',
    }))

    console.log('✅ Successfully generated', validRecipes.length, 'recipes')
    return validRecipes
  } catch (error) {
    console.error('❌ Error generating recipes with AI:', error)
    const errorMsg = error instanceof Error ? error.message : 'Failed to generate recipes'
    throw new Error(`Recipe generation failed: ${errorMsg}`)
  }
}

export function getSystemPrompt(): string {
  return `You are Nonna Maria, a warm, motherly cooking master chef with 40 years of kitchen experience. 
You speak with genuine care and enthusiasm about food, like a loving grandmother who believes good food brings people together.

Your personality:
- Warm and encouraging ("Oh my dear, you're doing beautifully!")
- Grandmotherly wisdom ("My mother used to say...")
- Passionate about making people happy through food
- Patient and never judgmental
- Uses terms of endearment (dear, sweetheart, my love)
- Occasionally uses cooking metaphors for life advice
- Always emphasizes the joy of cooking

When suggesting recipes:
1. Always validate their ingredient choices positively
2. Suggest recipes that feel like comfort and care
3. Include personal anecdotes about why each dish is special
4. Give tips from "years of experience" 
5. Make them feel confident in the kitchen
6. Suggest variations for different skill levels
7. Emphasize the love and care in cooking`
}
