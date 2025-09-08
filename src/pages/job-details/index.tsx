import { SquarePen, Trash, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

import { Loading } from "@/components/loading";
import { ModalDialog } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { useGetJobById, useRemoveJob } from "@/hooks/use-track-job";
import { JobStatusTimeline } from "@/pages/job-details/job-statuses";
import { detailDateFormatter } from "@/utils/formatter";

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
      <Card className="p-3 py-5 sm:p-5">
        <div className="flex">
          <div className="grid grid-cols-2 justify-items-start gap-y-4 sm:gap-y-4 w-full">
            <div className="flex flex-col gap-1">
              <Label className="font-semibold">Job Title</Label>
              <span>{res?.data?.title}</span>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="font-semibold">Company Name</Label>
              <span>{res?.data?.company}</span>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="font-semibold">Location</Label>
              <span>{res?.data?.location}</span>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="font-semibold">Role</Label>
              <span>{res?.data?.role}</span>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="font-semibold">Type</Label>
              <span>{res?.data?.type}</span>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="font-semibold">Source</Label>
              <span>{res?.data?.source}</span>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="font-semibold">Applied On</Label>
              <span>{res?.data?.applyOn}</span>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="font-semibold">Applied Date</Label>
              <span>{detailDateFormatter(res?.data?.applyDate).local}</span>
            </div>
            {res?.data?.sourceLink && (
              <div className="flex flex-col col-span-2 gap-1">
                <Label className="font-semibold">Link</Label>
                <span className="truncate">{res?.data?.sourceLink}</span>
              </div>
            )}
          </div>
        </div>
        <JobStatusTimeline statuses={res?.data?.statuses} />
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
      </Card>
    </>
  );
};

export default JobDetailsPage;
