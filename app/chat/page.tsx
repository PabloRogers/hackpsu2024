"use client";
import FormWrapper from "@/features/multistepform/components/FormWrapper";
import Results from "@/features/multistepform/components/Results";
import React, { useEffect, useState } from "react";
import OpenAI from "openai";
import ChatCompletion from "openai";

import { useFormDataStore } from "@/features/multistepform/context/store";

const Page = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Results />
    </div>
  );
};

export default Page;
