import { Plus, SearchIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

import { Loading } from "@/components/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useGetJobList } from "@/hooks/use-track-job";
import { ActionButton } from "@/pages/job-list/table-action";
import type { JobSearchType } from "@/types/job-interfaces";
import { useDebounce } from "@/utils/ebounce";
import { dateFormat, maxTextLength } from "@/utils/formatter";

const colorMap: Record<string, string> = {
  "No Status": "bg-gray-600/10 text-gray-500",
  Rejected: "bg-red-600/10 text-red-500",
  Hired: "bg-green-600/10 text-green-500",
  default: "bg-yellow-600/10 text-yellow-500",
};

const dotColorMap: Record<string, string> = {
  "No Status": "bg-gray-500",
  Rejected: "bg-red-500",
  Hired: "bg-green-500",
  default: "bg-yellow-500",
};

const StatusBadge = ({ statuses }: { statuses: string }) => {
  const badgeColor = colorMap[statuses] || colorMap.default;
  const dotColor = dotColorMap[statuses] || dotColorMap.default;

  return (
    <Badge className={`shadow-none rounded-full ${badgeColor}`}>
      <div className={`h-1.5 w-1.5 rounded-full mr-2 ${dotColor}`} />
      {statuses}
    </Badge>
  );
};

const JobList = () => {
  const [search, setSearch] = useState<JobSearchType>({
    title: "",
    company: "",
    location: "",
  });

  const debouncedSearch = useDebounce(search, 500);
  const {
    data: jobs,
    isLoading,
    error,
  } = useGetJobList(debouncedSearch ?? null);

  if (error) return <p>Something went wrong</p>;
  return (
    <>
      <div className="flex justify-end mb-1">
        <Link to="/job-add">
          <Button variant={"outline"}>
            <Plus />
            Add new job
          </Button>
        </Link>
      </div>
      <div className="border border-gray-200 rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="border-b-0">
              <TableHead />
              <TableHead>
                <div className="relative max-w-[150px]">
                  <Input
                    className="pl-6 h-7 text-sm font-light"
                    id="search-title"
                    name="search-title"
                    placeholder="Title"
                    value={search.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearch({ ...search, title: e.target.value })
                    }
                  />
                  <SearchIcon className="absolute opacity-50 inset-y-0 my-auto left-2 h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>
                <div className="relative max-w-[120px]">
                  <Input
                    className="pl-6 h-7 text-sm font-light"
                    id="search-company"
                    name="search-company"
                    placeholder="Company"
                    value={search.company}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearch({ ...search, company: e.target.value })
                    }
                  />
                  <SearchIcon className="absolute opacity-50 inset-y-0 my-auto left-2 h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>
                <div className="relative max-w-[100px]">
                  <Input
                    className="pl-6 h-7 text-sm font-light"
                    id="search-location"
                    name="search-location"
                    placeholder="Location"
                    value={search.location}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearch({ ...search, location: e.target.value })
                    }
                  />
                  <SearchIcon className="absolute opacity-50 inset-y-0 my-auto left-2 h-3 w-3" />
                </div>
              </TableHead>
              <TableHead />
              <TableHead />
              <TableHead />
            </TableRow>
            <TableRow className="bg-muted/50">
              <TableHead></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applied at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell className="h-24 w-full text-center" colSpan={8}>
                  <Loading />
                </TableCell>
              </TableRow>
            )}
            {jobs?.data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <ActionButton id={item.id} />
                </TableCell>
                <TableCell className="font-medium capitalize">
                  {maxTextLength(item.title, 20)}
                </TableCell>
                <TableCell>{maxTextLength(item.company, 9)}</TableCell>
                <TableCell>{maxTextLength(item.location, 9)}</TableCell>
                <TableCell>
                  {item.role.charAt(0).toUpperCase() + item.role.slice(1)}
                </TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>
                  <StatusBadge statuses={item.latestStatus} />
                </TableCell>
                <TableCell>{dateFormat(item.applyDate).local}</TableCell>
              </TableRow>
            ))}
            {!jobs?.data && (
              <TableRow>
                <TableCell className="h-24 w-full text-center" colSpan={8}>
                  No record.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default JobList;
