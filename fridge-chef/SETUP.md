# FridgeChef - Setup & Installation Guide

## Quick Start

### 1. Install Dependencies
```bash
cd fridge-chef
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The app will automatically open in your browser at `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
```

This creates an optimized build in the `dist/` folder ready for deployment.

## Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
cd fridge-chef
vercel
```

### Deploy to Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Deploy to GitHub Pages
```bash
npm run build
# Push dist folder to gh-pages branch
```

## Features Included

✅ **Onboarding System**
- Step-by-step preference gathering
- Beautiful multi-step UI
- Progress indicator
- Data persistence

✅ **Ingredient Management**
- Search with autocomplete
- Quick-add buttons
- Ingredient suggestions
- Visual tags

✅ **Recipe Database**
- 10+ pre-loaded recipes
- Scalable database structure
- Smart matching algorithm
- Difficulty ratings

✅ **Smart Matching**
- Match percentage calculation
- User preference scoring
- Difficulty-aware ranking
- Time-based filtering

✅ **Recipe Display**
- Beautiful card layout
- Expandable details
- Full instructions
- Ingredient lists

✅ **PWA Support**
- Service worker
- Offline caching
- Installable app
- Push-ready structure

✅ **State Management**
- Persistent storage
- Zustand store
- Local data backup

## Customization

### Adding More Recipes

Edit `src/data/recipes.ts`:

```typescript
{
  id: 'recipe_011',
  name: 'Your Recipe',
  description: 'Description here',
  cuisine: 'Cuisine Type',
  difficulty: 'Beginner',
  prepTime: 10,
  cookTime: 20,
  servings: 2,
  ingredients: [
    { name: 'ingredient', amount: 1, unit: 'cup' },
  ],
  instructions: ['Step 1', 'Step 2'],
  tags: ['tag1', 'tag2'],
  flavorProfile: ['savory'],
  image: 'image_url',
  rating: 4.5,
  reviews: 100,
}
```

### Changing Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: '#2ECC71',     // Change to your color
  accent: '#F39C12',      // Change to your color
  dark: '#2C3E50',        // Change to your color
}
```

### Modifying Onboarding Questions

Edit `src/components/Onboarding.tsx` to add/modify steps and questions.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Check TypeScript types

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## PWA Installation

### On Desktop
1. Open the app in Chrome/Edge
2. Click the install icon in the address bar
3. Click "Install"

### On Mobile
1. Open the app in mobile browser
2. Tap the menu (⋮)
3. Tap "Install app" or "Add to Home Screen"

## Performance Tips

- Recipes are cached locally for offline access
- Images are optimized and lazy-loaded
- Service worker handles network requests
- State is persisted to localStorage

## Troubleshooting

**Service Worker not registering?**
- Ensure you're using HTTPS (or localhost for dev)
- Check browser console for errors
- Clear service worker: `DevTools > Application > Clear storage`

**Recipes not showing?**
- Check that ingredients match recipe ingredient names
- Ensure match percentage is > 30% (configurable in recipes.ts)
- Add more ingredients for better matches

**Styles not loading?**
- Run `npm install` to ensure all dependencies are installed
- Clear browser cache (Ctrl+Shift+Delete)

## Next Steps

1. **Add Real Images**: Replace placeholder URLs with real recipe images
2. **Expand Recipe Database**: Add 50+ more recipes
3. **Backend Integration**: Connect to Firebase for sync across devices
4. **Mobile App**: Build iOS/Android versions with React Native
5. **Analytics**: Add Google Analytics or Mixpanel
6. **Social Features**: Add sharing and community recipes

## Getting Help

- Check the README.md for feature documentation
- Review PRD.md for product requirements
- Inspect component code for implementation details
- Test in browser DevTools for debugging

---

**You're all set! Happy cooking! 🍳**
