
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Types
type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  totalRevenue: number;
  activeJobs: number;
  lastService: string;
};

// Mock data
const initialClients: Client[] = [
  {
    id: 1,
    name: "Johnson Residence",
    email: "johnson@example.com",
    phone: "(555) 123-4567",
    address: "123 Oak St, Greenville",
    notes: "Prefers service on Tuesdays. Has a dog that needs to be kept inside during service.",
    totalRevenue: 1250.00,
    activeJobs: 1,
    lastService: "2025-04-15"
  },
  {
    id: 2,
    name: "Smith Property",
    email: "smith@example.com",
    phone: "(555) 987-6543",
    address: "456 Pine Ave, Greenville",
    notes: "Monthly maintenance contract. Renewed annually in March.",
    totalRevenue: 3600.00,
    activeJobs: 2,
    lastService: "2025-04-12"
  },
  {
    id: 3,
    name: "Green Park HOA",
    email: "manager@greenparkhoa.com",
    phone: "(555) 222-3333",
    address: "789 Willow Dr, Greenville",
    notes: "Large property. Requires team of 4. Contact Susan for gate code.",
    totalRevenue: 12500.00,
    activeJobs: 1,
    lastService: "2025-04-18"
  },
  {
    id: 4,
    name: "Martinez Family",
    email: "martinez@example.com",
    phone: "(555) 444-5555",
    address: "321 Maple Rd, Greenville",
    notes: "Bi-weekly service. Special attention to flower beds.",
    totalRevenue: 2200.00,
    activeJobs: 0,
    lastService: "2025-04-10"
  },
  {
    id: 5,
    name: "Clark Residence",
    email: "clark@example.com",
    phone: "(555) 777-8888",
    address: "654 Elm St, Greenville",
    notes: "Weekly mowing. Has sprinkler system that runs Wed & Sun mornings.",
    totalRevenue: 1800.00,
    activeJobs: 1,
    lastService: "2025-04-19"
  }
];

const ClientManagement = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newClient: Client = {
      id: clients.length + 1,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      notes: formData.get("notes") as string,
      totalRevenue: 0,
      activeJobs: 0,
      lastService: "Never"
    };
    
    setClients([...clients, newClient]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Client Added",
      description: `${newClient.name} has been added to your client list.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Client Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage your clients, track service history, and view revenue insights
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="flex">
            <Input 
              placeholder="Search clients..." 
              className="max-w-xs"
            />
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add New Client</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Client</DialogTitle>
                <DialogDescription>
                  Enter client details below. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleAddClient} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Client Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea 
                    id="notes" 
                    name="notes" 
                    placeholder="Add any special instructions or details about this client" 
                  />
                </div>
                
                <DialogFooter>
                  <Button type="submit">Save Client</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Client List</CardTitle>
              <CardDescription>
                View and manage all your clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead className="hidden md:table-cell">Address</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-center">Active Jobs</TableHead>
                      <TableHead className="hidden md:table-cell">Last Service</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>
                          <div>{client.email}</div>
                          <div className="text-xs text-muted-foreground">{client.phone}</div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{client.address}</TableCell>
                        <TableCell className="text-right">${client.totalRevenue.toLocaleString()}</TableCell>
                        <TableCell className="text-center">{client.activeJobs}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {client.lastService === "Never" 
                            ? "Never" 
                            : new Date(client.lastService).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setSelectedClient(client)}
                          >
                            View
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

        {selectedClient && (
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{selectedClient.name}</CardTitle>
                <CardDescription>
                  Client details and service history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="details">
                  <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-3 h-auto gap-4 bg-transparent">
                    <TabsTrigger value="details" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Details
                    </TabsTrigger>
                    <TabsTrigger value="jobs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Jobs
                    </TabsTrigger>
                    <TabsTrigger value="invoices" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Invoices
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
                        <div className="mt-2 space-y-2">
                          <div className="grid grid-cols-3">
                            <span className="text-sm font-medium">Email:</span>
                            <span className="text-sm col-span-2">{selectedClient.email}</span>
                          </div>
                          <div className="grid grid-cols-3">
                            <span className="text-sm font-medium">Phone:</span>
                            <span className="text-sm col-span-2">{selectedClient.phone}</span>
                          </div>
                          <div className="grid grid-cols-3">
                            <span className="text-sm font-medium">Address:</span>
                            <span className="text-sm col-span-2">{selectedClient.address}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
                        <p className="mt-2 text-sm">{selectedClient.notes}</p>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline">Edit Client</Button>
                      <Button>Schedule Job</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="jobs" className="space-y-4 mt-4">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Service</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Regular Maintenance</TableCell>
                            <TableCell>Apr 15, 2025</TableCell>
                            <TableCell>Completed</TableCell>
                            <TableCell className="text-right">$75.00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Spring Cleanup</TableCell>
                            <TableCell>Mar 20, 2025</TableCell>
                            <TableCell>Completed</TableCell>
                            <TableCell className="text-right">$150.00</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Lawn Aeration</TableCell>
                            <TableCell>Mar 5, 2025</TableCell>
                            <TableCell>Completed</TableCell>
                            <TableCell className="text-right">$120.00</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <div className="flex justify-end">
                      <Button>Schedule New Job</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="invoices" className="space-y-4 mt-4">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Invoice #</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>INV-2025-042</TableCell>
                            <TableCell>Apr 16, 2025</TableCell>
                            <TableCell>$75.00</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">View</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>INV-2025-031</TableCell>
                            <TableCell>Mar 21, 2025</TableCell>
                            <TableCell>$150.00</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">View</Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>INV-2025-022</TableCell>
                            <TableCell>Mar 6, 2025</TableCell>
                            <TableCell>$120.00</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">View</Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <div className="flex justify-end">
                      <Button>Create Invoice</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ClientManagement;
