
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

// Mock data for jobs
const initialJobs = [
  {
    id: 1,
    client: "Johnson Residence",
    address: "123 Oak St, Greenville",
    service: "Premium Maintenance",
    date: "2025-04-22",
    status: "scheduled",
    revenue: 75.00,
    materials: 15.00,
    labor: 35.00,
    fuel: 8.00,
    profit: 17.00
  },
  {
    id: 2,
    client: "Smith Property",
    address: "456 Pine Ave, Greenville",
    service: "Basic Mowing",
    date: "2025-04-24",
    status: "scheduled",
    revenue: 35.00,
    materials: 0.00,
    labor: 20.00,
    fuel: 5.00,
    profit: 10.00
  },
  {
    id: 3,
    client: "Green Park HOA",
    address: "789 Willow Dr, Greenville",
    service: "Complete Landscaping",
    date: "2025-04-25",
    status: "scheduled",
    revenue: 150.00,
    materials: 45.00,
    labor: 60.00,
    fuel: 12.00,
    profit: 33.00
  },
  {
    id: 4,
    client: "Martinez Family",
    address: "321 Maple Rd, Greenville",
    service: "Premium Maintenance",
    date: "2025-04-18",
    status: "completed",
    revenue: 75.00,
    materials: 18.00,
    labor: 35.00,
    fuel: 9.00,
    profit: 13.00
  },
  {
    id: 5,
    client: "Clark Residence",
    address: "654 Elm St, Greenville",
    service: "Basic Mowing",
    date: "2025-04-19",
    status: "completed",
    revenue: 35.00,
    materials: 0.00,
    labor: 20.00,
    fuel: 6.00,
    profit: 9.00
  },
];

type Job = {
  id: number;
  client: string;
  address: string;
  service: string;
  date: string;
  status: string;
  revenue: number;
  materials: number;
  labor: number;
  fuel: number;
  profit: number;
};

const JobTracker = () => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredJobs = filterStatus === "all" 
    ? jobs 
    : jobs.filter(job => job.status === filterStatus);

  const handleAddJob = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newJob = {
      id: jobs.length + 1,
      client: formData.get("client") as string,
      address: formData.get("address") as string,
      service: formData.get("service") as string,
      date: formData.get("date") as string,
      status: "scheduled",
      revenue: parseFloat(formData.get("revenue") as string),
      materials: parseFloat(formData.get("materials") as string),
      labor: parseFloat(formData.get("labor") as string),
      fuel: parseFloat(formData.get("fuel") as string),
      profit: parseFloat(formData.get("revenue") as string) - 
        (parseFloat(formData.get("materials") as string) + 
         parseFloat(formData.get("labor") as string) + 
         parseFloat(formData.get("fuel") as string))
    };
    
    setJobs([...jobs, newJob]);
    setIsDialogOpen(false);
    toast({
      title: "Job Added",
      description: `New job for ${newJob.client} has been added.`,
    });
  };

  const handleStatusChange = (jobId: number, newStatus: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: newStatus } : job
    ));
    
    toast({
      title: "Status Updated",
      description: `Job status has been changed to ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-4">
          <Label htmlFor="filter-status">Filter by Status:</Label>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="All Jobs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Job</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Job</DialogTitle>
              <DialogDescription>
                Enter job details below. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleAddJob} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Client Name</Label>
                  <Input id="client" name="client" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" required />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service">Service Type</Label>
                  <Select name="service" defaultValue="basic-mowing">
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic-mowing">Basic Mowing</SelectItem>
                      <SelectItem value="premium-maintenance">Premium Maintenance</SelectItem>
                      <SelectItem value="complete-landscaping">Complete Landscaping</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Service Date</Label>
                  <Input id="date" name="date" type="date" required />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="revenue">Revenue ($)</Label>
                  <Input id="revenue" name="revenue" type="number" min="0" step="0.01" defaultValue="0.00" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="materials">Materials ($)</Label>
                  <Input id="materials" name="materials" type="number" min="0" step="0.01" defaultValue="0.00" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="labor">Labor ($)</Label>
                  <Input id="labor" name="labor" type="number" min="0" step="0.01" defaultValue="0.00" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fuel">Fuel ($)</Label>
                  <Input id="fuel" name="fuel" type="number" min="0" step="0.01" defaultValue="0.00" required />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit">Save Job</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Job List</CardTitle>
          <CardDescription>
            Manage all your lawn service jobs and track their profitability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Costs</TableHead>
                  <TableHead className="text-right">Profit</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <div className="font-medium">{job.client}</div>
                      <div className="text-xs text-muted-foreground">{job.address}</div>
                    </TableCell>
                    <TableCell>{job.service}</TableCell>
                    <TableCell>{new Date(job.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Select
                        defaultValue={job.status}
                        onValueChange={(value) => handleStatusChange(job.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">${job.revenue.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${(job.materials + job.labor + job.fuel).toFixed(2)}</TableCell>
                    <TableCell className="text-right">${job.profit.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" 
                        onClick={() => {
                          setCurrentJob(job);
                          // Additional actions like view/edit dialog
                        }}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobTracker;
