import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useGetDashboard } from "@/hooks/use-dashboard";

const DashBoardPage = () => {
  const { data: res, isLoading, error } = useGetDashboard();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total job applied</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {res?.data?.totalJobApplied}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Job applied in last 30 days</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {res?.data?.totalJobLast30Days}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Job applied Responded</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {res?.data?.applicationsResponded}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Job applied rejected</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {res?.data?.applicationsRejected}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default DashBoardPage;
