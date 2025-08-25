import { useEffect } from "react";

import { JobForm } from "@/components/job-form";

import { useJobForm } from "@/stores/use-job-form";

const JobEditPage = () => {
  const payload = useJobForm((state) => state.payload);
  const isSubmitted = useJobForm((state) => state.isSubmitted);
  console.log(" isSubmitted", isSubmitted);

  useEffect(() => {
    if (isSubmitted) return console.log("payload", payload);
  }, [payload, isSubmitted]);

  return <JobForm pageTitle="Edit Job Existed" />;
};

export default JobEditPage;
