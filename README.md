# Recipe Finder

A modern recipe discovery platform built with React, TypeScript, and the Spoonacular API.

## Features

- 🔍 Advanced recipe search with multiple filters
- 📱 Responsive design for all devices
- ❤️ Save favorite recipes
- 📅 Weekly meal planner
- 📊 Detailed nutritional information
- 👨‍🍳 Step-by-step cooking instructions
- 🎨 Beautiful animations and transitions

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Zustand (State Management)
- React Query (API Data Fetching)
- Framer Motion (Animations)
- Spoonacular API

## Screenshots

![image](/public/image1.png)
![image](/public/image2.png)
![image](/public/image3.png)
![image](/public/image4.png)
![image](/public/image5.png)
![image](/public/image6.png)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Spoonacular API key:
   ```env
   VITE_SPOONACULAR_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
recipe-finder/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── store/            # Zustand store
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Static assets
└── package.json         # Dependencies and scripts
```

## Components

- `Layout`: Main layout with navigation and footer
- `RecipeCard`: Displays recipe information
- `SearchFilters`: Advanced search filters
- `NutritionCard`: Displays nutritional information
- `InstructionsCard`: Shows cooking instructions
- `Modal`: Reusable modal component
- `LoadingSpinner`: Loading animation
- `ErrorMessage`: Error display component

## Pages

- `Home`: Landing page with featured recipes
- `Search`: Recipe search with filters
- `Favorites`: Saved recipes
- `MealPlanner`: Weekly meal planning
- `RecipeDetail`: Detailed recipe information

## State Management

Using Zustand for managing:
- Favorite recipes
- Weekly meal plan
- Search filters
- UI state

## API Integration

Using React Query for:
- Recipe search
- Recipe details
- Nutritional information
- Similar recipes
- Cooking instructions

## Styling

- Tailwind CSS for utility-first styling
- Custom components and animations
- Responsive design
- Dark mode support

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

MIT License
