import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Mock data for the initial UI
const profitData = [
  { month: "Jan", revenue: 4500, expenses: 2300, profit: 2200 },
  { month: "Feb", revenue: 5200, expenses: 2800, profit: 2400 },
  { month: "Mar", revenue: 4800, expenses: 2500, profit: 2300 },
  { month: "Apr", revenue: 6000, expenses: 3200, profit: 2800 },
  { month: "May", revenue: 5500, expenses: 2900, profit: 2600 },
  { month: "Jun", revenue: 7000, expenses: 3500, profit: 3500 },
];

const chartConfig = {
  revenue: { label: "Revenue", theme: { light: "#4ADE80", dark: "#4ADE80" } },
  expenses: { label: "Expenses", theme: { light: "#F87171", dark: "#F87171" } },
  profit: { label: "Profit", theme: { light: "#60A5FA", dark: "#60A5FA" } },
};

const KPICard = ({
  title,
  value,
  description,
  trend,
  trendValue
}: {
  title: string;
  value: string;
  description: string;
  trend: "up" | "down" | "neutral";
  trendValue: string;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {trend === "up" ? (
          <ArrowUpIcon className="h-4 w-4 text-green-500" />
        ) : trend === "down" ? (
          <ArrowDownIcon className="h-4 w-4 text-red-500" />
        ) : null}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {description}{" "}
          <span
            className={
              trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : ""
            }
          >
            {trendValue}
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

const DashboardOverview = () => {
  const currentMonth = profitData[profitData.length - 1];
  const totalRevenue = profitData.reduce((sum, month) => sum + month.revenue, 0);
  const totalExpenses = profitData.reduce((sum, month) => sum + month.expenses, 0);
  const totalProfit = totalRevenue - totalExpenses;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Monthly Revenue"
          value={`$${currentMonth.revenue.toLocaleString()}`}
          description="From previous month"
          trend="up"
          trendValue="+12.5%"
        />
        <KPICard
          title="Monthly Expenses"
          value={`$${currentMonth.expenses.toLocaleString()}`}
          description="From previous month"
          trend="down"
          trendValue="-3.2%"
        />
        <KPICard
          title="Monthly Profit"
          value={`$${currentMonth.profit.toLocaleString()}`}
          description="From previous month"
          trend="up"
          trendValue="+15.3%"
        />
        <KPICard
          title="Jobs Completed"
          value="18"
          description="From previous month"
          trend="up"
          trendValue="+4"
        />
      </div>

      {/* Chart */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
          <CardDescription>Monthly breakdown of revenue, expenses, and profit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full"> {/* Explicit height and full width */}
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%"> {/* Ensures the chart scales with the container */}
                  <BarChart data={profitData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill="var(--color-revenue)" />
                    <Bar dataKey="expenses" name="Expenses" fill="var(--color-expenses)" />
                    <Bar dataKey="profit" name="Profit" fill="var(--color-profit)" />
                  </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Other Info */}
      <div className="mt-20 grid gap-4 md:grid-cols-2"> {/* Increased margin-top to move this section further down */}
        <Card>
          <CardHeader>
            <CardTitle>Top Services</CardTitle>
            <CardDescription>Most profitable services this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="font-medium">Premium Maintenance</div>
                <div className="ml-auto font-medium">$3,300</div>
              </div>
              <div className="flex items-center">
                <div className="font-medium">Basic Mowing</div>
                <div className="ml-auto font-medium">$2,750</div>
              </div>
              <div className="flex items-center">
                <div className="font-medium">Complete Landscaping</div>
                <div className="ml-auto font-medium">$950</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Jobs</CardTitle>
            <CardDescription>Jobs scheduled for the next week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div>
                  <div className="font-medium">Johnson Residence</div>
                  <div className="text-sm text-muted-foreground">Premium Maintenance</div>
                </div>
                <div className="ml-auto text-sm">Tomorrow, 9:00 AM</div>
              </div>
              <div className="flex items-center">
                <div>
                  <div className="font-medium">Smith Property</div>
                  <div className="text-sm text-muted-foreground">Basic Mowing</div>
                </div>
                <div className="ml-auto text-sm">Wed, 1:30 PM</div>
              </div>
              <div className="flex items-center">
                <div>
                  <div className="font-medium">Green Park HOA</div>
                  <div className="text-sm text-muted-foreground">Complete Landscaping</div>
                </div>
                <div className="ml-auto text-sm">Fri, 10:00 AM</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
