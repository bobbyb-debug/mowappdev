import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";

interface Service {
  id: number;
  name: string;
  price: number;
}

const Settings = () => {
  const [services, setServices] = useState<Service[]>([]);
  const { toast } = useToast();

  // Fetch existing services from Flask on page load
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/services")
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error("Error fetching services:", error));
  }, []);

  const handleServiceChange = (id: number, field: keyof Service, value: string) => {
    setServices(prev =>
      prev.map(service =>
        service.id === id ? { ...service, [field]: field === "price" ? parseFloat(value) || 0 : value } : service
      )
    );
  };

  const handleAddService = () => {
    const newService: Service = {
      id: Date.now(),
      name: "New Service",
      price: 0,
    };
    setServices(prev => [...prev, newService]);
    toast({ title: "New Service Added" });
  };

  const handleDeleteService = (id: number) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setServices(prev => prev.filter(service => service.id !== id));
      toast({ title: "Service Deleted" });
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(services),
      });

      if (response.ok) {
        toast({
          title: "Services Saved",
          description: "All service packages have been saved successfully.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Save Failed",
          description: "Server error while saving.",
        });
      }
    } catch (error) {
      console.error("Save error:", error);
      toast({
        variant: "destructive",
        title: "Network Error",
        description: "Failed to connect to server.",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Service Package Settings</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAddService}>
            ➕ Add Service
          </Button>
          <Button onClick={handleSave}>
            💾 Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.id} className="transition-all hover:scale-105 group">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="flex w-full">
                <Input
                  value={service.name}
                  onChange={(e) => handleServiceChange(service.id, "name", e.target.value)}
                  className="font-semibold text-lg"
                />
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteService(service.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500"
                title="Delete Service"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="flex items-center space-x-2">
              <span className="text-muted-foreground">$</span>
              <Input
                value={service.price}
                type="number"
                step="0.01"
                min="0"
                onChange={(e) => handleServiceChange(service.id, "price", e.target.value)}
                className="w-24"
              />
              <span className="text-sm text-muted-foreground">per service</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Settings;
