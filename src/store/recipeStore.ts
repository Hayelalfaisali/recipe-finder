import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Recipe {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  cuisines: string[];
  diets: string[];
  instructions: string;
  ingredients: {
    id: number;
    name: string;
    amount: number;
    unit: string;
  }[];
}

interface RecipeState {
  favorites: Recipe[];
  weeklyPlan: {
    [key: string]: Recipe[];
  };
  addToFavorites: (recipe: Recipe) => void;
  removeFromFavorites: (recipeId: number) => void;
  addToWeeklyPlan: (day: string, recipe: Recipe) => void;
  removeFromWeeklyPlan: (day: string, recipeId: number) => void;
}

export const useRecipeStore = create<RecipeState>()(
  persist(
    (set) => ({
      favorites: [],
      weeklyPlan: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      },
      addToFavorites: (recipe) =>
        set((state) => ({
          favorites: [...state.favorites, recipe],
        })),
      removeFromFavorites: (recipeId) =>
        set((state) => ({
          favorites: state.favorites.filter((recipe) => recipe.id !== recipeId),
        })),
      addToWeeklyPlan: (day, recipe) =>
        set((state) => ({
          weeklyPlan: {
            ...state.weeklyPlan,
            [day]: [...(state.weeklyPlan[day] || []), recipe],
          },
        })),
      removeFromWeeklyPlan: (day, recipeId) =>
        set((state) => ({
          weeklyPlan: {
            ...state.weeklyPlan,
            [day]: state.weeklyPlan[day].filter((recipe) => recipe.id !== recipeId),
          },
        })),
    }),
    {
      name: 'recipe-storage',
    }
  )
);
