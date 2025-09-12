import { Calendar, Edit, Plus, Trash2 } from "lucide-react";
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
  const [data, setData] = useState<JobStatusesType | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"add" | "update" | "delete">(
    "add"
  );

  return (
    <Card className="mx-auto w-full py-2 px-3 mt-5">
      <div className="relative ml-3">
        {/* Timeline line */}
        <div className="absolute left-0 top-4 bottom-0 border-l-2" />
        {statuses.map((item, index) => (
          <div className="relative pl-6 pb-2 pt-1 last:pb-0" key={index}>
            {/* Timeline dot */}
            <div className="absolute h-3 w-3 -translate-x-1/2 left-px top-3 rounded-full border-2 border-primary bg-background" />
            {/* Content */}
            <div className=" flex justify-between">
              <div className="space-y-0.5">
                <span className="text-sm font-medium">{item.status}</span>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{detailDateFormatter(item.addDate).local}</span>
                </div>
              </div>
              {item.id && (
                <div className="flex">
                  {/* Update status */}
                  <Button
                    variant={"outline"}
                    onClick={() => {
                      setDialogOpen(true);
                      setDialogType("update");
                      setData(item);
                    }}>
                    <Edit />
                  </Button>
                  {/* Delete status */}
                  <Button
                    className="border-red-400 ml-2 text-red-500 hover:text-red-400 hover:bg-red-200/10"
                    variant={"outline"}
                    onClick={() => {
                      setDialogOpen(true);
                      setDialogType("delete");
                      setData(item);
                    }}>
                    <Trash2 />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Add Status */}
      <Button
        className="mt-5 w-full"
        variant={"outline"}
        onClick={() => {
          setDialogOpen(true);
          setDialogType("add");
        }}>
        <Plus />
        Add Status
      </Button>

      {/* Modal */}
      <ModalDialog
        buttonConfirm={
          <Button
            variant={dialogType === "delete" ? "destructive" : "default"}
            onClick={() => {
              if (dialogType === "delete") {
                document.getElementById("delete-status")?.click();
              } else {
                document.getElementById("submit-status-form")?.click();
              }
            }}>
            {dialogType === "delete" ? "Delete" : "Save"}
          </Button>
        }
        children={
          <StatusFormComponent
            item={dialogType !== "add" ? data : undefined}
            method={`${dialogType}`}
          />
        }
        dialogTitle={(() => {
          switch (dialogType) {
            case "add":
              return "Add new Status";
            case "update":
              return "Update Status";
            case "delete":
              return "Delete Status";
            default:
              return "Status"; // fallback
          }
        })()}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </Card>
  );
};
