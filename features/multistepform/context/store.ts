import { z } from "zod";
import { create } from "zustand";
import FormStep1, { EducationalSchema } from "../components/FormStep1";
import { SkillsExperience } from "../components/FormStep2";
import { ChallengesInterests } from "../components/FormStep3";
import { PlanningResources } from "../components/FormStep4";
import { PersonalPreferences } from "../components/FormStep5";

interface FormStore {
  Step1Data: z.infer<typeof EducationalSchema>;
  Step2Data: z.infer<typeof SkillsExperience>;
  Step3Data: z.infer<typeof ChallengesInterests>;
  Step4Data: z.infer<typeof PlanningResources>;
  Step5Data: z.infer<typeof PersonalPreferences>;
  setStep1Data: (data: z.infer<typeof EducationalSchema>) => void;
  setStep2Data: (data: z.infer<typeof SkillsExperience>) => void;
  setStep3Data: (data: z.infer<typeof ChallengesInterests>) => void;
  setStep4Data: (data: z.infer<typeof PlanningResources>) => void;
  setStep5Data: (data: z.infer<typeof PersonalPreferences>) => void;
  getAllData: () => CombinedDataWithQuestions;
}

const questionMap = {
  currentEducation: "What is your current educational background?",
  currentFieldOfStudy:
    "What field of study are you currently pursuing or interested in?",
  yearOfProgram: "What year are you in your current program?",
  careerGoals: "Do you have any specific career goals in mind?",
  careerAspirations: "What are your long-term career aspirations?",
  skills: "What skills have you developed so far?",
  workExperience:
    "Have you completed any internships, part-time jobs, or volunteer experiences related to your field?",
  qualifications:
    "Are there specific certifications, courses, or qualifications you want to pursue?",
  communities:
    "Are you involved in any professional networks, communities, or student organizations?",
  challenges:
    "What challenges have you faced in working toward your career goals?",
  growth:
    "What areas of personal or professional growth are you currently focusing on?",
  expansion:
    "Are you open to exploring career paths outside your main area of study?",
  interest:
    "What specific aspects of your field of study interest you the most?",
  goals: "How do you currently plan or set goals for your career development?",
  platforms: "What career development tools or platforms have you used before?",
  resources:
    "What resources have you found helpful in advancing your career so far?",
  mentors:
    "Do you have any mentors or individuals guiding you in your career development?",
  time: "When do you hope to achieve your short-term career goals?",
  environment: "What type of work environment do you prefer?",
  teams:
    "Do you enjoy working in teams, or do you prefer to work independently?",
  worklife: "What is important to you when it comes to work-life balance?",
};

type CombinedDataType = {
  currentEducation: string;
  currentFieldOfStudy: string;
  yearOfProgram: string;
  careerGoals: string;
  careerAspirations: string;
  skills: string;
  workExperience: string;
  qualifications: string;
  communities: string;
  challenges: string;
  growth: string;
  expansion: string;
  interest: string;
  goals: string;
  platforms: string;
  resources: string;
  mentors: string;
  time: string;
  environment: string;
  teams: string;
  worklife: string;
};

type CombinedDataWithQuestions = {
  [key: string]: {
    question: string;
    answer: string;
  };
};

export const useFormDataStore = create<FormStore>((set, get) => ({
  Step1Data: {
    currentEducation: "",
    currentFieldOfStudy: "",
    yearOfProgram: "",
    careerGoals: "",
    careerAspirations: "",
  },
  Step2Data: {
    skills: "",
    workExperience: "",
    qualifications: "",
    communities: "",
  },
  Step3Data: {
    challenges: "",
    growth: "",
    expansion: "",
    interest: "",
  },
  Step4Data: {
    goals: "",
    platforms: "",
    resources: "",
    mentors: "",
    time: "",
  },
  Step5Data: {
    environment: "",
    teams: "",
    worklife: "",
  },
  setStep1Data: (data) => set({ Step1Data: data }),
  setStep2Data: (data) => set({ Step2Data: data }),
  setStep3Data: (data) => set({ Step3Data: data }),
  setStep4Data: (data) => set({ Step4Data: data }),
  setStep5Data: (data) => set({ Step5Data: data }),
  getAllData: () => {
    const { Step1Data, Step2Data, Step3Data, Step4Data, Step5Data } = get();

    // Combine all data
    const combinedData: CombinedDataType = {
      ...Step1Data,
      ...Step2Data,
      ...Step3Data,
      ...Step4Data,
      ...Step5Data,
    };

    const combinedDataWithQuestions: CombinedDataWithQuestions = {};
    (Object.keys(combinedData) as Array<keyof CombinedDataType>).forEach(
      (key) => {
        combinedDataWithQuestions[key] = {
          question: questionMap[key],
          answer: combinedData[key],
        };
      }
    );

    return combinedDataWithQuestions;
  },
}));

// Usage Example
// const formDataStore = useFormDataStore();
// const allDataWithQuestions = formDataStore.getAllData();
// console.log(JSON.stringify(allDataWithQuestions, null, 2));
