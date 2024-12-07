import { motion } from 'framer-motion';
import { HeartIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useRecipeStore } from '../store/recipeStore';

interface Recipe {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  cuisines: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
}

export default function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const { favorites, addToFavorites, removeFromFavorites } = useRecipeStore();
  const isFavorite = favorites.some((fav) => fav.id === recipe.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
        >
          {isFavorite ? (
            <HeartIconSolid className="h-6 w-6 text-red-500" />
          ) : (
            <HeartIcon className="h-6 w-6 text-gray-500" />
          )}
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {recipe.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 mr-1" />
            <span>{recipe.readyInMinutes} min</span>
          </div>
          <div className="flex items-center">
            <UserIcon className="h-5 w-5 mr-1" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
        {recipe.cuisines && recipe.cuisines.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {recipe.cuisines.map((cuisine) => (
              <span
                key={cuisine}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-800"
              >
                {cuisine}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
