import { Plus } from "lucide-react";
import { Link } from "react-router";

import { Loading } from "@/components/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  const { data: jobs, isLoading, error } = useGetJobList();

  if (isLoading) return <Loading />;
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
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applied at</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs?.data?.map((item) => (
              <TableRow key={item.id}>
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
                <TableCell className="text-end">
                  {dateFormat(item.applyDate).local}
                </TableCell>
                <TableCell className="flex justify-center">
                  <ActionButton id={item.id} />
                </TableCell>
              </TableRow>
            ))}
            {!jobs?.data && (
              <TableRow>
                <TableCell className="h-24 text-center" colSpan={7}>
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
