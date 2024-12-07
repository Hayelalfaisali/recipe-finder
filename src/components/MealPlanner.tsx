import { useState } from 'react';
import { useMealPlanner } from '../hooks/useMealPlanner';
import { DAYS_OF_WEEK, MEAL_TYPES } from '../utils/constants';
import { Recipe } from '../types';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface MealPlannerProps {
  onAddMeal?: (day: string, mealType: string) => void;
}

export default function MealPlanner({ onAddMeal }: MealPlannerProps) {
  const {
    weeklyPlan,
    getMealsForDay,
    removeMealFromDay,
    getWeeklyNutrition,
    getWeeklyStats,
    clearDay,
    clearWeek
  } = useMealPlanner();

  const [selectedDay, setSelectedDay] = useState<string>(DAYS_OF_WEEK[0]);
  const stats = getWeeklyStats();
  const nutrition = getWeeklyNutrition();

  const handleAddMeal = (day: string, mealType: string) => {
    onAddMeal?.(day, mealType);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Weekly Overview */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Weekly Meal Plan</h2>
          <button
            onClick={clearWeek}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-green-800 text-sm font-medium">Total Meals</div>
            <div className="text-2xl font-bold text-green-900">{stats.totalMeals}</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-blue-800 text-sm font-medium">Avg. Cook Time</div>
            <div className="text-2xl font-bold text-blue-900">
              {stats.averageCookTimePerDay} min
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-purple-800 text-sm font-medium">Cuisine Types</div>
            <div className="text-2xl font-bold text-purple-900">{stats.cuisineVariety}</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-orange-800 text-sm font-medium">Daily Calories</div>
            <div className="text-2xl font-bold text-orange-900">
              {Math.round(nutrition.calories / 7)}
            </div>
          </div>
        </div>
      </div>

      {/* Day Selector */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto p-2">
          {DAYS_OF_WEEK.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium mr-2 ${
                selectedDay === day
                  ? 'bg-accent-100 text-accent-900'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Meal Schedule */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">{selectedDay}'s Meals</h3>
          <button
            onClick={() => clearDay(selectedDay)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear Day
          </button>
        </div>

        <div className="space-y-6">
          {MEAL_TYPES.map((mealType) => (
            <div key={mealType} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-medium text-gray-700">{mealType}</h4>
                <button
                  onClick={() => handleAddMeal(selectedDay, mealType)}
                  className="p-1 text-accent-600 hover:text-accent-800"
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
              </div>

              <AnimatePresence>
                {getMealsForDay(selectedDay)
                  .filter((meal: Recipe) => meal.dishTypes?.includes(mealType.toLowerCase()))
                  .map((meal: Recipe) => (
                    <motion.div
                      key={meal.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-between bg-gray-50 rounded-lg p-3 mb-2"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={meal.image}
                          alt={meal.title}
                          className="h-12 w-12 rounded-md object-cover"
                        />
                        <div>
                          <h5 className="text-sm font-medium text-gray-900">{meal.title}</h5>
                          <p className="text-xs text-gray-500">{meal.readyInMinutes} min</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeMealFromDay(selectedDay, meal.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))}
              </AnimatePresence>

              {getMealsForDay(selectedDay).filter((meal: Recipe) =>
                meal.dishTypes?.includes(mealType.toLowerCase())
              ).length === 0 && (
                <div className="text-center py-4 text-sm text-gray-500">
                  No {mealType.toLowerCase()} planned
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Nutrition Summary */}
      <div className="border-t border-gray-200 p-6 bg-gray-50">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Daily Nutrition Target</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-gray-500">Calories</div>
            <div className="text-lg font-medium text-gray-900">
              {Math.round(nutrition.calories / 7)} kcal
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Protein</div>
            <div className="text-lg font-medium text-gray-900">
              {Math.round(nutrition.protein / 7)}g
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Carbs</div>
            <div className="text-lg font-medium text-gray-900">
              {Math.round(nutrition.carbs / 7)}g
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Fat</div>
            <div className="text-lg font-medium text-gray-900">
              {Math.round(nutrition.fat / 7)}g
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
