import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserProfile, Recipe } from '../types'

interface AppState {
  userProfile: UserProfile | null
  selectedIngredients: string[]
  savedRecipes: string[]
  setUserProfile: (profile: UserProfile) => void
  addIngredient: (ingredient: string) => void
  removeIngredient: (ingredient: string) => void
  clearIngredients: () => void
  saveRecipe: (recipeId: string) => void
  unsaveRecipe: (recipeId: string) => void
  isSaved: (recipeId: string) => boolean
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      userProfile: null,
      selectedIngredients: [],
      savedRecipes: [],
      setUserProfile: (profile) => set({ userProfile: profile }),
      addIngredient: (ingredient) =>
        set((state) => ({
          selectedIngredients: [...new Set([...state.selectedIngredients, ingredient.toLowerCase()])],
        })),
      removeIngredient: (ingredient) =>
        set((state) => ({
          selectedIngredients: state.selectedIngredients.filter(
            (i) => i !== ingredient.toLowerCase()
          ),
        })),
      clearIngredients: () => set({ selectedIngredients: [] }),
      saveRecipe: (recipeId) =>
        set((state) => ({
          savedRecipes: [...new Set([...state.savedRecipes, recipeId])],
        })),
      unsaveRecipe: (recipeId) =>
        set((state) => ({
          savedRecipes: state.savedRecipes.filter((id) => id !== recipeId),
        })),
      isSaved: (recipeId) => get().savedRecipes.includes(recipeId),
    }),
    {
      name: 'fridge-chef-store',
    }
  )
)
