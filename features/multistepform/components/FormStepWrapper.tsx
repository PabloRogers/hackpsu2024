import { Card } from "@/components/ui/card";
import React, { FC } from "react";
import FormStepHeader from "./FormStepHeader";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FormStepWrapperProps {
  children: React.ReactNode;
}

const FormStepWrapper: FC<FormStepWrapperProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex justify-center items-center">
        <h1 className="text-6xl font-bold text-blue-500 animate-pulse mb-10">
          Pathfinder
        </h1>
      </div>
      <Card className="flex flex-col max-w-2xl w-full h-2/3 p-6">
        <FormStepHeader />
        <ScrollArea className="flex items-center justify-center flex-grow w-full h-full">
          <div className="w-full h-full">{children}</div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default FormStepWrapper;
