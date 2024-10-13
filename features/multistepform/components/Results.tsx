"use client";
import { Card } from "@/components/ui/card";
import { useChat } from "ai/react";
import React, { useEffect, useState } from "react";
import { useFormDataStore } from "../context/store";
import { ChatCompletion } from "openai/resources/index.mjs";
import { ScrollArea } from "@/components/ui/scroll-area";

const Results = () => {
  const formData = useFormDataStore.getState();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
  } = useChat({
    keepLastMessageOnError: true,
  });

  const [response, setResponse] = useState<ChatCompletion | null>(null);

  useEffect(() => {
    const data = JSON.stringify(formData.getAllData()); // Convert your JSON data to a string
    setInput(data); // Set the input to the JSON data
  }, []);

  useEffect(() => {
    if (input) {
      handleSubmit(); // Submit the form
    }
  }, [input]); // This effect runs every time `input` changesSubmit the form

  return (
    <div className="w-5/6  h-[600px] flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center text-blue-500">
        Results 🎉
      </h1>
      <Card className="w-full h-full p-10">
        <ScrollArea className="flex items-center justify-center flex-grow w-full h-full">
          {messages.map(
            (message) =>
              message.role === "assistant" && (
                <div
                  key={message.id}
                  dangerouslySetInnerHTML={{ __html: message.content }}
                />
              )
          )}
        </ScrollArea>
      </Card>
    </div>
  );
};

export default Results;
