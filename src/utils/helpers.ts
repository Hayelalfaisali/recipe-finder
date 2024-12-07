export const formatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 
    ? `${hours} hr ${remainingMinutes} min`
    : `${hours} hr`;
};

export const formatNutrition = (value: string): string => {
  const match = value.match(/(\d+(\.\d+)?)/);
  if (!match) return value;
  const number = parseFloat(match[1]);
  return Math.round(number).toString() + value.replace(match[1], '');
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const groupBy = <T>(array: T[], key: keyof T): { [key: string]: T[] } => {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as { [key: string]: T[] });
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const calculateServings = (
  ingredients: Array<{ amount: number; unit: string; name: string }>,
  currentServings: number,
  desiredServings: number
) => {
  const ratio = desiredServings / currentServings;
  return ingredients.map(ingredient => ({
    ...ingredient,
    amount: Number((ingredient.amount * ratio).toFixed(2))
  }));
};

export const generateShoppingList = (recipes: any[]): Array<{
  ingredient: string;
  amount: number;
  unit: string;
}> => {
  const ingredients: { [key: string]: { amount: number; unit: string } } = {};

  recipes.forEach(recipe => {
    recipe.extendedIngredients?.forEach((ingredient: any) => {
      const key = ingredient.name.toLowerCase();
      if (!ingredients[key]) {
        ingredients[key] = {
          amount: 0,
          unit: ingredient.unit,
        };
      }
      ingredients[key].amount += ingredient.amount;
    });
  });

  return Object.entries(ingredients).map(([ingredient, { amount, unit }]) => ({
    ingredient,
    amount: Number(amount.toFixed(2)),
    unit,
  }));
};
