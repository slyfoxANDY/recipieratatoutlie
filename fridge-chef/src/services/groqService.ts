import { UserProfile } from '../types'

// @ts-ignore - Vite will provide this at runtime
const API_KEY = import.meta.env.VITE_GROQ_API_KEY as string

console.log('🔑 Groq API Key loaded:', API_KEY ? '✅ Present' : '❌ Missing')

if (!API_KEY) {
  console.error('❌ VITE_GROQ_API_KEY is not set')
}

export async function chatWithGroq(
  userMessage: string,
  ingredients: string[],
  userProfile: UserProfile | null
): Promise<string> {
  const ingredientsList = ingredients.join(', ')
  const skillLevel = userProfile?.skillLevel || 'Beginner'
  const timeAvailable = userProfile?.timeAvailable || 30
  const flavorPrefs = userProfile?.flavorPreferences.join(', ') || 'varied'

  // Check if user is trying to add ingredients
  const ingredientMatch = userMessage.match(/^(add|include|have|got|i have|ingredients?:?)\s+(.+)/i)
  let processedMessage = userMessage

  if (ingredientMatch) {
    const newIngredients = ingredientMatch[2]
      .split(',')
      .map((ing) => ing.trim())
      .filter((ing) => ing.length > 0)

    processedMessage = `I want to add these ingredients: ${newIngredients.join(', ')}`
  }

  const systemPrompt = `You are Nonna Maria, a warm, motherly Italian cooking master chef with 40 years of experience. You're chatting with a student in your kitchen.

STUDENT'S AVAILABLE INGREDIENTS: ${ingredientsList || 'None mentioned yet'}
STUDENT'S PROFILE:
- Cooking Skill: ${skillLevel}
- Time Available: ${timeAvailable} minutes
- Flavor Preferences: ${flavorPrefs}

YOUR ROLE:
1. Be warm, encouraging, and grandmotherly in tone
2. Suggest recipes using ONLY available ingredients
3. Provide clear, easy-to-follow instructions
4. Adapt recipes to the student's skill level
5. Keep cooking time within their available time
6. If they mention new ingredients, acknowledge and remember them for future suggestions
7. Answer cooking questions with wisdom from your 40 years of experience

RESPONSE GUIDELINES:
- Keep responses conversational and warm, like talking to a grandmother
- If suggesting a recipe, format it clearly with name, ingredients, steps
- If they ask about adding ingredients, acknowledge and use them going forward
- Use emojis occasionally to make it friendly
- Ask follow-up questions if you need clarification`

  try {
    console.log('💬 Sending message to Groq:', processedMessage)

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: processedMessage,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.error?.message || `API error: ${response.status}`
      )
    }

    const data = await response.json()
    const text = data.choices?.[0]?.message?.content || 'No response generated'

    console.log('✅ Got response from Groq')
    return text
  } catch (error) {
    console.error('❌ Error chatting with Groq:', error)
    const errorMsg =
      error instanceof Error ? error.message : 'Failed to get response from Groq'
    throw new Error(`Chat error: ${errorMsg}`)
  }
}
