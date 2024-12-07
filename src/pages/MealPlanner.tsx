import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { useRecipeStore } from '../store/recipeStore';
import RecipeCard from '../components/RecipeCard';

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function MealPlanner() {
  const navigate = useNavigate();
  const { weeklyPlan, favorites, addToWeeklyPlan, removeFromWeeklyPlan } = useRecipeStore();
  const [selectedDay, setSelectedDay] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  const handleAddRecipe = (day: string, recipe: any) => {
    addToWeeklyPlan(day, recipe);
    setShowFavorites(false);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900">Weekly Meal Planner</h1>
        <p className="mt-2 text-gray-600">
          Plan your meals for the week ahead
        </p>
      </motion.div>

      <div className="space-y-6">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <CalendarDaysIcon className="h-6 w-6 mr-2 text-accent-500" />
                {day}
              </h2>
              <button
                onClick={() => {
                  setSelectedDay(day);
                  setShowFavorites(true);
                }}
                className="btn-secondary"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Recipe
              </button>
            </div>

            {weeklyPlan[day]?.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {weeklyPlan[day].map((recipe: any) => (
                  <div key={recipe.id} className="relative">
                    <RecipeCard
                      recipe={recipe}
                      onClick={() => navigate(`/recipe/${recipe.id}`)}
                    />
                    <button
                      onClick={() => removeFromWeeklyPlan(day, recipe.id)}
                      className="absolute top-2 right-2 p-1 bg-red-100 rounded-full hover:bg-red-200"
                    >
                      <span className="sr-only">Remove recipe</span>
                      <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No meals planned for {day}</p>
            )}
          </div>
        ))}
      </div>

      {/* Modal for adding recipes from favorites */}
      {showFavorites && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add Recipe to {selectedDay}</h3>
              <button
                onClick={() => setShowFavorites(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {favorites.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="cursor-pointer"
                    onClick={() => handleAddRecipe(selectedDay, recipe)}
                  >
                    <RecipeCard recipe={recipe} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">No favorite recipes yet</p>
                <button
                  onClick={() => {
                    setShowFavorites(false);
                    navigate('/search');
                  }}
                  className="btn-primary mt-2"
                >
                  Find Recipes
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
