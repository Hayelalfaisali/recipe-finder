import { CUISINES, DIETS, MEAL_TYPES, SORT_OPTIONS } from '../utils/constants';

export type Cuisine = typeof CUISINES[number];
export type Diet = typeof DIETS[number];
export type MealType = typeof MEAL_TYPES[number];
export type SortOption = typeof SORT_OPTIONS[number]['value'];

export interface Recipe {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  cuisines: Cuisine[];
  dishTypes: string[];
  diets: Diet[];
  summary: string;
  instructions: string;
  extendedIngredients: Ingredient[];
  nutrition?: NutritionInfo;
}

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  original: string;
}

export interface NutritionInfo {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  [key: string]: string;
}

export interface SearchParams {
  query?: string;
  cuisine?: string;
  diet?: string;
  type?: string;
  maxReadyTime?: number;
  sort?: SortOption;
  number?: number;
}

export interface SearchResponse {
  results: Recipe[];
  totalResults: number;
  offset: number;
  number: number;
}

export interface WeeklyPlan {
  [key: string]: Recipe[];
}

export interface RecipeState {
  favorites: Recipe[];
  weeklyPlan: WeeklyPlan;
  addToFavorites: (recipe: Recipe) => void;
  removeFromFavorites: (recipeId: number) => void;
  addToWeeklyPlan: (day: string, recipe: Recipe) => void;
  removeFromWeeklyPlan: (day: string, recipeId: number) => void;
}
