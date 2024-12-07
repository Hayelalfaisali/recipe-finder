import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { formatTime } from '../utils/helpers';

interface Step {
  number: number;
  step: string;
  ingredients?: string[];
  equipment?: string[];
  length?: {
    number: number;
    unit: string;
  };
}

interface RecipeInstructionsProps {
  steps: Step[];
  totalTime: number;
}

export default function RecipeInstructions({ steps, totalTime }: RecipeInstructionsProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNumber)
        ? prev.filter((step) => step !== stepNumber)
        : [...prev, stepNumber]
    );
  };

  const progress = (completedSteps.length / steps.length) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Progress Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Instructions</h3>
          <div className="flex items-center text-sm text-gray-500">
            <ClockIcon className="h-5 w-5 mr-1" />
            {formatTime(totalTime)}
          </div>
        </div>

        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block text-accent-600">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-accent-600">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-accent-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-accent-500"
            />
          </div>
        </div>
      </div>

      {/* Steps List */}
      <div className="p-6">
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative pl-10 ${
                index !== steps.length - 1 ? 'pb-6 border-l border-gray-200' : ''
              }`}
            >
              <div
                className={`absolute left-0 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center ${
                  completedSteps.includes(step.number)
                    ? 'bg-green-100'
                    : currentStep === index
                    ? 'bg-accent-100'
                    : 'bg-gray-100'
                }`}
              >
                <button
                  onClick={() => toggleStep(step.number)}
                  className={`h-5 w-5 ${
                    completedSteps.includes(step.number)
                      ? 'text-green-600'
                      : currentStep === index
                      ? 'text-accent-600'
                      : 'text-gray-400'
                  }`}
                >
                  <CheckCircleIcon />
                </button>
              </div>

              <div
                className={`${
                  completedSteps.includes(step.number)
                    ? 'text-gray-400'
                    : 'text-gray-900'
                }`}
              >
                <h4 className="text-sm font-medium mb-2">Step {step.number}</h4>
                <p className="text-sm mb-3">{step.step}</p>

                {/* Ingredients and Equipment */}
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {step.ingredients && step.ingredients.length > 0 && (
                    <div>
                      <h5 className="text-xs font-medium text-gray-500 mb-1">
                        Ingredients Needed
                      </h5>
                      <ul className="text-xs space-y-1">
                        {step.ingredients.map((ingredient) => (
                          <li key={ingredient} className="flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-2" />
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {step.equipment && step.equipment.length > 0 && (
                    <div>
                      <h5 className="text-xs font-medium text-gray-500 mb-1">
                        Equipment Needed
                      </h5>
                      <ul className="text-xs space-y-1">
                        {step.equipment.map((item) => (
                          <li key={item} className="flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Step Timer */}
                {step.length && (
                  <div className="mt-3">
                    <button
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                      onClick={() => {
                        // Here you could implement a timer functionality
                        console.log(`Set timer for ${step.length?.number} ${step.length?.unit}`);
                      }}
                    >
                      <ClockIcon className="h-4 w-4 mr-1" />
                      Set timer for {step.length.number} {step.length.unit}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous Step
          </button>
          <button
            onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
            disabled={currentStep === steps.length - 1}
            className="px-4 py-2 text-sm font-medium text-white bg-accent-600 border border-transparent rounded-md shadow-sm hover:bg-accent-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
}
