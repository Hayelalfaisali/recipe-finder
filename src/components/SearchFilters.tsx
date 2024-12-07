import { SearchParams } from '../services/api';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface SearchFiltersProps {
  searchParams: SearchParams;
  onSearchChange: (params: SearchParams) => void;
  onSearch: () => void;
}

const cuisineOptions = [
  'Italian', 'Mexican', 'Chinese', 'Indian', 'Japanese', 'Thai',
  'Mediterranean', 'French', 'Greek', 'Spanish'
];

const dietOptions = [
  'Vegetarian', 'Vegan', 'Gluten Free', 'Ketogenic', 'Paleo'
];

const mealTypes = [
  'Main Course', 'Side Dish', 'Dessert', 'Appetizer', 'Salad',
  'Breakfast', 'Soup', 'Snack'
];

export default function SearchFilters({ searchParams, onSearchChange, onSearch }: SearchFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (key: keyof SearchParams, value: string | number) => {
    onSearchChange({ ...searchParams, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          className="input-primary pl-10 pr-4 py-2 w-full"
          placeholder="Search recipes..."
          value={searchParams.query}
          onChange={(e) => handleInputChange('query', e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
        />
        <MagnifyingGlassIcon 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
        />
      </div>

      <button
        className="flex items-center text-sm text-gray-600 hover:text-accent-600"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        <AdjustmentsHorizontalIcon className="h-5 w-5 mr-1" />
        {showAdvanced ? 'Hide Filters' : 'Show Filters'}
      </button>

      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-white rounded-lg shadow-sm">
          <div>
            <label className=" bg-transparent block text-sm font-medium text-gray-700 mb-1">
              Cuisine
            </label>
            <select
              className=" !bg-transparent input-primary w-full"
              value={searchParams.cuisine}
              onChange={(e) => handleInputChange('cuisine', e.target.value)}
            >
              <option value="">Any Cuisine</option>
              {cuisineOptions.map((cuisine) => (
                <option key={cuisine} value={cuisine.toLowerCase()}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Diet
            </label>
            <select
              className="input-primary w-full"
              value={searchParams.diet}
              onChange={(e) => handleInputChange('diet', e.target.value)}
            >
              <option value="">Any Diet</option>
              {dietOptions.map((diet) => (
                <option key={diet} value={diet.toLowerCase()}>
                  {diet}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meal Type
            </label>
            <select
              className="input-primary w-full"
              value={searchParams.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
            >
              <option value="">Any Type</option>
              {mealTypes.map((type) => (
                <option key={type} value={type.toLowerCase()}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Cooking Time: {searchParams.maxReadyTime} minutes
            </label>
            <input
              type="range"
              min="15"
              max="120"
              step="15"
              value={searchParams.maxReadyTime}
              onChange={(e) => handleInputChange('maxReadyTime', Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      )}

      <button
        onClick={onSearch}
        className="btn-primary w-full"
      >
        Search Recipes
      </button>
    </div>
  );
}
