import { SquarePen, Trash, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

import { Loading } from "@/components/loading";
import { ModalDialog } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useGetJobById, useRemoveJob } from "@/hooks/use-track-job";

const JobDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: res, isLoading, error } = useGetJobById(id!);
  const { mutateAsync: removeJob, isPending } = useRemoveJob(id!);
  const handleDeleteJob = async () => {
    const res = await removeJob();
    if (res.success) {
      toast.success("Delete job successful!");
      navigate("/job");
    } else {
      navigate("/job");
      toast.error("Delete job failed!");
    }
  };
  if (isLoading || isPending) {
    return <Loading />;
  } else if (error || !res?.data) {
    return (
      <div className="text-center text-xl font-bold my-10">
        Something went wrong
      </div>
    );
  }

  return (
    <>
      <h1 className="text-xl font-bold text-center mb-5">Job details</h1>
      <div className="flex gap-2">
        <Label className="font-semibold"> Job Title: </Label>
        <span>{res?.data?.title}</span>
      </div>
      <div className="flex gap-2">
        <Label className="font-semibold">Company Name: </Label>
        <span>{res?.data?.company}</span>
      </div>
      <div className="flex gap-2 mt-5 justify-end">
        <Button
          variant={"destructive"}
          onClick={() => {
            setDialogOpen(true);
          }}>
          <Trash />
          Delete
        </Button>
        <ModalDialog
          buttonConfirm={
            <Button
              variant={"destructive"}
              onClick={() => {
                handleDeleteJob();
              }}>
              <Trash2 />
              Delete
            </Button>
          }
          children="Are you sure you want to delete this job?"
          dialogTitle="Delete Job"
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
        <Link to={`/job/edit/${id}`}>
          <Button variant={"outline"}>
            <SquarePen />
            Edit
          </Button>
        </Link>
      </div>
      <pre>{JSON.stringify(res, null, 2)}</pre>
    </>
  );
};

export default JobDetailsPage;
