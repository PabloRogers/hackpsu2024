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

const EducationalSchema = z.object({
  currentEducation: z.string().min(2).max(50),
  currentFieldOfStudy: z.string().min(2).max(50),
  yearOfProgram: z.string().min(1).max(50),
  careerGoals: z.string().min(2).max(50),
  careerAspirations: z.string().min(2).max(50),
});

const onSubmit = (data: z.infer<typeof EducationalSchema>) => {};

const FormStep1 = () => {
  const form = useForm<z.infer<typeof EducationalSchema>>({
    resolver: zodResolver(EducationalSchema),
    defaultValues: {},
  });
  return (
    <FormWrapper>
      <h1 className="pb-4">Educational Background</h1>
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
                  <Input
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
                  <Input
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
            name="currentFieldOfStudy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What year are you in your current program?
                </FormLabel>
                <FormControl>
                  <Input
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
            name="currentFieldOfStudy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Do you have any specific career goals in mind?
                </FormLabel>
                <FormControl>
                  <Input
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
            name="currentFieldOfStudy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What are your long-term career aspirations?
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., CEO, researcher, entrepreneur, etc."
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
