import { useAppStore } from '../store/appStore'
import { RecipeMatch } from '../types'
import RecipeCard from './RecipeCard'
import { FiArrowLeft } from 'react-icons/fi'

interface RecipeResultsProps {
  results: RecipeMatch[]
  onBack: () => void
}

export default function RecipeResults({ results, onBack }: RecipeResultsProps) {
  const { selectedIngredients } = useAppStore()

  if (results.length === 0) {
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
            No recipes found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find recipes that match your ingredients. Try adding
            more ingredients or check your selection.
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
          Found {results.length} recipes!
        </h2>
        <p className="text-gray-600">
          Based on: <strong>{selectedIngredients.join(', ')}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((match) => (
          <RecipeCard
            key={match.recipe.id}
            recipe={match.recipe}
            matchPercentage={match.matchPercentage}
          />
        ))}
      </div>

      {results.length > 0 && (
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still looking for something specific?
          </p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-medium"
          >
            Search Again
          </button>
        </div>
      )}
    </div>
  )
}
