import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, TextCursorInput } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useAddJobStatus,
  useRemoveJobStatus,
  useUpdateJobStatus,
} from "@/hooks/use-job-statuses";
import type {
  JobStatusesResponse,
  JobStatusesType,
} from "@/types/job-interfaces";
import {
  statusSchema,
  type StatusFormData,
} from "@/validation/status-validation";

const selectList = [
  {
    value: "rejected",
    label: "Rejected",
  },
  {
    value: "hired",
    label: "Hired",
  },
  {
    value: "interview",
    label: "Interview",
  },
  {
    value: "test",
    label: "Test",
  },
];

export const StatusFormComponent = ({
  method = "add",
  item,
}: {
  item?: JobStatusesType;
  method: "add" | "update" | "delete";
}) => {
  const { id } = useParams();
  const [isOther, setIsOther] = useState(false);

  const { mutateAsync: addStatus } = useAddJobStatus(id!);
  const { mutateAsync: updateStatus } = useUpdateJobStatus(id!, item?.id ?? "");
  const { mutateAsync: removeStatus } = useRemoveJobStatus(id!, item?.id ?? "");

  const date = item?.addDate ? new Date(item.addDate) : new Date();
  const form = useForm<StatusFormData>({
    resolver: zodResolver(statusSchema),
    defaultValues: {
      status: item?.status ?? "",
      statusInput: "",
      addDate: date,
    },
  });

  const onSubmit = async (values: StatusFormData) => {
    const payload: JobStatusesType = {
      status: values.status,
      addDate: values.addDate,
    };
    if (isOther && values.statusInput !== "") {
      payload.status = values.statusInput ?? values.status;
    }
    await submitHandler(payload);
  };

  const submitHandler = async (payload: JobStatusesType) => {
    let res: JobStatusesResponse = {
      success: false,
      message: "Something went wrong",
    };

    if (method === "add") {
      res = await addStatus(payload);
    } else if (method === "update") {
      res = await updateStatus(payload);
    } else {
      res = await removeStatus();
    }

    if (res.success) {
      toast.success(
        `${method === "add" ? "Add" : "Update"} status successful!`
      );
    } else {
      toast.error(`Task failed. ${res.message}`);
    }
  };

  const handleDeleteStatus = async () => {
    const res = await removeStatus();
    if (res.success) {
      toast.success("Delete status successful!");
    } else {
      toast.error("Delete status failed!");
    }
  };
  if (method === "delete") {
    return (
      <div className="flex justify-between w-full">
        <p>Are you sure you want to delete this status?</p>
        <Button
          className="hidden"
          id="delete-status"
          onClick={handleDeleteStatus}>
          Delete
        </Button>
      </div>
    );
  }
  return (
    <Form {...form}>
      <form
        className="space-y-8 @container"
        onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <div className="flex justify-between w-full">
                  <FormLabel className="flex shrink-0">Select status</FormLabel>
                  <FormMessage />
                </div>
                <div className="w-full">
                  <FormControl>
                    <Select
                      key="status"
                      {...field}
                      onValueChange={(val) => {
                        if (val === "other") {
                          setIsOther(true);
                        } else {
                          setIsOther(false);
                        }
                        field.onChange(val);
                      }}>
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectList.map((item) => (
                          <SelectItem
                            key={`${item.value}`}
                            value={`${item.value}`}>
                            {item.label}
                          </SelectItem>
                        ))}
                        <SelectItem key="other" value="other">
                          <TextCursorInput className="opacity-50" />
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          {isOther && (
            <FormField
              control={form.control}
              name="statusInput"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                    <FormLabel className="flex shrink-0">
                      Input status
                    </FormLabel>

                    <div className="w-full">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            placeholder="Input status"
                            type="text"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </div>
                  </FormItem>
                );
              }}
            />
          )}
          <FormField
            control={form.control}
            name="addDate"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Add date *</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          className="justify-start text-left font-normal w-full"
                          id="date-0"
                          name="addDate"
                          variant={"outline"}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span className="text-muted-foreground">
                              Pick a date
                            </span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button className="hidden" id="submit-status-form" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
