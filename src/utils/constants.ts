export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

export const MEAL_TYPES = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snack',
] as const;

export const CUISINES = [
  'African',
  'American',
  'British',
  'Cajun',
  'Caribbean',
  'Chinese',
  'Eastern European',
  'European',
  'French',
  'German',
  'Greek',
  'Indian',
  'Irish',
  'Italian',
  'Japanese',
  'Jewish',
  'Korean',
  'Latin American',
  'Mediterranean',
  'Mexican',
  'Middle Eastern',
  'Nordic',
  'Southern',
  'Spanish',
  'Thai',
  'Vietnamese',
] as const;

export const DIETS = [
  'Gluten Free',
  'Ketogenic',
  'Vegetarian',
  'Lacto-Vegetarian',
  'Ovo-Vegetarian',
  'Vegan',
  'Pescetarian',
  'Paleo',
  'Primal',
  'Low FODMAP',
  'Whole30',
] as const;

export const INTOLERANCES = [
  'Dairy',
  'Egg',
  'Gluten',
  'Grain',
  'Peanut',
  'Seafood',
  'Sesame',
  'Shellfish',
  'Soy',
  'Sulfite',
  'Tree Nut',
  'Wheat',
] as const;

export const SORT_OPTIONS = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'time', label: 'Quickest' },
  { value: 'random', label: 'Random' },
  { value: 'healthiness', label: 'Healthiest' },
  { value: 'price', label: 'Budget Friendly' },
] as const;

export const DEFAULT_SEARCH_PARAMS = {
  query: '',
  cuisine: '',
  diet: '',
  type: '',
  maxReadyTime: 60,
  sort: 'popularity',
  number: 12,
} as const;

export const NUTRITION_COLORS = {
  calories: { bg: 'bg-orange-100', text: 'text-orange-800' },
  protein: { bg: 'bg-green-100', text: 'text-green-800' },
  carbs: { bg: 'bg-blue-100', text: 'text-blue-800' },
  fat: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
} as const;

export const API_ERROR_MESSAGES = {
  RATE_LIMIT: 'API rate limit exceeded. Please try again later.',
  NETWORK: 'Network error. Please check your internet connection.',
  NOT_FOUND: 'Recipe not found.',
  GENERAL: 'Something went wrong. Please try again.',
} as const;
