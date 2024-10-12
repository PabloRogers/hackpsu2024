import React, { FC } from "react";

interface FormWrapperProps {
  children: React.ReactNode;
}

const FormWrapper: FC<FormWrapperProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};

export default FormWrapper;
