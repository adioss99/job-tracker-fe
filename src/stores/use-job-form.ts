import { create } from "zustand";

import type { AddJobFormData } from "@/validation/job-validation";

type JobFormState = {
  isSubmitted: boolean;
  payload: AddJobFormData;
  setFormData: (data: AddJobFormData) => void;
  resetForm: () => void;
};

export const useJobForm = create<JobFormState>()((set, _get) => ({
  isSubmitted: false,
  payload: {
    title: "",
    company: "",
    role: "Full Time",
    type: "Onsite",
    source: "LinkedIn",
    sourceLink: "",
    location: "",
    applyDate: new Date(),
    applyOn: "InApp",
  },
  setFormData: (data) => set({ isSubmitted: true, payload: { ...data } }),
  resetForm: () =>
    set({
      isSubmitted: false,
      payload: {
        title: "",
        company: "",
        role: "Full Time",
        type: "Onsite",
        source: "LinkedIn",
        sourceLink: "",
        location: "",
        applyDate: new Date(),
        applyOn: "InApp",
      },
    }),
}));
