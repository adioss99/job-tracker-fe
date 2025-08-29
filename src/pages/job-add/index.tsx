import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { toast } from "react-toastify";

import { JobForm } from "@/components/job-form";

import { useAddJob } from "@/hooks/use-track-job";
import { useJobForm } from "@/stores/use-job-form";

const JobAddPage: React.FC = () => {
  const [redirect, setRedirect] = useState(false);
  const { payload, isSubmitted, resetForm } = useJobForm((state) => state);
  const { mutateAsync: addJob, isPending, error } = useAddJob();

  useEffect(() => {
    if (isSubmitted) {
      const submit = async () => {
        const res = await addJob({ ...payload });
        if (res.success) {
          toast.success("Add job successful!");
          setInterval(() => setRedirect(true), 1000);
          resetForm();
        } else {
          toast.error("Add job failed!");
        }
        if (error) {
          toast.error(error.message);
        }
      };
      submit();
    }
  }, [payload, isSubmitted, resetForm, error, addJob]);

  if (redirect) return <Navigate to="/job" replace />;

  return <JobForm isLoading={isPending} pageTitle="Add New Job" />;
};

export default JobAddPage;
