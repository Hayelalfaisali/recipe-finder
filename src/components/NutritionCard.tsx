import { motion } from 'framer-motion';

interface NutritionInfo {
  calories: string;
  carbs: string;
  fat: string;
  protein: string;
  [key: string]: string;
}

interface NutritionCardProps {
  nutrition: NutritionInfo;
}

const nutritionColors = {
  calories: 'bg-orange-100 text-orange-800',
  carbs: 'bg-blue-100 text-blue-800',
  fat: 'bg-yellow-100 text-yellow-800',
  protein: 'bg-green-100 text-green-800'
};

export default function NutritionCard({ nutrition }: NutritionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-4"
    >
      <h3 className="text-lg font-semibold mb-4">Nutrition Facts</h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(nutrition).map(([key, value]) => (
          <div
            key={key}
            className={`p-3 rounded-lg ${nutritionColors[key] || 'bg-gray-100 text-gray-800'}`}
          >
            <div className="text-sm font-medium capitalize">{key}</div>
            <div className="text-lg font-semibold">{value}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-gray-500">
        * Percent Daily Values are based on a 2000 calorie diet
      </div>
    </motion.div>
  );
}
