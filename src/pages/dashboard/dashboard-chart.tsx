import dayjs from "dayjs";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { useGetDashboardChart } from "@/hooks/use-dashboard";

const chartConfig = {
  count: {
    label: "Total",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const ChartArea = ({
  chartData,
}: {
  chartData: { date: string; count: number }[];
}) => {
  return (
    <ChartContainer
      className="aspect-auto h-[250px] w-full"
      config={chartConfig}>
      <AreaChart
        data={chartData}
        margin={{ left: 2, right: 2 }}
        accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="date"
          tickLine={false}
          tickMargin={8}
        />
        <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
        <defs>
          <linearGradient id="fillTotal" x1="0" x2="0" y1="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-count)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-count)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="count"
          fill="url(#fillTotal)"
          fillOpacity={0.4}
          stackId="a"
          stroke="var(--color-count)"
          type="natural"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export const DashBoardChart = () => {
  const { data: resData } = useGetDashboardChart();
  const last12months = resData?.data?.last12Months || [];
  const last30Days = resData?.data?.last30Days || [];

  const chart12Months = last12months.map((item) => ({
    date: dayjs(item._id).format("MMM YY"),
    count: item.count,
  }));
  const chart30Days = last30Days.map((item) => ({
    date: dayjs(item._id).format("DD MMM"),
    count: item.count,
  }));

  return (
    <div className="flex flex-col gap-2">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>
            Showing total Applied for the last 30 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartArea chartData={chart30Days} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>
            Showing total Applied for the last 12 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartArea chartData={chart12Months} />
        </CardContent>
      </Card>
    </div>
  );
};
