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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="currentEducation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default FormStep1;
