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

const SkillsExperience = z.object({
  skills: z.string().min(2).max(50),
  workExperience: z.string().min(2).max(50),
  qualifications: z.string().min(2).max(50),
  communities: z.string().min(2).max(50),
});

const questionMap = {
  skills: "What skills have you developed so far?",
  workExperience:
    "Have you completed any internships, part-time jobs, or volunteer experiences related to your field?",
  qualifications:
    "Are there specific certifications, courses, or qualifications you want to pursue?",
  communities:
    "Are you involved in any professional networks, communities, or student organizations?",
};

const FormStep2 = () => {
  const multiStepForm = useMultiStepFormContext();

  const onSubmit = (data: z.infer<typeof SkillsExperience>) => {
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

  const form = useForm<z.infer<typeof SkillsExperience>>({
    resolver: zodResolver(SkillsExperience),
    defaultValues: {},
  });

  return (
    <FormWrapper>
      <h1 className="pb-4 text-3xl font-bold text-center text-blue-500">
        Skills & Experience
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What skills have you developed so far?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Communication, Analytical skills, Project management"
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
            name="workExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Have you completed any internships, part-time jobs, or
                  volunteer experiences related to your field?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="If yes, briefly describe them."
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
            name="qualifications"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Are there specific certifications, courses, or qualifications
                  you want to pursue?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., CPA, TEFL, Six Sigma, etc."
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
            name="communities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Are you involved in any professional networks, communities, or
                  student organizations?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g.Future Teachers of America, etc."
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

export default FormStep2;
