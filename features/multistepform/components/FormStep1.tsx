import React from "react";
import FormStepWrapper from "./FormStepWrapper";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

const EducationalSchema = z.object({
  currentEducation: z.string().min(2).max(50),
  currentFieldOfStudy: z.string().min(2).max(50),
  yearOfProgram: z.string().min(1).max(50),
  careerGoals: z.string().min(2).max(50),
  careerAspirations: z.string().min(2).max(50),
});

const FormStep1 = () => {
  const multiStepForm = useMultiStepFormContext();
  const form = useForm<z.infer<typeof EducationalSchema>>({
    resolver: zodResolver(EducationalSchema),
    defaultValues: {},
  });

  const questionMap = {
    currentEducation: "What is your current educational background?",
    currentFieldOfStudy:
      "What field of study are you currently pursuing or interested in?",
    yearOfProgram: "What year are you in your current program?",
    careerGoals: "Do you have any specific career goals in mind?",
    careerAspirations: "What are your long-term career aspirations?",
  };

  const onSubmit = (data: z.infer<typeof EducationalSchema>) => {
    // Create a new object that maps questions to their corresponding answers
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
        Educational Background
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="currentEducation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What is your current educational background?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="High school, undergraduate, graduate, etc."
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
            name="currentFieldOfStudy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What field of study are you currently pursuing or interested
                  in?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Computer Science, Business, Engineering, etc.)"
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
            name="yearOfProgram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What year are you in your current program?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Freshman, Sophomore, etc."
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
            name="careerGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Do you have any specific career goals in mind?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Software Engineer, Data Scientist, etc."
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
            name="careerAspirations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What are your long-term career aspirations?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Executive, Consultant, Freelancer"
                    className="resize-none"
                    {...field}
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

export default FormStep1;
