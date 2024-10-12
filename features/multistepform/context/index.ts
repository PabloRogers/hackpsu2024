import { createContext, useContext } from "react";

interface MultiStepForm {
  currentStepIndex: number;
  nextStep: () => void;
  backStep: () => void;
  step: JSX.Element;
  steps: JSX.Element[];
  names: string[];
}

export const MultiStepFormContext = createContext<MultiStepForm | undefined>(
  undefined
);

export const useMultiStepFormContext = () => {
  const multiStepForm = useContext(MultiStepFormContext);
  if (!multiStepForm) {
    throw new Error(
      "useMultiStepFormContext must be used within a MultiStepFormProvider"
    );
  }
  return multiStepForm;
};
