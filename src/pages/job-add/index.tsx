import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { JobForm } from "@/components/job-form";

import { useAddJob } from "@/hooks/use-track-job";
import { useJobForm } from "@/stores/use-job-form";

const JobAddPage: React.FC = () => {
  const navigate = useNavigate();
  const { payload, isSubmitted, resetForm } = useJobForm((state) => state);
  const { mutateAsync: addJob, isPending, error } = useAddJob();

  useEffect(() => {
    if (isSubmitted) {
      const submit = async () => {
        const res = await addJob({ ...payload });
        if (res.success) {
          toast.success("Add job successful!");
          resetForm();
          navigate(`/job`, { replace: true });
        } else {
          toast.error("Add job failed!");
        }
        if (error) {
          toast.error(error.message);
        }
      };
      submit();
    }
  }, [payload, isSubmitted, resetForm, error, addJob, navigate]);

  return <JobForm isLoading={isPending} pageTitle="Add New Job" />;
};

export default JobAddPage;
