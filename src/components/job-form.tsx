import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Link } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

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

import { useJobForm } from "@/stores/use-job-form";
import { type AddJobFormData, addJobSchema } from "@/validation/job-validation";

interface JobFormProps {
  pageTitle: string;
}

export const JobForm: React.FC<JobFormProps> = ({ pageTitle }) => {
  const [open, setOpen] = useState(false);
  const setFormData = useJobForm((state) => state.setFormData);

  const form = useForm<AddJobFormData>({
    resolver: zodResolver(addJobSchema),
    defaultValues: {
      title: "",
      company: "",
      role: "",
      type: "",
      source: "",
      sourceLink: "",
      location: "",
      applyDate: new Date(),
      applyOn: "",
    },
  });

  const onSubmit = (values: AddJobFormData) => {
    setFormData(values);
  };

  return (
    <>
      <Form {...form}>
        <form
          className="w-full bg-white sm:p-5 md:p-2 rounded-xl"
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
                      className="w-full rounded-xl"
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
                <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
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
                      className="w-full rounded-xl"
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
              name="location"
              render={({ field }) => (
                <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel>
                    Company Location
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
                      className="w-full rounded-xl"
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
                  <FormLabel className="flex shrink-0">
                    Working Type
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
                        id="radio-0"
                        key="radio-0"
                        {...field}
                        onValueChange={field.onChange}>
                        <FormLabel
                          className="border-0 p-0 flex items-center has-[[data-state=checked]]:border-primary"
                          htmlFor="radio-0-remote"
                          key="remote">
                          <RadioGroupItem id="radio-0-remote" value="remote" />
                          <div className="grid gap-2 leading-none">
                            <FormLabel
                              className="font-medium"
                              htmlFor="radio-0-remote">
                              Remote
                            </FormLabel>
                          </div>
                        </FormLabel>
                        <FormLabel
                          className="border-0 p-0 flex items-center has-[[data-state=checked]]:border-primary"
                          htmlFor="radio-0-onsite"
                          key="onsite">
                          <RadioGroupItem id="radio-0-onsite" value="onsite" />
                          <div className="grid gap-2 leading-none">
                            <FormLabel
                              className="font-medium"
                              htmlFor="radio-0-onsite">
                              Onsite
                            </FormLabel>
                          </div>
                        </FormLabel>
                        <FormLabel
                          className="border-0 p-0 flex items-center has-[[data-state=checked]]:border-primary"
                          htmlFor="radio-0-hybrid"
                          key="hybrid">
                          <RadioGroupItem id="radio-0-hybrid" value="hybrid" />
                          <div className="grid gap-2 leading-none">
                            <FormLabel
                              className="font-medium"
                              htmlFor="radio-0-hybrid">
                              Hybrid
                            </FormLabel>
                          </div>
                        </FormLabel>
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
                  <FormLabel className="flex shrink-0">
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
                        <SelectTrigger className="w-full rounded-xl ">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem key="fulltime" value="Fulltime">
                            Fulltime
                          </SelectItem>

                          <SelectItem key="contract" value="Contract">
                            Contract
                          </SelectItem>

                          <SelectItem key="intern" value="Intern">
                            Intern
                          </SelectItem>

                          <SelectItem key="Freelance" value="Freelance">
                            Freelance
                          </SelectItem>
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
                  <FormLabel className="flex shrink-0">
                    Source
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
                        // id="source"
                        key="source-jkl"
                        {...field}
                        onValueChange={field.onChange}>
                        <SelectTrigger className="w-full rounded-xl ">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem key="instagram" value="Instagram">
                            Instagram
                          </SelectItem>

                          <SelectItem key="linkedin" value="LinkedIn">
                            LinkedIn
                          </SelectItem>

                          <SelectItem key="JobStreet" value="JobStreet">
                            JobStreet
                          </SelectItem>

                          <SelectItem key="Glints" value="Glints">
                            Glints
                          </SelectItem>
                          <SelectItem key="Twitter" value="Twitter">
                            Twitter
                          </SelectItem>
                          <SelectItem key="others" value="others">
                            others
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sourceLink"
              render={({ field }) => (
                <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel className="flex shrink-0">
                    URL
                    {form.formState.errors.sourceLink && (
                      <Separator
                        className="data-[orientation=vertical]:h-4"
                        orientation="vertical"
                      />
                    )}
                    <FormMessage />
                  </FormLabel>
                  <div className="w-full">
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          className="w-full rounded-xl"
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
                  <FormLabel className="flex shrink-0">
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
                          className="justify-start text-left font-normal w-full rounded-xl h-9"
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

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="applyOn"
              render={({ field }) => (
                <FormItem className="col-span-12 sm:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                  <FormLabel className="flex shrink-0">
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
                        <SelectTrigger className="w-full rounded-xl ">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem key="InApp" value="InApp">
                            InApp
                          </SelectItem>

                          <SelectItem key="Email" value="Email">
                            Email
                          </SelectItem>

                          <SelectItem key="Company Web" value="Company Web">
                            Company Web
                          </SelectItem>

                          <SelectItem key="GoogleForm" value="GoogleForm">
                            GoogleForm
                          </SelectItem>
                          <SelectItem key="others" value="others">
                            others
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormItem className="col-span-12 col-end-auto flex self-end flex-col gap-2 space-y-0 items-end mt-5">
              <FormLabel className="hidden shrink-0">Submit</FormLabel>

              <div className="w-full flex justify-end">
                <FormControl>
                  <Button
                    className="rounded-xl w-32"
                    id="submit-button-0"
                    key="submit-button-0"
                    name=""
                    type="submit"
                    variant="default">
                    Submit
                  </Button>
                </FormControl>
              </div>
            </FormItem>
          </div>
        </form>
      </Form>
    </>
  );
};
