import { useRecipeStore } from '../store/recipeStore';

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export function useMealPlanner() {
  const { weeklyPlan, addToWeeklyPlan, removeFromWeeklyPlan } = useRecipeStore();

  const getMealsForDay = (day: DayOfWeek) => {
    return weeklyPlan[day] || [];
  };

  const addMealToDay = (day: DayOfWeek, recipe: any) => {
    addToWeeklyPlan(day, recipe);
  };

  const removeMealFromDay = (day: DayOfWeek, recipeId: number) => {
    removeFromWeeklyPlan(day, recipeId);
  };

  const getWeeklyNutrition = () => {
    const totalNutrition:any = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    };

    Object.values(weeklyPlan).forEach(meals => {
      meals.forEach((meal:any) => {
        if (meal.nutrition) {
          totalNutrition.calories += parseFloat(meal.nutrition.calories) || 0;
          totalNutrition.protein += parseFloat(meal.nutrition.protein) || 0;
          totalNutrition.carbs += parseFloat(meal.nutrition.carbs) || 0;
          totalNutrition.fat += parseFloat(meal.nutrition.fat) || 0;
        }
      });
    });

    return totalNutrition;
  };

  const getWeeklyStats = () => {
    let totalMeals = 0;
    let totalCookTime = 0;
    const cuisineTypes = new Set<string>();

    Object.values(weeklyPlan).forEach(meals => {
      totalMeals += meals.length;
      meals.forEach(meal => {
        totalCookTime += meal.readyInMinutes || 0;
        meal.cuisines?.forEach(cuisine => cuisineTypes.add(cuisine));
      });
    });

    return {
      totalMeals,
      totalCookTime,
      averageCookTimePerDay: Math.round(totalCookTime / 7),
      cuisineVariety: cuisineTypes.size,
    };
  };

  const clearDay = (day: DayOfWeek) => {
    const meals = getMealsForDay(day);
    meals.forEach(meal => removeMealFromDay(day, meal.id));
  };

  const clearWeek = () => {
    Object.keys(weeklyPlan).forEach(day => {
      clearDay(day as DayOfWeek);
    });
  };

  return {
    weeklyPlan,
    getMealsForDay,
    addMealToDay,
    removeMealFromDay,
    getWeeklyNutrition,
    getWeeklyStats,
    clearDay,
    clearWeek,
  };
}
