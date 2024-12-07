import { useRecipeStore } from '../store/recipeStore';

export function useFavorites() {
  const { favorites, addToFavorites, removeFromFavorites } = useRecipeStore();

  const isFavorite = (recipeId: number) => {
    return favorites.some(recipe => recipe.id === recipeId);
  };

  const toggleFavorite = (recipe: any) => {
    if (isFavorite(recipe.id)) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  const getFavoritesByCategory = (category: string) => {
    return favorites.filter((recipe:any) => 
      recipe.cuisines?.includes(category) || 
      recipe.dishTypes?.includes(category)
    );
  };

  const getFavoriteStats = () => {
    return {
      total: favorites.length,
      cuisineTypes: [...new Set(favorites.flatMap(recipe => recipe.cuisines || []))],
      averageCookTime: Math.round(
        favorites.reduce((acc, recipe) => acc + (recipe.readyInMinutes || 0), 0) / 
        favorites.length || 0
      ),
    };
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    getFavoritesByCategory,
    getFavoriteStats,
  };
}
