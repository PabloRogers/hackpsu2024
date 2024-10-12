import { Card } from "@/components/ui/card";
import React, { FC } from "react";
import FormStepHeader from "./FormStepHeader";

interface FormStepWrapperProps {
  children: React.ReactNode;
}
const FormStepWrapper: FC<FormStepWrapperProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="flex flex-col max-w-2xl w-full h-[350px] p-4">
        <FormStepHeader />
        <div className="flex items-center justify-center flex-grow">
          {children}
        </div>
      </Card>
    </div>
  );
};

export default FormStepWrapper;
