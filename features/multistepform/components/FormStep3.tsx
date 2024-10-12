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

  return (
    <FormWrapper>
      <h1 className="pb-4">Skills & Experience</h1>
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
                  <Input
                    placeholder="e.g., Lack of opportunities, networking, skills development"
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
            name="growth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What areas of personal or professional growth are you
                  currently focusing on?
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Leadership, technical skills, time management"
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
            name="expansion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Are you open to exploring career paths outside your main area
                  of study?
                </FormLabel>
                <FormControl>
                  <Input placeholder="Yes / No" {...field} />
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
                  <Input
                    placeholder="e.g., Research, practical application, innovation"
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

export default FormStep3;
