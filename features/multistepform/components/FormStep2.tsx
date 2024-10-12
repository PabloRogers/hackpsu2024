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

const SkillsExperience = z.object({
  skills: z.string().min(2).max(50),
  workExperience: z.string().min(2).max(50),
  qualifications: z.string().min(2).max(50),
  communities: z.string().min(2).max(50),
});

const FormStep2 = () => {
  const form = useForm<z.infer<typeof SkillsExperience>>({
    resolver: zodResolver(SkillsExperience),
    defaultValues: {},
  });

  const onSubmit = (data: z.infer<typeof SkillsExperience>) => {};

  return (
    <FormWrapper>
      <h1 className="pb-4">Skills & Experience</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What skills have you developed so far?</FormLabel>
                <FormControl>
                  <Input
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
                  <Input
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
                  <Input
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
                  <Input
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
