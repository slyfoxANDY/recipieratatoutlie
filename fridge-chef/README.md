# FridgeChef - Recipe Suggester PWA

A beautiful, modern Progressive Web App that suggests delicious recipes based on ingredients available in your fridge.

## Features

✨ **Smart Onboarding**
- Interactive multi-step quiz to understand your palate
- Collects skill level, flavor preferences, dietary restrictions, and time constraints

🧊 **Ingredient-Based Matching**
- Add ingredients from your fridge
- Smart autocomplete with common ingredients
- Quick-add buttons for faster input

🍳 **Intelligent Recipe Matching**
- Recommends recipes based on ingredient availability
- Ranks recipes by match percentage and user preferences
- Considers cooking skill level and time constraints

📱 **PWA Features**
- Works completely offline
- Installable on mobile and desktop
- Fast loading with optimized performance
- Local data persistence

🎨 **Beautiful UI/UX**
- Modern, clean design with Tailwind CSS
- Responsive layout (mobile, tablet, desktop)
- Smooth animations and transitions
- Color-coded difficulty levels

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + PostCSS
- **State Management**: Zustand
- **Build Tool**: Vite
- **Icons**: React Icons
- **PWA**: Service Workers

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
cd fridge-chef
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
fridge-chef/
├── src/
│   ├── components/
│   │   ├── Onboarding.tsx       # Multi-step onboarding quiz
│   │   ├── IngredientInput.tsx   # Ingredient input interface
│   │   ├── RecipeCard.tsx        # Individual recipe display
│   │   ├── RecipeResults.tsx     # Results grid view
│   │   └── Header.tsx            # App header with settings
│   ├── data/
│   │   └── recipes.ts            # Recipe database and matching algorithm
│   ├── store/
│   │   └── appStore.ts           # Zustand state management
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   ├── styles/
│   │   └── index.css             # Global styles
│   ├── App.tsx                   # Main app component
│   └── main.tsx                  # Entry point
├── public/
│   ├── manifest.json             # PWA manifest
│   └── sw.js                      # Service worker
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Usage

1. **Onboarding**: Complete the interactive quiz on first visit
   - Select your cooking skill level
   - Choose flavor preferences
   - Set dietary restrictions
   - Specify available time
   - Pick favorite cuisines

2. **Add Ingredients**: Type or search for ingredients in your fridge
   - Use autocomplete suggestions
   - Click quick-add buttons
   - See selected ingredients at a glance

3. **Find Recipes**: Click "Find Recipes" to get suggestions
   - Recipes are ranked by match percentage
   - View full recipe details
   - Save favorite recipes
   - Share recipes with others

4. **Explore**: Browse recipes with expandable details
   - Full ingredient lists
   - Step-by-step instructions
   - Cooking time estimates
   - Difficulty ratings

## Future Enhancements

- 🤖 AI recipe generation based on ingredients
- 📊 Nutritional information tracking
- 🛒 Grocery list generation
- 📸 Image recognition for ingredients
- 🌙 Dark mode support
- 🔄 Sync across devices with cloud storage
- 👥 Multi-user household support
- 📱 Native app versions (iOS/Android)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project!

## Support

If you encounter any issues or have suggestions, please open an issue on GitHub.

---

**Happy Cooking! 🍳**
