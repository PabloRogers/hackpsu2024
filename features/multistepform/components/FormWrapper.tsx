import React, { FC } from "react";

interface FormWrapperProps {
  children: React.ReactNode;
}

const FormWrapper: FC<FormWrapperProps> = ({ children }) => {
  return <div className="w-2/3">{children}</div>;
};

export default FormWrapper;
