import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchRecipes, SearchParams } from '../services/api';

const defaultSearchParams: SearchParams = {
  query: '',
  cuisine: '',
  diet: '',
  type: '',
  maxReadyTime: 60,
};

export function useRecipeSearch() {
  const [searchParams, setSearchParams] = useState<SearchParams>(defaultSearchParams);

  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['searchRecipes', searchParams],
    queryFn: () => searchRecipes(searchParams),
    enabled: searchParams.query !== '',
  });

  const updateSearchParams = (newParams: Partial<SearchParams>) => {
    setSearchParams(prev => ({
      ...prev,
      ...newParams,
    }));
  };

  const resetSearchParams = () => {
    setSearchParams(defaultSearchParams);
  };

  return {
    searchParams,
    updateSearchParams,
    resetSearchParams,
    results: data?.results || [],
    totalResults: data?.totalResults || 0,
    isLoading,
    error,
    refetch,
  };
}
