import { Button } from "@/components/ui/button";
import React from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import { useMultiStepFormContext } from "../context";
import ProgressBar from "./ProgressBar";

const FormStepHeader = () => {
  const multiStepForm = useMultiStepFormContext();
  return (
    <div className="flex justify-between space-x-4">
      <ProgressBar />
      <div className="flex justify-end text-black/50">
        <div className="flex justify-center items-center space-x-1">
          <Button variant="ghost" size="icon" onClick={multiStepForm.backStep}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-shrink-0">
            {multiStepForm.currentStepIndex + 1} / {multiStepForm.steps.length}
          </div>
          <Button variant="ghost" size="icon" onClick={multiStepForm.nextStep}>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormStepHeader;
