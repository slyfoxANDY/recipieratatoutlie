import { useState, useEffect } from 'react'
import { FiArrowLeft, FiLoader } from 'react-icons/fi'
import { useAppStore } from '../store/appStore'
import { generateRecipesWithAI, AIRecipe } from '../services/aiService'
import AIRecipeCard from './AIRecipeCard'

interface AIRecipeResultsProps {
  onBack: () => void
}

export default function AIRecipeResults({ onBack }: AIRecipeResultsProps) {
  const { selectedIngredients, userProfile } = useAppStore()
  const [recipes, setRecipes] = useState<AIRecipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Generate recipes on mount
  useEffect(() => {
    const fetchRecipes = async () => {
      if (!userProfile) {
        setError('Please complete onboarding first')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const generatedRecipes = await generateRecipesWithAI(
          selectedIngredients,
          {
            skillLevel: userProfile.skillLevel,
            timeAvailable: userProfile.timeAvailable,
            flavorPreferences: userProfile.flavorPreferences,
          }
        )
        setRecipes(generatedRecipes)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to generate recipes'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])
  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-all"
        >
          <FiArrowLeft /> Back
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="mb-6">
            <div className="inline-block">
              <FiLoader className="text-4xl text-primary animate-spin" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-dark mb-2">
            Let me think about what you can cook...
          </h2>
          <p className="text-gray-600 mb-6">
            I'm consulting with my recipe wisdom to find the perfect dishes for you! 👵
          </p>
          <div className="inline-block">
            <div className="space-y-2 text-sm text-gray-500">
              <p>✓ Analyzing your ingredients</p>
              <p>✓ Checking your preferences</p>
              <p>✓ Finding the best recipes</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-all"
        >
          <FiArrowLeft /> Back
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-dark mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (recipes.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-all"
        >
          <FiArrowLeft /> Back
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">🤔</div>
          <h2 className="text-2xl font-bold text-dark mb-2">
            Hmm, let me think harder...
          </h2>
          <p className="text-gray-600 mb-6">
            I couldn't quite find the perfect recipes yet. Let's try with different ingredients!
          </p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-all"
      >
        <FiArrowLeft /> Back
      </button>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-dark mb-2">
          Here's what I'd love for you to cook! 👵
        </h2>
        <p className="text-gray-600">
          Based on your lovely ingredients: <strong>{selectedIngredients.join(', ')}</strong>
        </p>
        <p className="text-sm text-gray-500 mt-2">
          These recipes are perfect for your skill level and available time. Each one is made with love!
        </p>
      </div>

      <div className="space-y-6">
        {recipes.map((recipe, index) => (
          <AIRecipeCard key={index} recipe={recipe} index={index} />
        ))}
      </div>

      <div className="mt-12 text-center p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
        <p className="text-gray-700 italic">
          "The most important ingredient in any recipe is the love you put into cooking. Enjoy every moment in the kitchen, dear!" 👵❤️
        </p>
      </div>
    </div>
  )
}
