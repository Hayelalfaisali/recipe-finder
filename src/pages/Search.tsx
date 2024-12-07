import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { searchRecipes } from '../services/api';
import SearchBar from '../components/SearchBar';
import RecipeFilters from '../components/RecipeFilters';
import RecipeCard from '../components/RecipeCard';
import { SearchParams } from '../types';

export default function Search() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: '',
    cuisine: '',
    diet: '',
    maxReadyTime: 60,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['recipes', searchParams],
    queryFn: () => searchRecipes(searchParams),
    enabled: Boolean(searchParams.query),
    keepPreviousData: true,
  });

  const handleSearch = useCallback((query: string) => {
    setSearchParams(prev => ({ ...prev, query }));
  }, []);

  const handleFilterChange = useCallback((params: SearchParams) => {
    setSearchParams(params);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchParams({
      query: '',
      cuisine: '',
      diet: '',
      maxReadyTime: 60,
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="w-full bg-white shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <SearchBar
            onSearch={handleSearch}
            initialQuery={searchParams.query}
            className="w-full max-w-[1920px] mx-auto"
          />
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1920px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 py-6">
            {/* Filters */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-6">
                <RecipeFilters
                  filters={searchParams}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </div>

            {/* Results */}
            <div className="flex-1">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 rounded-lg aspect-video mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-600">Error loading recipes. Please try again.</p>
                </div>
              ) : !searchParams.query ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Enter a search term to find recipes</p>
                </div>
              ) : data && data.results.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No recipes found. Try adjusting your search.</p>
                </div>
              ) : data ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {data.results.map((recipe:any) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onClick={() => navigate(`/recipe/${recipe.id}`)}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
