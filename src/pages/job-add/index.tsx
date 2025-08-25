import { useEffect } from "react";
import { toast } from "react-toastify";

import { JobForm } from "@/components/job-form";

import { useAddJob } from "@/hooks/use-track-job";
import { useJobForm } from "@/stores/use-job-form";

const JobAddPage: React.FC = () => {
  const { payload, isSubmitted, resetForm } = useJobForm((state) => state);
  const { mutateAsync: addJob, isPending, error } = useAddJob();

  useEffect(() => {
    if (isSubmitted) {
      const submit = async () => {
        const res = await addJob({ ...payload });
        console.log(payload);
        console.log(res);
        if (res.success) {
          toast.success("Add job successful!");
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

  return <JobForm isLoading={isPending} pageTitle="Add New Job" />;
};

export default JobAddPage;
