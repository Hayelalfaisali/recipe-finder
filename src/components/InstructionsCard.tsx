import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';

interface Step {
  number: number;
  step: string;
  ingredients?: { name: string }[];
  equipment?: { name: string }[];
}

interface InstructionsCardProps {
  instructions: Step[];
}

export default function InstructionsCard({ instructions }: InstructionsCardProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev =>
      prev.includes(stepNumber)
        ? prev.filter(step => step !== stepNumber)
        : [...prev, stepNumber]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <h3 className="text-xl font-semibold mb-6">Instructions</h3>
      <div className="space-y-6">
        {instructions.map((step) => {
          const isCompleted = completedSteps.includes(step.number);
          return (
            <motion.div
              key={step.number}
              className={`flex items-start space-x-4 p-4 rounded-lg transition-colors ${
                isCompleted ? 'bg-green-50' : 'bg-gray-50'
              }`}
              whileHover={{ scale: 1.01 }}
            >
              <button
                onClick={() => toggleStep(step.number)}
                className="mt-1 flex-shrink-0"
              >
                {isCompleted ? (
                  <CheckCircleIconSolid className="h-6 w-6 text-green-500" />
                ) : (
                  <CheckCircleIcon className="h-6 w-6 text-gray-400" />
                )}
              </button>
              <div className="flex-1">
                <p className={`text-gray-900 ${isCompleted ? 'line-through' : ''}`}>
                  {step.step}
                </p>
                {(step.ingredients?.length || step.equipment?.length) && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {step.ingredients?.map((ingredient) => (
                      <span
                        key={ingredient.name}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {ingredient.name}
                      </span>
                    ))}
                    {step.equipment?.map((item) => (
                      <span
                        key={item.name}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
