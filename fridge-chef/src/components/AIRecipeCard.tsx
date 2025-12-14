import { useState } from 'react'
import { FiChevronDown, FiBookmark, FiShare2, FiClock, FiTrendingUp, FiLoader } from 'react-icons/fi'
import { useAppStore } from '../store/appStore'
import { AIRecipe } from '../services/aiService'

interface AIRecipeCardProps {
  recipe: AIRecipe
  index: number
}

export default function AIRecipeCard({ recipe, index }: AIRecipeCardProps) {
  const { saveRecipe, unsaveRecipe, isSaved } = useAppStore()
  const [expanded, setExpanded] = useState(index === 0) // Expand first recipe by default
  const saved = isSaved(recipe.name)

  const difficultyColor =
    recipe.difficulty === 'Beginner'
      ? 'text-green-600 bg-green-50'
      : recipe.difficulty === 'Intermediate'
      ? 'text-yellow-600 bg-yellow-50'
      : 'text-red-600 bg-red-50'

  const handleSave = () => {
    if (saved) {
      unsaveRecipe(recipe.name)
    } else {
      saveRecipe(recipe.name)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all border-2 border-primary/20">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-dark mb-2">{recipe.name}</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {recipe.description}
            </p>
          </div>
          <div className={`${difficultyColor} px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ml-4`}>
            {recipe.difficulty}
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FiClock size={16} />
            <span>{recipe.cookTime} min</span>
          </div>
          <span className="px-2 py-1 bg-white rounded text-xs font-medium">
            Serves {recipe.servings}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Ingredients */}
        <div className="mb-6">
          <h4 className="font-bold text-dark mb-3 flex items-center gap-2">
            <span>🛒 Ingredients</span>
          </h4>
          <ul className="text-sm text-gray-700 space-y-2">
            {recipe.ingredients.map((ingredient, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Expandable Instructions */}
        {expanded && (
          <div className="space-y-6 border-t pt-6 mb-6">
            {/* Instructions */}
            <div>
              <h4 className="font-bold text-dark mb-3 flex items-center gap-2">
                <span>👨‍🍳 Step-by-Step Instructions</span>
              </h4>
              <ol className="text-sm text-gray-700 space-y-3">
                {recipe.instructions.map((instruction, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="font-bold text-primary flex-shrink-0 bg-primary/10 w-7 h-7 rounded-full flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Chef's Tip */}
            <div className="bg-accent/10 border-l-4 border-accent p-4 rounded">
              <p className="text-sm text-dark">
                <strong>👵 Nonna's Tip:</strong> {recipe.tips}
              </p>
            </div>
          </div>
        )}

        {/* Toggle & Actions */}
        <div className="flex gap-2 pt-4 border-t">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex-1 py-2 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all font-medium text-sm flex items-center justify-center gap-2"
          >
            {expanded ? 'Hide' : 'View'} Instructions
            <FiChevronDown
              size={16}
              className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
          <button
            onClick={handleSave}
            className={`py-2 px-4 rounded-lg transition-all font-medium text-sm ${
              saved
                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={saved ? 'Remove from saved' : 'Save recipe'}
          >
            <FiBookmark size={16} fill={saved ? 'currentColor' : 'none'} />
          </button>
          <button
            className="py-2 px-4 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-all font-medium text-sm"
            title="Share recipe"
          >
            <FiShare2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
