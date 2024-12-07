import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { SearchParams } from '../types';

interface RecipeFiltersProps {
  filters: SearchParams;
  onFilterChange: (filters: SearchParams) => void;
  onClearFilters: () => void;
}

export default function RecipeFilters({
  filters,
  onFilterChange,
  onClearFilters,
}: RecipeFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (field: keyof SearchParams, value: string | number) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className="w-full space-y-4">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Ready Time (minutes)
            </label>
            <input
              type="range"
              min="15"
              max="120"
              step="15"
              value={filters.maxReadyTime}
              onChange={(e) => handleInputChange('maxReadyTime', Number(e.target.value))}
              className="w-full accent-accent-500"
            />
            <div className="text-sm text-gray-500 mt-1">{filters.maxReadyTime} minutes</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Diet
            </label>
            <select
              className="w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
              value={filters.diet}
              onChange={(e) => handleInputChange('diet', e.target.value)}
            >
              <option value="">Any</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Gluten Free</option>
              <option value="ketogenic">Ketogenic</option>
              <option value="paleo">Paleo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cuisine
            </label>
            <select
              className="w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-500 focus:border-accent-500"
              value={filters.cuisine}
              onChange={(e) => handleInputChange('cuisine', e.target.value)}
            >
              <option value="">Any</option>
              <option value="italian">Italian</option>
              <option value="mexican">Mexican</option>
              <option value="chinese">Chinese</option>
              <option value="indian">Indian</option>
              <option value="japanese">Japanese</option>
              <option value="thai">Thai</option>
              <option value="mediterranean">Mediterranean</option>
            </select>
          </div>
        </div>

        <button
          onClick={onClearFilters}
          className="mt-4 w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
