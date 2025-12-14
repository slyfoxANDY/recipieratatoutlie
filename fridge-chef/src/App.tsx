import { useState, useEffect } from 'react'
import { useAppStore } from './store/appStore'
import { matchRecipes } from './data/recipes'
import { RecipeMatch } from './types'
import Onboarding from './components/Onboarding'
import Header from './components/Header'
import IngredientInput from './components/IngredientInput'
import RecipeResults from './components/RecipeResults'
import ChatRecipeInterface from './components/ChatRecipeInterface'

type AppState = 'onboarding' | 'main' | 'results' | 'chat' | 'settings'

export default function App() {
  const { userProfile, setUserProfile, selectedIngredients } = useAppStore()
  const [appState, setAppState] = useState<AppState>('onboarding')
  const [results, setResults] = useState<RecipeMatch[]>([])

  // Check if user has completed onboarding
  useEffect(() => {
    if (userProfile?.completedOnboarding) {
      setAppState('main')
    }
  }, [userProfile])

  const handleOnboardingComplete = (profile: any) => {
    setUserProfile(profile)
    setAppState('main')
  }

  const handleSearch = () => {
    setAppState('chat')
  }

  const handleBack = () => {
    setAppState('main')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {appState === 'onboarding' && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}

      {appState !== 'onboarding' && (
        <>
          <Header onShowSettings={() => setAppState('settings')} />

          {appState === 'chat' ? (
            // Chat interface takes full height, no padding/max-width constraints
            <ChatRecipeInterface onBack={handleBack} />
          ) : (
            // Other views use normal main container
            <main className="max-w-6xl mx-auto px-4 py-8">
            {appState === 'main' && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-dark mb-2">
                    Let's cook something amazing!
                  </h1>
                  <p className="text-gray-600">
                    Tell us what ingredients you have available
                  </p>
                </div>
                <IngredientInput onSearch={handleSearch} />
              </div>
            )}

            {appState === 'results' && (
              <RecipeResults results={results} onBack={handleBack} />
            )}

            {appState === 'chat' && (
              <ChatRecipeInterface onBack={handleBack} />
            )}

            {appState === 'settings' && (
              <div className="max-w-2xl mx-auto">
                <button
                  onClick={() => setAppState('main')}
                  className="mb-6 text-primary hover:text-primary/80 font-medium transition-all"
                >
                  ← Back
                </button>
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-dark mb-6">
                    Your Profile
                  </h2>

                  {userProfile && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Skill Level
                        </label>
                        <p className="text-lg font-bold text-dark">
                          {userProfile.skillLevel}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Flavor Preferences
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {userProfile.flavorPreferences.map((flavor) => (
                            <span
                              key={flavor}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                            >
                              {flavor}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Time Available
                        </label>
                        <p className="text-lg font-bold text-dark">
                          {userProfile.timeAvailable} minutes
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Effort Tolerance
                        </label>
                        <p className="text-lg font-bold text-dark">
                          {['', 'Very Low', 'Low', 'Medium', 'High', 'Very High'][
                            userProfile.effortTolerance
                          ]}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Favorite Cuisines
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {userProfile.favoriteCuisines.map((cuisine) => (
                            <span
                              key={cuisine}
                              className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                            >
                              {cuisine}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => setAppState('main')}
                        className="w-full mt-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-medium"
                      >
                        Continue
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            </main>
          )}

          <footer className="bg-dark text-white py-8 mt-16">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <p className="mb-2">
                Made with ❤️ by <strong>FridgeChef</strong>
              </p>
              <p className="text-sm text-gray-400">
                Your personal recipe assistant powered by your ingredients
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}
