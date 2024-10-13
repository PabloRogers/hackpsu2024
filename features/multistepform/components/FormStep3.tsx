import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormWrapper from "./FormWrapper";
import { Textarea } from "@/components/ui/textarea";
import { useMultiStepFormContext } from "../context";
import { useFormDataStore } from "../context/store";

export const ChallengesInterests = z.object({
  challenges: z.string().min(1),
  growth: z.string().min(1),
  expansion: z.string().min(1),
  interest: z.string().min(1),
});

const questionMap = {
  challenges:
    "What challenges have you faced in working toward your career goals?",
  growth:
    "What areas of personal or professional growth are you currently focusing on?",
  expansion:
    "Are you open to exploring career paths outside your main area of study?",
  interest:
    "What specific aspects of your field of study interest you the most?",
};

const FormStep3 = () => {
  const form3Data = useFormDataStore.getState().Step3Data;
  const setForm3Data = useFormDataStore.getState().setStep3Data;
  const multiStepForm = useMultiStepFormContext();
  const form = useForm<z.infer<typeof ChallengesInterests>>({
    resolver: zodResolver(ChallengesInterests),
    defaultValues: {
      challenges: form3Data.challenges,
      growth: form3Data.growth,
      expansion: form3Data.expansion,
      interest: form3Data.interest,
    },
  });

  const onSubmit = (data: z.infer<typeof ChallengesInterests>) => {
    const result = Object.keys(data).reduce((acc, key) => {
      if (questionMap[key as keyof typeof questionMap]) {
        acc[questionMap[key as keyof typeof questionMap]] =
          data[key as keyof typeof data];
      }
      return acc;
    }, {} as Record<string, string>);

    const jsonData = JSON.stringify(result);
    multiStepForm.nextStep();
  };

  return (
    <FormWrapper>
      <h1 className="pb-4 text-3xl font-bold text-center text-blue-500">
        Challenges & Interests
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="challenges"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What challenges have you faced in working toward your career
                  goals?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Lack of opportunities, networking, skills development"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setForm3Data({
                        ...form3Data,
                        challenges: e.target.value,
                      });
                    }}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="growth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What areas of personal or professional growth are you
                  currently focusing on?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Leadership, technical skills, time management"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setForm3Data({
                        ...form3Data,
                        growth: e.target.value,
                      });
                    }}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expansion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Are you open to exploring career paths outside your main area
                  of study?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Yes / No"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setForm3Data({
                        ...form3Data,
                        expansion: e.target.value,
                      });
                    }}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What specific aspects of your field of study interest you the
                  most?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Research, practical application, innovation"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setForm3Data({
                        ...form3Data,
                        interest: e.target.value,
                      });
                    }}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Next</Button>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default FormStep3;
