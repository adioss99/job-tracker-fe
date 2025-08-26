import { Loading } from "@/components/loading";
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

const JobList = () => {
  const { data: jobs, isLoading, error } = useGetJobList();

  if (isLoading) return <Loading />;
  if (error) return <p>Something went wrong</p>;
  return (
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
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs?.data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.company}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>
                {item.role.charAt(0).toUpperCase() + item.role.slice(1)}
              </TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.latestStatus}</TableCell>
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
  );
};

export default JobList;
