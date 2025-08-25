import { useCallback, useEffect } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

import { JobForm } from "@/components/job-form";
import { Loading } from "@/components/loading";

import { useGetJobById, useUpdateJob } from "@/hooks/use-track-job";
import { useJobForm } from "@/stores/use-job-form";

const JobEditPage = () => {
  const { id } = useParams();
  const { payload, isSubmitted, resetForm } = useJobForm((state) => state);
  const { data, isLoading } = useGetJobById(id!);
  const { mutateAsync, error, isPending: isUpdating } = useUpdateJob(id!);

  useEffect(() => {
    if (!data?.success && !isLoading) {
      toast.error("Job not found!", {
        toastId: "jobNotFound",
      });
      return;
    }
  }, [data, isLoading]);

  const submit = useCallback(
    () => async () => {
      const res = await mutateAsync({ ...payload });
      if (res.success) {
        toast.success("Job updated successfully!");
        resetForm();
      } else {
        toast.error("Update job failed!");
      }
      if (error) {
        toast.error(error.message);
      }
    },
    [error, mutateAsync, payload, resetForm]
  );

  useEffect(() => {
    console.log("isSubmitted", isSubmitted);
    if (isSubmitted) {
      const watchedValues =
        JSON.stringify(payload) !== JSON.stringify(data?.data);
      if (watchedValues) {
        toast.info("Nothing has changed. \nUpdate not saved!");
      } else {
        submit();
      }
    }
  }, [isSubmitted, data, payload, submit, error, mutateAsync, resetForm]);

  if (isLoading) return <Loading />;
  return (
    <JobForm
      isLoading={isUpdating}
      pageTitle="Edit Existed Job"
      payload={data?.data}
    />
  );
};

export default JobEditPage;
