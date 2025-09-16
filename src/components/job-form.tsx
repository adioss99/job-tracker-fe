import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Edit, Link, Loader2Icon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { ModalDialog } from "@/components/modal";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { useGetAi } from "@/hooks/use-n8n";
import { useJobForm } from "@/stores/use-job-form";
import type { JobRequest } from "@/types/job-interfaces";
import { type AddJobFormData, addJobSchema } from "@/validation/job-validation";

interface JobFormProps {
  pageTitle: string;
  isLoading: boolean;
  payload?: JobRequest;
}

const roles = ["Full Time", "Part Time", "Freelance", "Contract", "Internship"];
const types = ["Onsite", "Remote", "Hybrid"];
const sources = [
  "LinkedIn",
  "Glints",
  "Socmed",
  "Jobstreet",
  "Indeed",
  "Other",
];
const applyOns = [
  "InApp",
  "Email",
  "Company Web",
  "GoogleForm",
  "Whatsapp",
  "Other",
];

export const JobForm: React.FC<JobFormProps> = ({
  pageTitle,
  isLoading,
  payload,
}) => {
  const { data: aiResponse, isLoading: isAiLoading, error } = useGetAi();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const setFormData = useJobForm((state) => state.setFormData);

  const date = payload?.applyDate ? new Date(payload.applyDate) : new Date();
  const form = useForm<AddJobFormData>({
    resolver: zodResolver(addJobSchema),
    defaultValues: {
      title: payload?.title || "",
      company: payload?.company || "",
      role: payload?.role || "Full Time",
      type: payload?.type || "Onsite",
      source: payload?.source || "LinkedIn",
      sourceLink: payload?.sourceLink || "",
      location: payload?.location || "",
      applyDate: date,
      applyOn: payload?.applyOn || "InApp",
    },
  });

  const onSubmit = (values: AddJobFormData) => {
    setFormData(values);
  };

  const onAISubmit = async () => {
    console.log(aiResponse);
    if (error) {
      toast.error("AI Assist Error, please try again later");
      return;
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          autoComplete="off"
          className="w-full bg-white sm:p-5 md:p-2"
          onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-3">
            <h1
              className="text-xl font-bold col-span-12 col-start-auto text-center mb-5"
              id="text-0"
              key="text-0">
              {pageTitle}
            </h1>

            <FormField
              control={form.control}
              name="sourceLink"
              render={({ field }) => (
                <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel htmlFor="sourceLink">
                    URL
                    {form.formState.errors.sourceLink && (
                      <Separator
                        className="data-[orientation=vertical]:h-4"
                        orientation="vertical"
                      />
                    )}
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <div className="flex w-full gap-2">
                      <div className="relative w-full">
                        <Input
                          className="ps-8"
                          id="sourceLink"
                          key="sourceLink"
                          placeholder=""
                          type="url"
                          {...field}
                        />
                        <div
                          className={
                            "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                          }>
                          <Link className="size-4" strokeWidth={1.5} />
                        </div>
                      </div>
                      <Button
                        className="h-full active:opacity-100 active:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2 font-medium bg-linear-to-r from-cyan-600 to-blue-600 focus-visible:outline-cyan-600 hover:opacity-75 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-radius text-white text-sm tracking-wide transition whitespace-nowrap"
                        disabled={isAiLoading}
                        type="button"
                        variant={"outline"}
                        onClick={onAISubmit}>
                        {isAiLoading ? (
                          <>
                            <Loader2Icon className="animate-spin" />
                            Loading...
                          </>
                        ) : (
                          <>
                            <svg
                              aria-hidden="true"
                              className="size-4"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                clipRule="evenodd"
                                d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4ZM12 1a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1ZM10 11a.75.75 0 0 1 .728.568.968.968 0 0 0 .704.704.75.75 0 0 1 0 1.456.968.968 0 0 0-.704.704.75.75 0 0 1-1.456 0 .968.968 0 0 0-.704-.704.75.75 0 0 1 0-1.456.968.968 0 0 0 .704-.704A.75.75 0 0 1 10 11Z"
                                fillRule="evenodd"
                              />
                            </svg>
                            AI Assist
                          </>
                        )}
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel>
                    Job Title
                    {form.formState.errors.title && (
                      <Separator
                        className="data-[orientation=vertical]:h-4"
                        orientation="vertical"
                      />
                    )}
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder=""
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="col-span-12 sm:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel>
                    Company Name
                    {form.formState.errors.company && (
                      <Separator
                        className="data-[orientation=vertical]:h-4"
                        orientation="vertical"
                      />
                    )}
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder=""
                      type="text"
                      {...{
                        ...field,
                        onChange: (e) =>
                          field.onChange(e.target.value.toUpperCase()),
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="col-span-12 sm:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel>
                    Location
                    {form.formState.errors.location && (
                      <Separator
                        className="data-[orientation=vertical]:h-4"
                        orientation="vertical"
                      />
                    )}
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder=""
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel htmlFor="type">
                    Type
                    {form.formState.errors.type && (
                      <Separator
                        className="data-[orientation=vertical]:h-4"
                        orientation="vertical"
                      />
                    )}
                    <FormMessage />
                  </FormLabel>

                  <div className="w-full">
                    <FormControl>
                      <RadioGroup
                        className="w-full "
                        id="type"
                        key="type"
                        {...field}
                        onValueChange={field.onChange}>
                        {types.map((type) => (
                          <FormLabel
                            className="border-0 p-0 flex items-center has-[[data-state=checked]]:border-primary"
                            htmlFor={`type-${type}`}
                            key={`${type}`}>
                            <RadioGroupItem
                              id={`type-${type}`}
                              value={`${type}`}
                            />
                            <div className="grid gap-2 leading-none">
                              <FormLabel
                                className="font-medium"
                                htmlFor={`type-${type}`}>
                                {type}
                              </FormLabel>
                            </div>
                          </FormLabel>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel htmlFor="role">
                    Role
                    {form.formState.errors.role && (
                      <Separator
                        className="data-[orientation=vertical]:h-4"
                        orientation="vertical"
                      />
                    )}
                    <FormMessage />
                  </FormLabel>

                  <div className="w-full">
                    <FormControl>
                      <Select
                        key="role"
                        {...field}
                        onValueChange={field.onChange}>
                        <SelectTrigger className="w-full" id="role">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel htmlFor="source">
                    Information Source
                    {form.formState.errors.source && (
                      <Separator
                        className="data-[orientation=vertical]:h-4"
                        orientation="vertical"
                      />
                    )}
                    <FormMessage />
                  </FormLabel>

                  <div className="w-full">
                    <FormControl>
                      <Select
                        key="source-jkl"
                        {...field}
                        onValueChange={field.onChange}>
                        <SelectTrigger className="w-full" id="source">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          {sources.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="applyDate"
              render={({ field }) => (
                <FormItem className="col-span-12 sm:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel htmlFor="applyDate">
                    Apply Date
                    {form.formState.errors.applyDate && (
                      <Separator
                        className="data-[orientation=vertical]:h-4"
                        orientation="vertical"
                      />
                    )}
                    <FormMessage />
                  </FormLabel>

                  <div className="w-full">
                    <FormControl>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger
                          className="justify-start text-left font-normal w-full h-9"
                          asChild>
                          <Button
                            id="applyDate"
                            name="applyDate"
                            variant={"outline"}>
                            <CalendarIcon className="mr-2 " />

                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              setOpen(false);
                              field.onChange(date);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="applyOn"
              render={({ field }) => (
                <FormItem className="col-span-12 sm:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel htmlFor="applyOn">
                    Apply On
                    {form.formState.errors.applyOn && (
                      <Separator
                        className="data-[orientation=vertical]:h-4"
                        orientation="vertical"
                      />
                    )}
                    <FormMessage />
                  </FormLabel>

                  <div className="w-full">
                    <FormControl>
                      <Select
                        key="source"
                        {...field}
                        onValueChange={field.onChange}>
                        <SelectTrigger className="w-full" id="applyOn">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          {applyOns.map((val) => (
                            <SelectItem key={val} value={val}>
                              {val}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormItem className="col-span-12 col-end-auto flex self-end flex-col gap-2 space-y-0 items-end mt-5">
              <div className="w-full flex justify-end">
                <FormControl>
                  <Button
                    className={`w-full sm:w-64 ${payload && !isLoading && "hidden"}`}
                    disabled={isLoading}
                    id="submit-button-1"
                    type="submit">
                    {isLoading ? (
                      <>
                        <Loader2Icon className="animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Update"
                    )}
                  </Button>
                </FormControl>
                {payload && !isLoading && (
                  <FormControl>
                    <div>
                      <Button
                        className={`w-full sm:w-64 ${isLoading && "hidden"}`}
                        type="button"
                        onClick={() => {
                          setDialogOpen(true);
                        }}>
                        <Edit />
                        Edit
                      </Button>
                      <ModalDialog
                        buttonConfirm={
                          <Button
                            onClick={() => {
                              document
                                .getElementById("submit-button-1")
                                ?.click();
                            }}>
                            <Edit />
                            Confirm
                          </Button>
                        }
                        children="Are you sure you want to update this job?"
                        dialogTitle="Update Job"
                        open={dialogOpen}
                        onOpenChange={setDialogOpen}
                      />
                    </div>
                  </FormControl>
                )}
              </div>
            </FormItem>
          </div>
        </form>
      </Form>
    </>
  );
};
