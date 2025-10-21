import confetti from "canvas-confetti";
import { Copy, CopyCheck, SquarePen, Trash, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

import { Loading } from "@/components/loading";
import { ModalDialog } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useGetJobById, useRemoveJob } from "@/hooks/use-track-job";
import { JobStatusTimeline } from "@/pages/job-details/job-statuses";
import { detailDateFormatter } from "@/utils/formatter";

const JobDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { data: res, isLoading, error } = useGetJobById(id!);
  const { mutateAsync: removeJob, isPending } = useRemoveJob(id!);

  const handleConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;
    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        zIndex: 100,
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        zIndex: 100,
      });
    }, 250);
  };

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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

  useEffect(() => {
    const latestStatus = res?.data?.statuses;
    if (latestStatus && latestStatus.length > 0) {
      const last = latestStatus[latestStatus.length - 1];
      if (last?.status === "Hired") {
        handleConfetti();
      }
    }
  }, [res]);

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
              <div className="flex flex-col col-span-2 gap-1 w-full">
                <Label className="font-semibold" htmlFor="sourceLink">
                  Link
                </Label>
                <span className="relative">
                  <Input
                    className="opacity-75"
                    id="sourceLink"
                    value={res?.data?.sourceLink}
                    readOnly
                  />
                  <Button
                    className="absolute h-7 w-7 right-1 top-1"
                    size={"icon"}
                    variant="ghost"
                    onClick={() => handleCopy(res.data.sourceLink as string)}>
                    {isCopied ? (
                      <CopyCheck className="opacity-50" />
                    ) : (
                      <Copy className="opacity-80" />
                    )}
                  </Button>
                </span>
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
