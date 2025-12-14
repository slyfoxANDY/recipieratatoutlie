export interface Recipe {
  id: string
  name: string
  description: string
  cuisine: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  prepTime: number
  cookTime: number
  servings: number
  ingredients: Ingredient[]
  instructions: string[]
  tags: string[]
  flavorProfile: string[]
  image: string
  rating: number
  reviews: number
}

export interface Ingredient {
  name: string
  amount: number
  unit: string
}

export interface UserProfile {
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Chef'
  flavorPreferences: string[]
  dietaryRestrictions: string[]
  timeAvailable: number
  effortTolerance: number
  favoriteCuisines: string[]
  pantryStaples: string[]
  completedOnboarding: boolean
}

export interface RecipeMatch {
  recipe: Recipe
  matchScore: number
  matchPercentage: number
}
