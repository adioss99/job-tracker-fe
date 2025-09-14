import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
  SearchIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

import { Loading } from "@/components/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { paginationPageList } from "@/utils/pagination";

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
  const [q] = useSearchParams();
  const [paginationParams, setPaginationParams] = useSearchParams();
  const getPage = Number(q.get("page")) || 1;
  const getLimit = Number(q.get("limit")) || 10;

  const [filterParams, setFilterParams] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(getPage || 1);
  const [row, setRow] = useState((getLimit > 50 ? 10 : getLimit) || 10);
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
  } = useGetJobList(paginationParams.toString(), filterParams ?? null);

  useEffect(() => {
    const filterParams = new URLSearchParams();
    if (debouncedSearch?.title)
      filterParams.append("title", debouncedSearch.title);
    if (debouncedSearch?.company)
      filterParams.append("company", debouncedSearch.company);
    if (debouncedSearch?.location)
      filterParams.append("location", debouncedSearch.location);
    setFilterParams(filterParams.toString());
  }, [debouncedSearch]);
  useEffect(() => {
    setPaginationParams({ page: page.toString(), limit: row.toString() });
  }, [page, row, setPaginationParams]);

  useEffect(() => {
    const total = jobs?.pagination?.totalPages || 1;
    setTotalPage(total);
    if (jobs?.pagination?.totalItems === 0 && total >= 1) {
      setPage(total);
    }
  }, [jobs]);

  const pageList = paginationPageList(totalPage || 1, page);

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
      <section className="flex items-center justify-between mb-2">
        <div className="flex gap-x-2 justify-start">
          <div className="relative max-w-[150px]">
            <Input
              autoComplete="off"
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

          <div className="relative max-w-[120px]">
            <Input
              autoComplete="off"
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

          <div className="relative max-w-[100px]">
            <Input
              autoComplete="off"
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
        </div>
      </section>
      <div className="border border-gray-200 rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead />
              <TableHead className="text-center px-1">No</TableHead>
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
            {jobs?.data?.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="text-center px-1">
                  <ActionButton id={item.id} />
                </TableCell>
                <TableCell className="text-center font-light">
                  {index + page * row - row + 1}
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
                <TableCell className="h-24 w-full text-center" colSpan={9}>
                  {isLoading ? <Loading /> : "No record."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex items-center justify-center">
        {jobs?.data && (
          <>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink onClick={() => setPage(1)}>
                    <ChevronsLeft
                      className={`${page === 1 ? "opacity-50" : ""}`}
                    />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  {page === 1 ? (
                    <Button variant={"ghost"} disabled>
                      <ChevronLeft className="opacity-50" />
                    </Button>
                  ) : (
                    <PaginationLink onClick={() => setPage(page - 1)}>
                      <ChevronLeft />
                    </PaginationLink>
                  )}
                </PaginationItem>
                {pageList[0] !== 1 && (
                  <PaginationEllipsis className="opacity-50" />
                )}
                {pageList.map((item) => (
                  <PaginationItem key={item}>
                    <PaginationLink
                      isActive={item === page}
                      onClick={() => setPage(item)}>
                      <Button className="px-0" variant={"ghost"}>
                        {item}
                      </Button>
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {pageList[pageList.length - 1] !== totalPage && (
                  <PaginationEllipsis className="opacity-50" />
                )}

                <PaginationItem>
                  {page === totalPage ? (
                    <Button variant={"ghost"} disabled>
                      <ChevronRight className="opacity-50" />
                    </Button>
                  ) : (
                    <PaginationLink onClick={() => setPage(page + 1)}>
                      <ChevronRight />
                    </PaginationLink>
                  )}
                </PaginationItem>
                <PaginationLink onClick={() => setPage(totalPage)}>
                  <ChevronsRight
                    className={`${page === totalPage ? "opacity-50" : ""}`}
                  />
                </PaginationLink>
              </PaginationContent>
            </Pagination>
            <Select
              value={row.toString()}
              onValueChange={(row) => setRow(+row)}>
              <SelectTrigger className="font-light">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </>
        )}
      </div>
    </>
  );
};

export default JobList;
