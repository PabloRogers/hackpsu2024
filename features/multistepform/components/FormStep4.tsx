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

export const PlanningResources = z.object({
  goals: z.string().min(1),
  platforms: z.string().min(1),
  resources: z.string().min(1),
  mentors: z.string().min(1),
  time: z.string().min(1),
});

const questionMap = {
  goals: "How do you currently plan or set goals for your career development?",
  platforms: "What career development tools or platforms have you used before?",
  resources:
    "What resources have you found helpful in advancing your career so far?",
  mentors:
    "Do you have any mentors or individuals guiding you in your career development?",
  time: "When do you hope to achieve your short-term career goals?",
};

const FormStep4 = () => {
  const form4Data = useFormDataStore.getState().Step4Data;
  const setForm4Data = useFormDataStore.getState().setStep4Data;
  const multiStepForm = useMultiStepFormContext();
  const form = useForm<z.infer<typeof PlanningResources>>({
    resolver: zodResolver(PlanningResources),
    defaultValues: {
      goals: form4Data.goals,
      platforms: form4Data.platforms,
      resources: form4Data.resources,
      mentors: form4Data.mentors,
      time: form4Data.time,
    },
  });

  const onSubmit = (data: z.infer<typeof PlanningResources>) => {
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
        Planning & Resources
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="goals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  How do you currently plan or set goals for your career
                  development?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Annual planning, through mentors, personal reflection"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="platforms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What career development tools or platforms have you used
                  before?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., LinkedIn, Coursera, career counseling services"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setForm4Data({
                        ...form4Data,
                        platforms: e.target.value,
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
            name="resources"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What resources have you found helpful in advancing your career
                  so far?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., online courses, mentors, professional organizations"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setForm4Data({
                        ...form4Data,
                        resources: e.target.value,
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
            name="mentors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Do you have any mentors or individuals guiding you in your
                  career development?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="If yes, briefly describe them."
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setForm4Data({
                        ...form4Data,
                        mentors: e.target.value,
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
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  When do you hope to achieve your short-term career goals?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., within 1 year, after graduation"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setForm4Data({
                        ...form4Data,
                        time: e.target.value,
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

export default FormStep4;
