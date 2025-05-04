import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobTracker from "@/components/dashboard/JobTracker";
import CostTracker from "@/components/dashboard/CostTracker";
import CalendarView from "@/components/dashboard/CalendarView";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import Settings from "@/components/dashboard/Settings"; // Settings tab

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Business Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Track jobs, costs, and manage your lawn care business
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-5 h-auto gap-4 bg-transparent">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Overview
            </TabsTrigger>
            <TabsTrigger value="jobs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Job Tracker
            </TabsTrigger>
            <TabsTrigger value="costs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Cost Tracker
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Calendar
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="jobs" className="space-y-4">
            <JobTracker />
          </TabsContent>

          <TabsContent value="costs" className="space-y-4">
            <CostTracker />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <CalendarView />
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Settings />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
