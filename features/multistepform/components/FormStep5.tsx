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

const PersonalPreferences = z.object({
  environment: z.string().min(2).max(50),
  teams: z.string().min(2).max(50),
  worklife: z.string().min(2).max(50),
});

const FormStep5 = () => {
  const form = useForm<z.infer<typeof PersonalPreferences>>({
    resolver: zodResolver(PersonalPreferences),
    defaultValues: {},
  });

  const multiStepForm = useMultiStepFormContext();

  const onSubmit = (data: z.infer<typeof PersonalPreferences>) => {
    multiStepForm.nextStep();
  };

  return (
    <FormWrapper>
      <h1 className="pb-4 text-3xl font-bold text-center text-blue-500">
        Personal Preferences
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="environment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What type of work environment do you prefer?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Collaborative, independent, structured, flexible"
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
            name="teams"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Do you enjoy working in teams, or do you prefer to work
                  independently?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="If you enjoy working in teams, what type of team dynamic do you prefer?"
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
            name="worklife"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What is important to you when it comes to work-life balance?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Flexible hours, remote work, clearly defined hours"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default FormStep5;
