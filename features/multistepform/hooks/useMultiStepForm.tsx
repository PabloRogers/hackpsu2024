"use client";
import { ReactElement, useState } from "react";

export const useMultiStepForm = (steps: ReactElement[], names: string[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function nextStep() {
    setCurrentStepIndex((prev) => {
      if (prev >= steps.length - 1) return prev;
      return prev + 1;
    });
  }

  function backStep() {
    setCurrentStepIndex((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
  }

  return {
    currentStepIndex,
    nextStep,
    backStep,
    step: steps[currentStepIndex],
    steps,
    names,
  };
};
