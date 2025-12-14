import { useState } from 'react'
import { FiChevronDown, FiBookmark, FiShare2, FiClock, FiTrendingUp } from 'react-icons/fi'
import { useAppStore } from '../store/appStore'
import { Recipe } from '../types'

interface RecipeCardProps {
  recipe: Recipe
  matchPercentage: number
}

export default function RecipeCard({ recipe, matchPercentage }: RecipeCardProps) {
  const { isSaved, saveRecipe, unsaveRecipe } = useAppStore()
  const [expanded, setExpanded] = useState(false)
  const saved = isSaved(recipe.id)

  const totalTime = recipe.prepTime + recipe.cookTime
  const difficultyColor =
    recipe.difficulty === 'Beginner'
      ? 'text-green-600 bg-green-50'
      : recipe.difficulty === 'Intermediate'
      ? 'text-yellow-600 bg-yellow-50'
      : 'text-red-600 bg-red-50'

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
      {/* Image and Basic Info */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <div className={`${difficultyColor} px-3 py-1 rounded-full text-sm font-medium`}>
            {recipe.difficulty}
          </div>
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {matchPercentage}%
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-dark mb-2">{recipe.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{recipe.description}</p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FiClock size={16} />
            <span>{totalTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <FiTrendingUp size={16} />
            <span>⭐ {recipe.rating} ({recipe.reviews})</span>
          </div>
          <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
            {recipe.cuisine}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expandable Section */}
        {expanded && (
          <div className="border-t pt-4 mt-4 space-y-4">
            {/* Ingredients */}
            <div>
              <h4 className="font-bold text-dark mb-2">Ingredients:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {recipe.ingredients.map((ing) => (
                  <li key={ing.name} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      {ing.amount} {ing.unit} {ing.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h4 className="font-bold text-dark mb-2">Instructions:</h4>
              <ol className="text-sm text-gray-700 space-y-2">
                {recipe.instructions.map((instruction, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="font-bold text-primary flex-shrink-0">
                      {idx + 1}.
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Nutrition */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs font-medium text-gray-600 mb-2">
                Servings: {recipe.servings}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex-1 py-2 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all font-medium text-sm flex items-center justify-center gap-2"
          >
            {expanded ? 'Hide' : 'View'} Recipe
            <FiChevronDown
              size={16}
              className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
          <button
            onClick={() =>
              saved ? unsaveRecipe(recipe.id) : saveRecipe(recipe.id)
            }
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
