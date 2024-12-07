import { useState } from 'react';
import { motion } from 'framer-motion';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { calculateServings } from '../utils/helpers';
import { Ingredient } from '../types';

interface ServingsCalculatorProps {
  originalServings: number;
  ingredients: Ingredient[];
  onServingsChange?: (servings: number) => void;
}

export default function ServingsCalculator({
  originalServings,
  ingredients,
  onServingsChange
}: ServingsCalculatorProps) {
  const [servings, setServings] = useState(originalServings);
  const [adjustedIngredients, setAdjustedIngredients] = useState(ingredients);

  const handleServingsChange = (newServings: number) => {
    if (newServings < 1) return;
    if (newServings > 99) return;

    setServings(newServings);
    const newIngredients = calculateServings(ingredients, originalServings, newServings);
    setAdjustedIngredients(newIngredients);
    onServingsChange?.(newServings);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Adjust Servings</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleServingsChange(servings - 1)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <MinusCircleIcon className="h-6 w-6" />
          </button>
          <div className="flex items-center">
            <input
              type="number"
              value={servings}
              onChange={(e) => handleServingsChange(parseInt(e.target.value) || 1)}
              className="w-16 text-center border-gray-300 rounded-md focus:ring-accent-500 focus:border-accent-500"
              min="1"
              max="99"
            />
            <span className="ml-2 text-gray-600">servings</span>
          </div>
          <button
            onClick={() => handleServingsChange(servings + 1)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <PlusCircleIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {adjustedIngredients.map((ingredient, index) => (
          <motion.div
            key={`${ingredient.id}-${index}`}
            initial={false}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 0.3 }}
            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
          >
            <span className="text-gray-800">{ingredient.name}</span>
            <span className="text-gray-600">
              {ingredient.amount} {ingredient.unit}
            </span>
          </motion.div>
        ))}
      </div>

      {servings !== originalServings && (
        <div className="mt-4 text-sm text-gray-500 italic">
          * Ingredients adjusted from original {originalServings} servings
        </div>
      )}

      <div className="mt-6 p-4 bg-accent-50 rounded-md">
        <h4 className="text-sm font-medium text-accent-800 mb-2">Pro Tips:</h4>
        <ul className="text-sm text-accent-700 space-y-1">
          <li>• Cooking times may need slight adjustment</li>
          <li>• Check seasoning levels when scaling</li>
          <li>• Pan/dish sizes might need to be adjusted</li>
        </ul>
      </div>
    </div>
  );
}
