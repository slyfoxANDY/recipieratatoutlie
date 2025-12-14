import { useState } from 'react'
import { FiX, FiSearch } from 'react-icons/fi'
import { useAppStore } from '../store/appStore'
import { commonIngredients } from '../data/recipes'

interface IngredientInputProps {
  onSearch: () => void
}

export default function IngredientInput({ onSearch }: IngredientInputProps) {
  const { selectedIngredients, addIngredient, removeIngredient } = useAppStore()
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleInputChange = (value: string) => {
    setInput(value)
    if (value.length > 1) {
      const filtered = commonIngredients.filter((ing) =>
        ing.toLowerCase().includes(value.toLowerCase())
      )
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }

  const handleAddIngredient = (ingredient: string) => {
    if (ingredient.trim() && !selectedIngredients.includes(ingredient.trim().toLowerCase())) {
      addIngredient(ingredient.trim())
      setInput('')
      setSuggestions([])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddIngredient(input)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-dark mb-4">
          What's in your fridge?
        </h2>

        {/* Input Section */}
        <div className="relative mb-6">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type an ingredient (e.g., chicken, tomato)..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-all"
              />
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-10">
                  {suggestions.slice(0, 5).map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleAddIngredient(suggestion)}
                      className="w-full text-left px-4 py-2 hover:bg-primary/10 transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => handleAddIngredient(input)}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-medium"
            >
              Add
            </button>
          </div>
        </div>

        {/* Quick Add Suggestions */}
        {selectedIngredients.length === 0 && (
          <div className="mb-6 p-4 bg-accent/10 rounded-lg">
            <p className="text-sm font-medium text-dark mb-3">Quick add:</p>
            <div className="flex flex-wrap gap-2">
              {['chicken', 'rice', 'eggs', 'garlic', 'onion', 'tomato'].map(
                (ing) => (
                  <button
                    key={ing}
                    onClick={() => handleAddIngredient(ing)}
                    className="px-3 py-1 bg-white border-2 border-accent/50 rounded-full text-sm hover:border-accent transition-all"
                  >
                    + {ing}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Selected Ingredients */}
        {selectedIngredients.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-medium text-dark mb-3">
              Selected ({selectedIngredients.length}):
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedIngredients.map((ingredient) => (
                <div
                  key={ingredient}
                  className="px-4 py-2 bg-primary/10 border-2 border-primary rounded-full flex items-center gap-2"
                >
                  <span className="text-dark font-medium capitalize">
                    {ingredient}
                  </span>
                  <button
                    onClick={() => removeIngredient(ingredient)}
                    className="hover:text-primary/70 transition-all"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search Button */}
        <button
          onClick={onSearch}
          disabled={selectedIngredients.length === 0}
          className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all font-medium text-lg flex items-center justify-center gap-2"
        >
          <FiSearch /> Find Recipes
        </button>

        {selectedIngredients.length === 0 && (
          <p className="text-center text-gray-500 text-sm mt-4">
            Add at least one ingredient to get started
          </p>
        )}
      </div>
    </div>
  )
}
