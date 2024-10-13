"use client";
import { Card } from "@/components/ui/card";
import { useChat } from "ai/react";
import React from "react";

const Results = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/chat",
    onError: (e) => {
      console.log(e);
    },
  });

  return (
    <div className="max-w-2xl w-full h-[500px] flex flex-col items-center">
      <div>Results</div>
      <Card className="w-full h-full">
        {messages.map((message, index) => (
          <p key={index}>{message.content}</p> // Replace `message.content` with the actual property you want to display
        ))}
      </Card>
    </div>
  );
};

export default Results;
