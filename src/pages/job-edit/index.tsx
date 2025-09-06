import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

import { JobForm } from "@/components/job-form";
import { Loading } from "@/components/loading";

import { useGetJobById, useUpdateJob } from "@/hooks/use-track-job";
import { useJobForm } from "@/stores/use-job-form";

const JobEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { payload, isSubmitted, resetForm } = useJobForm((state) => state);
  const { data, isLoading } = useGetJobById(id!);
  const { mutateAsync, error, isPending: isUpdating } = useUpdateJob(id!);

  useEffect(() => {
    if (!data?.success && !isLoading) {
      toast.error("Job not found!", {
        toastId: "jobNotFound",
      });
      toast.info("Redirecting in 5 seconds", {
        toastId: "redirect",
      });
      setInterval(() => navigate("/job"), 4500);
    }
  }, [data, isLoading, navigate]);

  useEffect(() => {
    const handleSubmit = async () => {
      const res = await mutateAsync({ ...payload });
      if (res.success) {
        toast.success("Job updated successfully!");
        resetForm();
        setInterval(() => navigate(`/job`, { replace: true }), 1000);
      } else {
        toast.error("Update job failed!");
      }
      if (error) {
        toast.error(error.message);
      }
    };
    if (isSubmitted) {
      handleSubmit();
    }
  }, [isSubmitted, data, payload, error, resetForm, mutateAsync, navigate]);

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
