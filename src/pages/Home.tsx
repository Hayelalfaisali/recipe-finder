import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getRandomRecipes } from '../services/api';
import RecipeCard from '../components/RecipeCard';

export default function Home() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ['randomRecipes'],
    queryFn: () => getRandomRecipes(12),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Error loading recipes</h3>
        <p className="mt-2 text-sm text-gray-500">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Hero Section */}
      <div className="w-full bg-accent-600 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
          <div className="w-full max-w-6xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Discover Delicious Recipes
            </h1>
            <p className="mt-6 text-lg leading-8">
              Find and save your favorite recipes, plan your meals, and cook with confidence.
            </p>
            <div className="mt-10">
              <button
                onClick={() => navigate('/search')}
                className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-accent-600 shadow-sm hover:bg-gray-100"
              >
                Start Exploring
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Recipes */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1920px] mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {data?.recipes.map((recipe: any) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
