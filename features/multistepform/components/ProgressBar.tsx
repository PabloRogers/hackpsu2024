import React from "react";
import { useMultiStepFormContext } from "../context";

const ProgressBar = () => {
  const multiStepForm = useMultiStepFormContext();

  return (
    <div className="flex items-center justify-between w-full">
      {[...Array(multiStepForm.steps.length)].map((_, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <div
              className={`flex-grow rounded h-1 mx-1 transition-all duration-300 ${
                multiStepForm.currentStepIndex >= i
                  ? "bg-indigo-500"
                  : "bg-gray-200"
              }`}
            />
          )}
          <div
            className={`relative w-2 h-2 rounded-full transition-all duration-300 border-2 ${
              multiStepForm.currentStepIndex === i
                ? "bg-indigo-500 border-indigo-500 scale-110" // Highlight the current step
                : multiStepForm.currentStepIndex > i
                ? "bg-blue-500 border-indigo-500"
                : "bg-gray-200 border-gray-200"
            }`}
          >
            {multiStepForm.currentStepIndex === i && (
              <div
                className={`absolute whitespace-nowrap text-sm ${
                  i === multiStepForm.steps.length - 1
                    ? "-top-6 right-full mr-2"
                    : "-top-6 left-full ml-2"
                }`}
              >
                {multiStepForm.names[multiStepForm.currentStepIndex]}
              </div>
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBar;
