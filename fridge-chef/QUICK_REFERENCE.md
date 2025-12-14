# 🧊 FridgeChef - Quick Reference Card

## 🚀 Get Started (3 Commands)

```bash
cd fridge-chef
npm install
npm run dev
```

**App opens at:** http://localhost:3000

---

## 📁 Key Files To Modify

| File | Purpose | What To Change |
|------|---------|----------------|
| `src/data/recipes.ts` | Recipe database | Add/edit recipes |
| `tailwind.config.js` | Colors & theme | Change app colors |
| `src/components/Onboarding.tsx` | Quiz questions | Modify preferences |
| `src/components/Header.tsx` | Navigation | Add menu items |
| `public/manifest.json` | App name & icon | Rebrand app |

---

## 🎨 Color Variables

```javascript
// In tailwind.config.js
primary: '#2ECC71'    // Green (main)
accent: '#F39C12'     // Orange (highlights)
dark: '#2C3E50'       // Dark (text)
```

---

## 📦 Build & Deploy

```bash
# Production build
npm run build

# Preview build locally
npm run preview

# Deploy to Vercel
vercel

# Deploy to Netlify
# Connect GitHub repo → auto-deploy
```

---

## 📱 Test on Mobile

### Local Testing
```bash
# Get your computer's IP
ipconfig getifaddr en0  # Mac
ipconfig             # Windows

# Visit: http://YOUR_IP:3000
```

### PWA Installation
- Desktop: Click install icon in address bar
- Mobile: Tap menu → "Add to Home Screen"

---

## 📊 Add New Recipe

```typescript
// In src/data/recipes.ts, add to recipeDatabase array:

{
  id: 'recipe_011',
  name: 'Your Recipe Name',
  description: 'Brief description',
  cuisine: 'Asian',
  difficulty: 'Beginner',  // or Intermediate, Advanced
  prepTime: 10,
  cookTime: 20,
  servings: 2,
  ingredients: [
    { name: 'chicken', amount: 200, unit: 'g' },
    { name: 'garlic', amount: 2, unit: 'cloves' },
  ],
  instructions: [
    'Step 1 here',
    'Step 2 here',
  ],
  tags: ['quick', 'easy'],
  flavorProfile: ['savory', 'umami'],
  image: 'https://url-to-image.jpg',
  rating: 4.5,
  reviews: 100,
}
```

---

## 🔄 State Management (Zustand)

```typescript
// In any component:
import { useAppStore } from '@/store/appStore'

const { 
  userProfile,           // User preferences
  selectedIngredients,   // Current ingredients
  savedRecipes,          // Bookmarked recipes
  addIngredient,         // Add ingredient
  saveRecipe,            // Save recipe
} = useAppStore()
```

---

## 🎯 Algorithm Tweak

```typescript
// In src/data/recipes.ts, matchRecipes() function:

// Change match threshold (higher = stricter):
.filter((match) => match.matchPercentage >= 30)

// Adjust scoring weights:
const difficultyScore = recipe.difficulty === userProfile.skillLevel ? 20 : 0
// Change 20 to higher/lower
```

---

## 🧪 Debug Tips

### Check State
```javascript
// In browser console:
localStorage.getItem('fridge-chef-store')
```

### View Network
```
DevTools > Network tab > Check service worker cache
```

### React DevTools
- Install "React Developer Tools" extension
- Inspect components, props, state

### Service Worker
```
DevTools > Application > Service Workers
```

---

## 📝 TypeScript Interfaces

```typescript
// Recipe structure
interface Recipe {
  id: string
  name: string
  ingredients: Ingredient[]
  instructions: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  // ... more fields
}

// User profile
interface UserProfile {
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Chef'
  flavorPreferences: string[]
  dietaryRestrictions: string[]
  timeAvailable: number
  // ... more fields
}
```

---

## 🚫 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Service Worker not caching | Clear cache: DevTools > Application > Clear |
| Recipes not showing | Add more ingredients, lower match threshold |
| Styles broken after build | Run `npm install` again |
| Port 3000 already in use | Change in vite.config.ts or use different port |
| Can't install app | Ensure HTTPS (or localhost), valid manifest.json |

---

## 🌐 Deploy in 5 Minutes

### Vercel (Easiest)
```bash
npm install -g vercel
vercel login
vercel
```

### Netlify (Via GitHub)
1. Push to GitHub
2. Go to netlify.com
3. Connect repo → auto-deploy

### GitHub Pages
```bash
npm run build
# Push dist/ folder to gh-pages branch
```

---

## 📚 File Structure Overview

```
fridge-chef/
├── src/
│   ├── App.tsx                 ← Main component
│   ├── main.tsx                ← Entry point
│   ├── components/             ← React components
│   ├── store/appStore.ts       ← State management
│   ├── data/recipes.ts         ← Recipes + algorithm
│   └── types/index.ts          ← TypeScript types
├── public/
│   ├── manifest.json           ← PWA config
│   └── sw.js                   ← Offline support
├── package.json                ← Dependencies
├── vite.config.ts              ← Build config
└── tailwind.config.js          ← Theme config
```

---

## 🧠 How Matching Works

```
1. User adds: ["chicken", "rice", "garlic"]
2. For each recipe:
   - Count matching ingredients
   - Calculate: matched/total = match %
3. Score based on:
   - Ingredient % (main factor)
   - Skill level (+20 points)
   - Time fit (+15 points)
   - Flavor match (+15 points)
   - Cuisine (+10 points)
4. Filter < 30% matches
5. Sort by score (highest = best)
6. Display top results
```

---

## 💾 Data Storage

```javascript
// Stored in browser localStorage:
{
  "fridge-chef-store": {
    "state": {
      "userProfile": { ... },
      "selectedIngredients": [ ... ],
      "savedRecipes": [ ... ]
    }
  }
}
```

---

## 🎯 Next Development

### Add these features next:
1. **More Recipes** (add 50-100)
2. **Real Images** (replace placeholder URLs)
3. **Dark Mode** (add theme toggle)
4. **Nutrition** (add calorie info)
5. **Backend** (Firebase for sync)

---

## 🤔 FAQ

**Q: How do I add a new question to onboarding?**
A: Edit `src/components/Onboarding.tsx`, add step and form field

**Q: Can I use this as PWA?**
A: Yes! Install from browser menu or home screen

**Q: How many recipes do I need?**
A: Start with 10, scale to 100+ as you grow

**Q: Can users share recipes?**
A: Yes, share feature skeleton is ready to implement

**Q: Will it work offline?**
A: Yes! Service worker caches everything

---

## ✅ Pre-Deployment Checklist

- [ ] Added more recipes (50+)
- [ ] Changed app name in manifest.json
- [ ] Updated colors to match brand
- [ ] Tested on mobile device
- [ ] Tested offline functionality
- [ ] Ran npm run build successfully
- [ ] PWA installs on home screen
- [ ] All links working
- [ ] No console errors

---

## 🚀 Deployment Checklist

- [ ] Build: `npm run build`
- [ ] Preview: `npm run preview`
- [ ] Connect to Vercel/Netlify/GH Pages
- [ ] Set build command: `npm run build`
- [ ] Set publish dir: `dist`
- [ ] Enable HTTPS
- [ ] Test PWA installation
- [ ] Share live URL

---

**Last Updated**: December 14, 2025

**Status**: ✅ Production Ready

**Maintenance**: Minimal - static site, no backend needed

---

**Happy Cooking! 🧊🍳** 

Need help? Check the full documentation files!
