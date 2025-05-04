
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { format, differenceInDays, addDays, parseISO } from "date-fns";

type CalendarEvent = {
  id: number;
  title: string;
  client: string;
  address: string;
  date: Date;
  serviceType: string;
  notes?: string;
  revenue: number;
};

// Mock data for events
const initialEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Johnson Residence - Premium Maintenance",
    client: "Johnson Residence",
    address: "123 Oak St, Greenville",
    date: addDays(new Date(), 1),
    serviceType: "Premium Maintenance",
    notes: "Front lawn needs extra attention",
    revenue: 75.00
  },
  {
    id: 2,
    title: "Smith Property - Basic Mowing",
    client: "Smith Property",
    address: "456 Pine Ave, Greenville",
    date: addDays(new Date(), 3),
    serviceType: "Basic Mowing",
    revenue: 35.00
  },
  {
    id: 3,
    title: "Green Park HOA - Complete Landscaping",
    client: "Green Park HOA",
    address: "789 Willow Dr, Greenville",
    date: addDays(new Date(), 5),
    serviceType: "Complete Landscaping",
    notes: "Bring extra mulch and flowering plants",
    revenue: 150.00
  }
];

const CalendarView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Days with events for highlighting on the calendar
  const eventDates = events.map(event => format(new Date(event.date), "yyyy-MM-dd"));

  // Events for the selected day
  const selectedDateEvents = date
    ? events.filter(event => 
        format(new Date(event.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd"))
    : [];

  // Get upcoming events (next 7 days)
  const today = new Date();
  const upcomingEvents = events
    .filter(event => {
      const eventDate = new Date(event.date);
      const daysDiff = differenceInDays(eventDate, today);
      return daysDiff >= 0 && daysDiff <= 7;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const eventDate = formData.get("date") as string;
    const newEvent: CalendarEvent = {
      id: events.length + 1,
      title: `${formData.get("client")} - ${formData.get("serviceType")}`,
      client: formData.get("client") as string,
      address: formData.get("address") as string,
      date: parseISO(eventDate),
      serviceType: formData.get("serviceType") as string,
      notes: (formData.get("notes") as string) || undefined,
      revenue: parseFloat(formData.get("revenue") as string),
    };
    
    setEvents([...events, newEvent]);
    setIsDialogOpen(false);
    setDate(newEvent.date); // Set calendar to new event date
    
    toast({
      title: "Event Added",
      description: `Scheduled ${newEvent.serviceType} for ${newEvent.client} on ${format(newEvent.date, "MMMM d, yyyy")}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Job Schedule</h2>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Schedule New Job</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Schedule Job</DialogTitle>
              <DialogDescription>
                Add a new job to your calendar.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleAddEvent} className="space-y-4">
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
                  <Label htmlFor="date">Date</Label>
                  <Input 
                    id="date" 
                    name="date" 
                    type="date" 
                    defaultValue={date ? format(date, "yyyy-MM-dd") : undefined}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceType">Service Type</Label>
                  <Select name="serviceType" defaultValue="Basic Mowing">
                    <SelectTrigger id="serviceType">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic Mowing">Basic Mowing</SelectItem>
                      <SelectItem value="Premium Maintenance">Premium Maintenance</SelectItem>
                      <SelectItem value="Complete Landscaping">Complete Landscaping</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="revenue">Revenue ($)</Label>
                <Input id="revenue" name="revenue" type="number" min="0" step="0.01" defaultValue="0.00" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" name="notes" placeholder="Any special requirements or instructions" />
              </div>
              
              <DialogFooter>
                <Button type="submit">Save Job</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Jobs</CardTitle>
            <CardDescription>
              Next 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingEvents.length === 0 ? (
              <p className="text-muted-foreground">No upcoming jobs scheduled.</p>
            ) : (
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className="pb-3 border-b border-border last:border-0 last:pb-0"
                    onClick={() => setDate(new Date(event.date))}
                  >
                    <div className="font-medium">{event.client}</div>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(event.date), "EEEE, MMMM d")} • {event.serviceType}
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <div className="text-xs text-muted-foreground truncate max-w-[80%]">
                        {event.address}
                      </div>
                      <div className="text-sm font-medium">${event.revenue.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Job Calendar</CardTitle>
            <CardDescription>
              Select a date to view scheduled jobs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="mx-auto pointer-events-auto"
              modifiers={{
                booked: (date) => eventDates.includes(format(date, "yyyy-MM-dd")),
              }}
              modifiersStyles={{
                booked: {
                  fontWeight: "bold",
                  backgroundColor: "rgba(63, 180, 95, 0.2)",
                  borderRadius: "100%",
                },
              }}
            />
          </CardContent>
        </Card>
      </div>

      {date && (
        <Card>
          <CardHeader>
            <CardTitle>{format(date, "MMMM d, yyyy")}</CardTitle>
            <CardDescription>
              {selectedDateEvents.length === 0 
                ? "No jobs scheduled for this date" 
                : `${selectedDateEvents.length} job${selectedDateEvents.length > 1 ? "s" : ""} scheduled`}
            </CardDescription>
          </CardHeader>
          {selectedDateEvents.length > 0 && (
            <CardContent>
              <div className="space-y-6">
                {selectedDateEvents.map((event) => (
                  <div key={event.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                    <h3 className="text-lg font-semibold">{event.client}</h3>
                    <div className="grid gap-2 mt-2">
                      <div className="grid grid-cols-3">
                        <span className="text-sm font-medium">Service:</span>
                        <span className="text-sm col-span-2">{event.serviceType}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-sm font-medium">Address:</span>
                        <span className="text-sm col-span-2">{event.address}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-sm font-medium">Revenue:</span>
                        <span className="text-sm col-span-2">${event.revenue.toFixed(2)}</span>
                      </div>
                      {event.notes && (
                        <div className="grid grid-cols-3">
                          <span className="text-sm font-medium">Notes:</span>
                          <span className="text-sm col-span-2">{event.notes}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Mark Complete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
};

export default CalendarView;
