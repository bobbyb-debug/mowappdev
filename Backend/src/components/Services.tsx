
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ServiceProps = {
  title: string;
  description: string;
  price: string;
  features: string[];
};

const ServiceCard = ({ title, description, price, features }: ServiceProps) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mb-4">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground ml-1">/ service</span>
        </div>
        <ul className="space-y-2 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

const Services = () => {
  const services = [
    {
      title: "Basic Mowing",
      description: "Essential lawn mowing service",
      price: "$35",
      features: [
        "Lawn mowing",
        "Edging",
        "Clipping removal",
        "Small yard (up to 5,000 sq ft)",
      ],
    },
    {
      title: "Premium Maintenance",
      description: "Complete lawn care package",
      price: "$75",
      features: [
        "Everything in Basic Mowing",
        "Fertilization",
        "Weed control",
        "Medium yard (up to 10,000 sq ft)",
        "Bi-weekly schedule option",
      ],
    },
    {
      title: "Complete Landscaping",
      description: "Full-service lawn and garden care",
      price: "$150",
      features: [
        "Everything in Premium Maintenance",
        "Shrub and hedge trimming",
        "Mulch application",
        "Seasonal cleanup",
        "Large yard (up to 20,000 sq ft)",
        "Flower bed maintenance",
      ],
    },
  ];

  return (
    <section id="services" className="py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the perfect lawn service package for your needs
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
