import { Recipe, RecipeMatch, UserProfile } from '../types'

export const recipeDatabase: Recipe[] = [
  {
    id: 'recipe_001',
    name: 'Stir-Fried Chicken with Broccoli',
    description: 'Quick and healthy Asian-inspired dish with tender chicken and crisp broccoli',
    cuisine: 'Asian',
    difficulty: 'Beginner',
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    ingredients: [
      { name: 'chicken breast', amount: 300, unit: 'g' },
      { name: 'broccoli', amount: 2, unit: 'cups' },
      { name: 'soy sauce', amount: 2, unit: 'tbsp' },
      { name: 'garlic', amount: 2, unit: 'cloves' },
      { name: 'ginger', amount: 1, unit: 'tbsp' },
      { name: 'oil', amount: 1, unit: 'tbsp' },
    ],
    instructions: [
      'Heat oil in a wok or large pan over high heat',
      'Add minced garlic and ginger, stir for 30 seconds',
      'Add diced chicken breast and cook until no longer pink (5-7 minutes)',
      'Add broccoli florets and stir-fry for 5-8 minutes',
      'Pour soy sauce and toss everything together',
      'Serve hot over rice or noodles',
    ],
    tags: ['quick', 'healthy', 'protein-rich'],
    flavorProfile: ['savory', 'umami'],
    image: 'https://images.unsplash.com/photo-1609611033451-8e4f4efa0ddb?w=500&h=300&fit=crop',
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 'recipe_002',
    name: 'Pasta Aglio e Olio',
    description: 'Simple Italian classic with just garlic, olive oil, and red pepper flakes',
    cuisine: 'Italian',
    difficulty: 'Beginner',
    prepTime: 5,
    cookTime: 15,
    servings: 2,
    ingredients: [
      { name: 'pasta', amount: 200, unit: 'g' },
      { name: 'garlic', amount: 6, unit: 'cloves' },
      { name: 'olive oil', amount: 4, unit: 'tbsp' },
      { name: 'red pepper flakes', amount: 0.5, unit: 'tsp' },
      { name: 'salt', amount: 1, unit: 'pinch' },
      { name: 'parsley', amount: 2, unit: 'tbsp' },
    ],
    instructions: [
      'Boil pasta in salted water according to package directions',
      'While pasta cooks, heat olive oil in a large pan',
      'Add thinly sliced garlic and red pepper flakes, cook until fragrant (2-3 minutes)',
      'Drain pasta, reserving 1/2 cup pasta water',
      'Add pasta to garlic oil, toss well',
      'Add pasta water as needed to create creamy sauce',
      'Top with fresh parsley and serve immediately',
    ],
    tags: ['vegetarian', 'quick', 'simple'],
    flavorProfile: ['savory', 'garlicky'],
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=300&fit=crop',
    rating: 4.8,
    reviews: 250,
  },
  {
    id: 'recipe_003',
    name: 'Egg Fried Rice',
    description: 'Perfect way to use leftover rice with eggs, peas, and soy sauce',
    cuisine: 'Asian',
    difficulty: 'Beginner',
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    ingredients: [
      { name: 'rice', amount: 2, unit: 'cups' },
      { name: 'eggs', amount: 2, unit: 'whole' },
      { name: 'peas', amount: 0.5, unit: 'cup' },
      { name: 'soy sauce', amount: 2, unit: 'tbsp' },
      { name: 'sesame oil', amount: 1, unit: 'tbsp' },
      { name: 'oil', amount: 1, unit: 'tbsp' },
      { name: 'green onions', amount: 2, unit: 'stalks' },
    ],
    instructions: [
      'Heat oil in a wok or large skillet over high heat',
      'Scramble eggs and set aside',
      'Add rice, breaking up clumps, and stir-fry for 2-3 minutes',
      'Add peas and cooked eggs back to pan',
      'Pour soy sauce and drizzle sesame oil',
      'Toss well and top with sliced green onions',
      'Serve hot',
    ],
    tags: ['quick', 'leftovers', 'comfort'],
    flavorProfile: ['savory', 'umami'],
    image: 'https://images.unsplash.com/photo-1603894542802-f3a0a5fe0d6b?w=500&h=300&fit=crop',
    rating: 4.3,
    reviews: 180,
  },
  {
    id: 'recipe_004',
    name: 'Tomato Basil Pasta',
    description: 'Fresh and light pasta with homemade tomato sauce and basil',
    cuisine: 'Italian',
    difficulty: 'Intermediate',
    prepTime: 10,
    cookTime: 25,
    servings: 3,
    ingredients: [
      { name: 'pasta', amount: 300, unit: 'g' },
      { name: 'tomatoes', amount: 400, unit: 'g' },
      { name: 'garlic', amount: 3, unit: 'cloves' },
      { name: 'basil', amount: 8, unit: 'leaves' },
      { name: 'olive oil', amount: 3, unit: 'tbsp' },
      { name: 'onion', amount: 1, unit: 'whole' },
      { name: 'salt', amount: 1, unit: 'pinch' },
    ],
    instructions: [
      'Boil pasta in salted water according to package directions',
      'Heat olive oil and sauté diced onion until soft',
      'Add minced garlic and cook for 1 minute',
      'Add crushed tomatoes, salt, and simmer for 15-20 minutes',
      'Tear fresh basil and stir into sauce (keep some for garnish)',
      'Drain pasta and mix with sauce',
      'Serve topped with remaining basil and olive oil',
    ],
    tags: ['vegetarian', 'healthy', 'comfort'],
    flavorProfile: ['savory', 'fresh', 'herbaceous'],
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=300&fit=crop',
    rating: 4.6,
    reviews: 95,
  },
  {
    id: 'recipe_005',
    name: 'Grilled Chicken with Lemon',
    description: 'Zesty grilled chicken with lemon and herbs',
    cuisine: 'Mediterranean',
    difficulty: 'Intermediate',
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    ingredients: [
      { name: 'chicken breast', amount: 400, unit: 'g' },
      { name: 'lemon', amount: 1, unit: 'whole' },
      { name: 'garlic', amount: 2, unit: 'cloves' },
      { name: 'olive oil', amount: 3, unit: 'tbsp' },
      { name: 'herbs', amount: 1, unit: 'tbsp' },
      { name: 'salt', amount: 1, unit: 'pinch' },
      { name: 'pepper', amount: 1, unit: 'pinch' },
    ],
    instructions: [
      'Mix olive oil, minced garlic, lemon juice, herbs, salt and pepper',
      'Marinate chicken for 10-15 minutes',
      'Heat grill or grill pan to medium-high heat',
      'Grill chicken 6-8 minutes per side until cooked through',
      'Rest for 5 minutes before serving',
      'Serve with lemon wedges',
    ],
    tags: ['protein', 'healthy', 'grilled'],
    flavorProfile: ['savory', 'citrusy'],
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&h=300&fit=crop',
    rating: 4.7,
    reviews: 140,
  },
  {
    id: 'recipe_006',
    name: 'Mushroom Risotto',
    description: 'Creamy and luxurious Italian rice dish with mushrooms',
    cuisine: 'Italian',
    difficulty: 'Intermediate',
    prepTime: 10,
    cookTime: 30,
    servings: 3,
    ingredients: [
      { name: 'arborio rice', amount: 1.5, unit: 'cups' },
      { name: 'mushrooms', amount: 200, unit: 'g' },
      { name: 'white wine', amount: 0.5, unit: 'cup' },
      { name: 'vegetable broth', amount: 4, unit: 'cups' },
      { name: 'onion', amount: 0.5, unit: 'whole' },
      { name: 'garlic', amount: 1, unit: 'clove' },
      { name: 'butter', amount: 2, unit: 'tbsp' },
      { name: 'parmesan', amount: 0.5, unit: 'cup' },
    ],
    instructions: [
      'Heat vegetable broth in a separate pot',
      'Sauté diced onion and garlic in butter until soft',
      'Add sliced mushrooms and cook until golden',
      'Add arborio rice and stir for 1-2 minutes',
      'Pour white wine and stir until absorbed',
      'Add hot broth one ladle at a time, stirring constantly',
      'Continue until rice is creamy and tender (18-20 minutes)',
      'Stir in remaining butter and parmesan',
      'Serve immediately',
    ],
    tags: ['vegetarian', 'comfort', 'special'],
    flavorProfile: ['savory', 'umami', 'creamy'],
    image: 'https://images.unsplash.com/photo-1599748236585-e12fb62af317?w=500&h=300&fit=crop',
    rating: 4.9,
    reviews: 210,
  },
  {
    id: 'recipe_007',
    name: 'Simple Salad',
    description: 'Fresh garden salad with basic vinaigrette',
    cuisine: 'American',
    difficulty: 'Beginner',
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    ingredients: [
      { name: 'lettuce', amount: 4, unit: 'cups' },
      { name: 'tomato', amount: 2, unit: 'whole' },
      { name: 'cucumber', amount: 1, unit: 'whole' },
      { name: 'olive oil', amount: 2, unit: 'tbsp' },
      { name: 'vinegar', amount: 1, unit: 'tbsp' },
      { name: 'salt', amount: 1, unit: 'pinch' },
      { name: 'pepper', amount: 1, unit: 'pinch' },
    ],
    instructions: [
      'Wash and chop lettuce into bite-sized pieces',
      'Dice tomatoes and cucumber',
      'Whisk together olive oil, vinegar, salt, and pepper',
      'Toss vegetables with dressing',
      'Serve immediately',
    ],
    tags: ['healthy', 'quick', 'vegetarian'],
    flavorProfile: ['fresh', 'crisp'],
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=300&fit=crop',
    rating: 4.2,
    reviews: 75,
  },
  {
    id: 'recipe_008',
    name: 'Spicy Thai Curry',
    description: 'Aromatic and spicy Thai curry with coconut milk',
    cuisine: 'Thai',
    difficulty: 'Advanced',
    prepTime: 15,
    cookTime: 20,
    servings: 3,
    ingredients: [
      { name: 'chicken', amount: 400, unit: 'g' },
      { name: 'coconut milk', amount: 1, unit: 'can' },
      { name: 'curry paste', amount: 2, unit: 'tbsp' },
      { name: 'fish sauce', amount: 1, unit: 'tbsp' },
      { name: 'lime', amount: 1, unit: 'whole' },
      { name: 'basil', amount: 8, unit: 'leaves' },
      { name: 'chili', amount: 1, unit: 'whole' },
      { name: 'vegetables', amount: 2, unit: 'cups' },
    ],
    instructions: [
      'Heat a pan and add curry paste, fry for 1 minute',
      'Pour coconut milk and stir well',
      'Add diced chicken and bring to simmer',
      'Add vegetables and fish sauce',
      'Simmer for 15-20 minutes until chicken is cooked',
      'Add lime juice and fresh basil',
      'Garnish with sliced chili',
      'Serve over rice',
    ],
    tags: ['spicy', 'exotic', 'protein'],
    flavorProfile: ['spicy', 'umami', 'aromatic'],
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&h=300&fit=crop',
    rating: 4.6,
    reviews: 165,
  },
  {
    id: 'recipe_009',
    name: 'Vegetable Soup',
    description: 'Hearty vegetable soup perfect for any season',
    cuisine: 'American',
    difficulty: 'Beginner',
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    ingredients: [
      { name: 'carrots', amount: 2, unit: 'whole' },
      { name: 'celery', amount: 2, unit: 'stalks' },
      { name: 'potatoes', amount: 2, unit: 'whole' },
      { name: 'onion', amount: 1, unit: 'whole' },
      { name: 'vegetable broth', amount: 6, unit: 'cups' },
      { name: 'tomatoes', amount: 1, unit: 'can' },
      { name: 'salt', amount: 1, unit: 'pinch' },
      { name: 'pepper', amount: 1, unit: 'pinch' },
    ],
    instructions: [
      'Chop all vegetables into bite-sized pieces',
      'Heat vegetable broth in a large pot',
      'Add onion, carrots, celery, and potatoes',
      'Bring to boil and simmer for 20 minutes',
      'Add tomatoes and simmer for 10 more minutes',
      'Season with salt and pepper',
      'Serve hot',
    ],
    tags: ['healthy', 'comfort', 'vegetarian'],
    flavorProfile: ['savory', 'wholesome'],
    image: 'https://images.unsplash.com/photo-1547592166-7aae4d755744?w=500&h=300&fit=crop',
    rating: 4.4,
    reviews: 110,
  },
  {
    id: 'recipe_010',
    name: 'Caesar Salad with Chicken',
    description: 'Classic Caesar salad with grilled chicken and parmesan',
    cuisine: 'American',
    difficulty: 'Intermediate',
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    ingredients: [
      { name: 'romaine lettuce', amount: 1, unit: 'head' },
      { name: 'chicken breast', amount: 200, unit: 'g' },
      { name: 'parmesan', amount: 0.25, unit: 'cup' },
      { name: 'caesar dressing', amount: 3, unit: 'tbsp' },
      { name: 'croutons', amount: 0.5, unit: 'cup' },
      { name: 'lemon', amount: 0.5, unit: 'whole' },
    ],
    instructions: [
      'Grill chicken breast until cooked through (6-8 minutes per side)',
      'Let chicken rest, then slice',
      'Wash and chop romaine lettuce',
      'Toss lettuce with caesar dressing',
      'Top with sliced chicken, parmesan, and croutons',
      'Serve immediately',
    ],
    tags: ['healthy', 'protein', 'salad'],
    flavorProfile: ['savory', 'tangy'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop',
    rating: 4.7,
    reviews: 190,
  },
]

export const matchRecipes = (
  ingredients: string[],
  userProfile: UserProfile | null
): RecipeMatch[] => {
  const normalizedIngredients = ingredients.map((i) => i.toLowerCase())

  return recipeDatabase
    .map((recipe) => {
      const recipeIngredientsLower = recipe.ingredients.map((i) =>
        i.name.toLowerCase()
      )

      // Calculate match percentage
      const matchedIngredients = recipeIngredientsLower.filter((ingredient) =>
        normalizedIngredients.some((userIng) => 
          ingredient.includes(userIng) || userIng.includes(ingredient)
        )
      )

      const matchPercentage =
        (matchedIngredients.length / recipeIngredientsLower.length) * 100

      // Calculate score based on multiple factors
      let score = matchPercentage

      // Adjust score based on user profile
      if (userProfile) {
        // Difficulty matching
        const difficultyScore =
          recipe.difficulty === userProfile.skillLevel ? 20 : 0

        // Time preference (prefer recipes within available time)
        const totalTime = recipe.prepTime + recipe.cookTime
        const timeBonus =
          totalTime <= userProfile.timeAvailable ? 15 : -10

        // Flavor preference matching
        const flavorBonus = recipe.flavorProfile.some((f) =>
          userProfile.flavorPreferences.includes(f)
        )
          ? 15
          : 0

        // Cuisine preference
        const cuisineBonus = userProfile.favoriteCuisines.includes(
          recipe.cuisine
        )
          ? 10
          : 0

        score += difficultyScore + timeBonus + flavorBonus + cuisineBonus
      }

      return {
        recipe,
        matchScore: score,
        matchPercentage: Math.round(matchPercentage),
      }
    })
    .filter((match) => match.matchPercentage >= 30) // Only show recipes with at least 30% matches
    .sort((a, b) => b.matchScore - a.matchScore)
}

export const commonIngredients = [
  'chicken',
  'beef',
  'pork',
  'fish',
  'shrimp',
  'eggs',
  'milk',
  'cheese',
  'butter',
  'oil',
  'olive oil',
  'sesame oil',
  'garlic',
  'onion',
  'tomato',
  'lettuce',
  'spinach',
  'broccoli',
  'carrot',
  'potato',
  'rice',
  'pasta',
  'bread',
  'flour',
  'sugar',
  'salt',
  'pepper',
  'soy sauce',
  'vinegar',
  'lemon',
  'lime',
  'basil',
  'parsley',
  'ginger',
  'mushroom',
  'bean',
  'peas',
  'corn',
  'cucumber',
  'bell pepper',
  'celery',
  'milk',
]
