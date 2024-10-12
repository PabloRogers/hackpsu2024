import { Card } from "@/components/ui/card";
import React, { FC } from "react";
import FormStepHeader from "./FormStepHeader";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FormStepWrapperProps {
  children: React.ReactNode;
}

const FormStepWrapper: FC<FormStepWrapperProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen">
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
