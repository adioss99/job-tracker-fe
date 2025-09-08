import { Calendar, Plus } from "lucide-react";
import { useState } from "react";

import { ModalDialog } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { StatusFormComponent } from "@/pages/job-details/status-form";
import type { JobStatusesType } from "@/types/job-interfaces";
import { detailDateFormatter } from "@/utils/formatter";

export const JobStatusTimeline = ({
  statuses,
}: {
  statuses: JobStatusesType[];
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <Card className="mx-auto w-full py-2 px-3 mt-5">
      <div className="relative ml-3">
        {/* Timeline line */}
        <div className="absolute left-0 top-4 bottom-0 border-l-2" />
        {statuses.map((item, index) => (
          <div className="relative pl-5" key={index}>
            {/* Timeline dot */}
            <div className="absolute h-3 w-3 -translate-x-1/2 left-px top-3 rounded-full border-2 border-primary bg-background" />
            {/* Content */}
            <div className="space-y-0.5">
              <span className="text-sm font-medium">{item.status}</span>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>{detailDateFormatter(item.addDate).local}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button
        className="mt-5 w-full"
        variant={"outline"}
        onClick={() => {
          setDialogOpen(true);
        }}>
        <Plus />
        Add Status
      </Button>
      <ModalDialog
        buttonConfirm={
          <Button
            variant={"outline"}
            onClick={() => {
              // handleDeleteJob();
            }}>
            Add
          </Button>
        }
        children={<StatusFormComponent method="add" />}
        dialogTitle="Add new Status"
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </Card>
  );
};
