"use client";
import React from "react";
import { useMultiStepForm } from "./hooks/useMultiStepForm";
import FormStep1 from "./components/FormStep1";
import { MultiStepFormContext } from "./context";
import FormStep2 from "./components/FormStep2";
import FormStepWrapper from "./components/FormStepWrapper";
import FormStep3 from "./components/FormStep3";

const steps = [<FormStep1 />, <FormStep2 />, <FormStep3 />];
const names = ["Educational Background", "Step 2", "Step 3"];

const MultiStepForm = () => {
  const multiStepForm = useMultiStepForm(steps, names);
  return (
    <MultiStepFormContext.Provider value={multiStepForm}>
      <FormStepWrapper>{multiStepForm.step}</FormStepWrapper>
    </MultiStepFormContext.Provider>
  );
};

export default MultiStepForm;
