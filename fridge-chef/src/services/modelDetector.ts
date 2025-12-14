// @ts-ignore - Vite will provide this at runtime
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string

// List of models to try in order of preference
const MODELS_TO_TRY = [
  'gemini-1.5-flash',     // Newer fast model - try first
  'gemini-pro',           // Classic free model
  'gemini-pro-vision',    // Vision-capable model
]

let cachedWorkingModel: string | null = null

export async function getWorkingModel(): Promise<string> {
  // Return cached model if we already found one
  if (cachedWorkingModel) {
    console.log('📦 Using cached model:', cachedWorkingModel)
    return cachedWorkingModel
  }

  console.log('🔍 Detecting available models...')

  for (const model of MODELS_TO_TRY) {
    try {
      console.log(`  Trying ${model}...`)

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'test' }] }],
          }),
        }
      )

      // 200 = success, 400 = bad request (model exists but input invalid)
      // 404 = model not found
      if (response.status === 200 || response.status === 400) {
        console.log(`✅ Found working model: ${model}`)
        cachedWorkingModel = model
        return model
      }
    } catch (error) {
      console.log(`  ✗ ${model} failed:`, error)
    }
  }

  // Fallback to gemini-pro
  console.warn('⚠️ Could not detect model, defaulting to gemini-pro')
  cachedWorkingModel = 'gemini-pro'
  return 'gemini-pro'
}
