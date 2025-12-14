import { useState } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { useAppStore } from '../store/appStore'
import { UserProfile } from '../types'

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    skillLevel: 'Intermediate',
    flavorPreferences: [],
    dietaryRestrictions: [],
    timeAvailable: 30,
    effortTolerance: 3,
    favoriteCuisines: [],
    pantryStaples: [],
  })

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Chef']
  const flavorOptions = [
    'Spicy',
    'Sweet',
    'Savory',
    'Umami',
    'Sour',
    'Comfort',
    'Healthy',
    'Exotic',
  ]
  const cuisines = ['Asian', 'Italian', 'Mexican', 'Indian', 'Mediterranean', 'Thai', 'American']
  const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Nut-free']
  const effortLevels = ['Very Low', 'Low', 'Medium', 'High', 'Very High']

  const toggleArrayField = (field: keyof UserProfile, value: string) => {
    setFormData((prev) => {
      const arr = (prev[field] as string[]) || []
      return {
        ...prev,
        [field]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      }
    })
  }

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1)
    } else {
      const profile: UserProfile = {
        skillLevel: formData.skillLevel as any,
        flavorPreferences: formData.flavorPreferences || [],
        dietaryRestrictions: formData.dietaryRestrictions || [],
        timeAvailable: formData.timeAvailable || 30,
        effortTolerance: formData.effortTolerance || 3,
        favoriteCuisines: formData.favoriteCuisines || [],
        pantryStaples: formData.pantryStaples || [],
        completedOnboarding: true,
      }
      onComplete(profile)
    }
  }

  const handlePrev = () => {
    if (step > 0) setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-white to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-dark mb-2">🧊 FridgeChef</h1>
          <p className="text-gray-600">Get to know your palate</p>
          <div className="mt-4 flex gap-1">
            {Array(7)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all ${
                    i < step + 1 ? 'bg-primary w-8' : 'bg-gray-300 w-4'
                  }`}
                />
              ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-bold text-dark mb-6">
                What's your cooking skill level?
              </h2>
              <div className="space-y-3">
                {skillLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setFormData({ ...formData, skillLevel: level as any })}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                      formData.skillLevel === level
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4">
                This helps us suggest recipes matching your abilities
              </p>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-dark mb-6">
                What flavors do you love?
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {flavorOptions.map((flavor) => (
                  <button
                    key={flavor}
                    onClick={() =>
                      toggleArrayField('flavorPreferences', flavor)
                    }
                    className={`p-3 rounded-lg border-2 transition-all font-medium text-sm ${
                      (formData.flavorPreferences || []).includes(flavor)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-dark mb-6">
                Dietary restrictions?
              </h2>
              <div className="space-y-3">
                {dietaryOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary/50 transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={(formData.dietaryRestrictions || []).includes(
                        option
                      )}
                      onChange={() =>
                        toggleArrayField('dietaryRestrictions', option)
                      }
                      className="w-4 h-4"
                    />
                    <span className="ml-3 font-medium">{option}</span>
                  </label>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Select all that apply (or leave empty)
              </p>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-dark mb-6">
                How much time do you usually have?
              </h2>
              <div className="space-y-4">
                <input
                  type="range"
                  min="10"
                  max="120"
                  value={formData.timeAvailable || 30}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      timeAvailable: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">
                    {formData.timeAvailable} mins
                  </p>
                  <p className="text-gray-600 mt-2">
                    {formData.timeAvailable! <= 20
                      ? '⚡ Quick & Easy'
                      : formData.timeAvailable! <= 45
                      ? '🕐 Moderate'
                      : '👨‍🍳 Plenty of Time'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-dark mb-6">
                How much effort are you willing to put in?
              </h2>
              <div className="space-y-3">
                {effortLevels.map((level, idx) => (
                  <button
                    key={level}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        effortTolerance: idx + 1,
                      })
                    }
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
                      formData.effortTolerance === idx + 1
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    {level}
                    <span className="text-xs ml-2">
                      {idx === 0 ? '🥣' : idx === 1 ? '🍳' : idx === 2 ? '👨‍🍳' : '🔥'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-dark mb-6">
                Favorite cuisines?
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {cuisines.map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => toggleArrayField('favoriteCuisines', cuisine)}
                    className={`p-3 rounded-lg border-2 transition-all font-medium text-sm ${
                      (formData.favoriteCuisines || []).includes(cuisine)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-dark mb-3">
                You're all set!
              </h2>
              <p className="text-gray-600 mb-6">
                Your profile is ready. Now let's find some delicious recipes!
              </p>
              <div className="bg-primary/10 border-2 border-primary rounded-lg p-4">
                <p className="text-sm text-dark">
                  <strong>Pro tip:</strong> Add ingredients from your fridge to
                  get personalized recipe suggestions
                </p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={handlePrev}
              disabled={step === 0}
              className="flex-1 py-3 rounded-lg border-2 border-gray-300 font-medium transition-all disabled:opacity-50 hover:enabled:border-gray-400"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="flex-1 py-3 rounded-lg bg-primary text-white font-medium transition-all hover:bg-primary/90 flex items-center justify-center gap-2"
            >
              {step === 6 ? 'Start' : 'Next'} <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
