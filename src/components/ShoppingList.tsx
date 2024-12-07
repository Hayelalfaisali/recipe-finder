import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, PrinterIcon, ShareIcon } from '@heroicons/react/24/outline';
import { generateShoppingList } from '../utils/helpers';
import { Recipe } from '../types';

interface ShoppingListProps {
  recipes: Recipe[];
}

interface ShoppingItem {
  ingredient: string;
  amount: number;
  unit: string;
  checked: boolean;
}

export default function ShoppingList({ recipes }: ShoppingListProps) {
  const [items, setItems] = useState<ShoppingItem[]>(() =>
    generateShoppingList(recipes).map(item => ({
      ...item,
      checked: false,
    }))
  );

  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const toggleItem = (index: number) => {
    setItems(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const filteredItems = items.filter(item => {
    if (filter === 'pending') return !item.checked;
    if (filter === 'completed') return item.checked;
    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const text = items
      .map(item => `□ ${item.amount} ${item.unit} ${item.ingredient}`)
      .join('\n');

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Shopping List',
          text: text,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(text);
      // You might want to show a toast notification here
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Shopping List</h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePrint}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <PrinterIcon className="h-5 w-5" />
          </button>
          <button
            onClick={handleShare}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ShareIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex space-x-2 mb-4">
        {(['all', 'pending', 'completed'] as const).map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
              filter === filterOption
                ? 'bg-accent-100 text-accent-800'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {filterOption}
          </button>
        ))}
      </div>

      <div className="divide-y divide-gray-200">
        <AnimatePresence initial={false}>
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.ingredient}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="py-3"
            >
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleItem(index)}
                  className={`flex-shrink-0 ${
                    item.checked ? 'text-green-500' : 'text-gray-400'
                  }`}
                >
                  <CheckCircleIcon className="h-5 w-5" />
                </button>
                <span
                  className={`flex-1 ${
                    item.checked ? 'line-through text-gray-400' : 'text-gray-900'
                  }`}
                >
                  {item.amount} {item.unit} {item.ingredient}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {items.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No ingredients in your shopping list
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        {items.filter(item => item.checked).length} of {items.length} items checked
      </div>
    </div>
  );
}
