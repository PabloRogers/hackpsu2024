import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ChallengesInterests = z.object({
  challenges: z.string().min(2).max(50),
  growth: z.string().min(2).max(50),
  expansion: z.string().min(2).max(50),
  interest: z.string().min(2).max(50),
});

const FormStep3 = () => {
  const form = useForm<z.infer<typeof ChallengesInterests>>({
    resolver: zodResolver(ChallengesInterests),
    defaultValues: {},
  });

  const onSubmit = (data: z.infer<typeof ChallengesInterests>) => {};

  return <div>FormStep3</div>;
};

export default FormStep3;
