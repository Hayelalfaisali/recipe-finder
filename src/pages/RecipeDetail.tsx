import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  ClockIcon,
  UserIcon,
  HeartIcon,
  FireIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { getRecipeById, getRecipeInstructions, getRecipeNutrition, getSimilarRecipes } from '../services/api';
import { useRecipeStore } from '../store/recipeStore';
import RecipeCard from '../components/RecipeCard';

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { favorites, addToFavorites, removeFromFavorites } = useRecipeStore();
  
  const recipeId = parseInt(id || '0');
  const isFavorite = favorites.some((fav) => fav.id === recipeId);

  const { data: recipe, isLoading: isLoadingRecipe } = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => getRecipeById(recipeId),
    enabled: !!recipeId,
  });

  const { data: instructions } = useQuery({
    queryKey: ['instructions', recipeId],
    queryFn: () => getRecipeInstructions(recipeId),
    enabled: !!recipeId,
  });

  const { data: nutrition } = useQuery({
    queryKey: ['nutrition', recipeId],
    queryFn: () => getRecipeNutrition(recipeId),
    enabled: !!recipeId,
  });

  const { data: similarRecipes } = useQuery({
    queryKey: ['similarRecipes', recipeId],
    queryFn: () => getSimilarRecipes(recipeId),
    enabled: !!recipeId,
  });

  const toggleFavorite = () => {
    if (recipe) {
      if (isFavorite) {
        removeFromFavorites(recipe.id);
      } else {
        addToFavorites(recipe);
      }
    }
  };

  if (isLoadingRecipe) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent-500" />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Recipe not found</h3>
        <p className="mt-2 text-sm text-gray-500">
          The recipe you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-96 object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-4xl font-bold text-white text-shadow-lg">{recipe.title}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            {recipe.cuisines?.map((cuisine: string) => (
              <span
                key={cuisine}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-800"
              >
                {cuisine}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
        >
          {isFavorite ? (
            <HeartIconSolid className="h-6 w-6 text-red-500" />
          ) : (
            <HeartIcon className="h-6 w-6 text-gray-500" />
          )}
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center">
          <ClockIcon className="h-6 w-6 text-accent-500 mr-2" />
          <span>{recipe.readyInMinutes} minutes</span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center">
          <UserIcon className="h-6 w-6 text-accent-500 mr-2" />
          <span>{recipe.servings} servings</span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center">
          <FireIcon className="h-6 w-6 text-accent-500 mr-2" />
          <span>{nutrition?.calories || '---'} calories</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.extendedIngredients?.map((ingredient: any) => (
                <li key={ingredient.id} className="flex items-center">
                  <ScaleIcon className="h-5 w-5 text-accent-500 mr-2" />
                  <span>
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Instructions</h2>
            <ol className="space-y-4">
              {instructions?.[0]?.steps?.map((step: any) => (
                <li key={step.number} className="flex">
                  <span className="font-bold text-accent-500 mr-2">
                    {step.number}.
                  </span>
                  <span>{step.step}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Nutrition Facts</h2>
            {nutrition && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Calories</span>
                  <span className="font-medium">{nutrition.calories}</span>
                </div>
                <div className="flex justify-between">
                  <span>Protein</span>
                  <span className="font-medium">{nutrition.protein}</span>
                </div>
                <div className="flex justify-between">
                  <span>Carbohydrates</span>
                  <span className="font-medium">{nutrition.carbs}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fat</span>
                  <span className="font-medium">{nutrition.fat}</span>
                </div>
              </div>
            )}
          </section>

          {similarRecipes && similarRecipes.length > 0 && (
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Similar Recipes</h2>
              <div className="space-y-4">
                {similarRecipes.slice(0, 3).map((recipe: any) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
