import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useRecipeStore } from '../store/recipeStore';
import RecipeCard from '../components/RecipeCard';

export default function Favorites() {
  const navigate = useNavigate();
  const { favorites } = useRecipeStore();

  if (favorites.length === 0) {
    return (
      <div className="w-full text-center py-12">
        <HeartIcon className=" mx-auto h-12 w-12 text-gray-400" />
        <h3 className="w-full mt-2 text-lg font-medium text-gray-900">No favorites yet</h3>
        <p className="w-full mt-1 text-sm text-gray-500">
          Start exploring recipes and add them to your favorites!
        </p>
        <div className="w-full mt-6">
          <button
            onClick={() => navigate('/search')}
            className="btn-primary"
          >
            Find Recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900">Your Favorite Recipes</h1>
        <p className="mt-2 text-gray-600">
          Here are all the recipes you've saved for quick access
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onClick={() => navigate(`/recipe/${recipe.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
