import { Ellipsis, Eye, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";

import { Loading } from "@/components/loading";
import { ModalDialog } from "@/components/modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRemoveJob } from "@/hooks/use-track-job";

export const ActionButton = ({ id }: { id: string }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { mutateAsync: removeJob, isPending } = useRemoveJob(id!);
  const handleDeleteJob = async () => {
    const res = await removeJob();
    if (res.success) {
      toast.success("Delete job successful!");
    } else {
      toast.error("Delete job failed!");
    }
  };
  if (isPending) return <Loading />;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="text-center data-[state=open]:bg-muted text-muted-foreground flex size-8"
          id="dropdown-trigger-button"
          size="icon"
          variant="ghost">
          <Ellipsis />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <Link className="flex gap-2 items-center px-1" to={`/job/${id}`}>
          <DropdownMenuItem className="w-full">
            <Eye />
            Details
          </DropdownMenuItem>
        </Link>
        <Link className="flex gap-2 items-center px-1" to={`/job/edit/${id}`}>
          <DropdownMenuItem className="w-full">
            <SquarePen />
            Edit
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Button
          className="w-full justify-start rounded-sm text-red-500 hover:bg-red-100 hover:text-red-600"
          variant="ghost"
          onClick={() => {
            setDialogOpen(true);
          }}>
          <Trash2 />
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
