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

export const SkillsExperience = z.object({
  skills: z.string().min(1),
  workExperience: z.string().min(1),
  qualifications: z.string().min(1),
  communities: z.string().min(1),
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
  const form2Data = useFormDataStore.getState().Step2Data;
  const setForm2Data = useFormDataStore.getState().setStep2Data;

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
    defaultValues: {
      skills: form2Data.skills,
      workExperience: form2Data.workExperience,
      qualifications: form2Data.qualifications,
      communities: form2Data.communities,
    },
  });

  return (
    <FormWrapper>
      <h1 className="pb-4 text-3xl font-bold text-center text-indigo-500">
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
                    onChange={(e) => {
                      field.onChange(e);
                      setForm2Data({
                        ...form2Data,
                        skills: e.target.value,
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
                    onChange={(e) => {
                      field.onChange(e);
                      setForm2Data({
                        ...form2Data,
                        workExperience: e.target.value,
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
                    onChange={(e) => {
                      field.onChange(e);
                      setForm2Data({
                        ...form2Data,
                        qualifications: e.target.value,
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
                    onChange={(e) => {
                      field.onChange(e);
                      setForm2Data({
                        ...form2Data,
                        communities: e.target.value,
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

export default FormStep2;
