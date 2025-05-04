
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <section id="about" className="py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About MowApp</h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Connecting homeowners with quality lawn care services since 2022
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          <Card className="bg-card text-card-foreground shadow-sm">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg
                  className="h-6 w-6 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Affordable Pricing</h3>
              <p className="text-gray-500 dark:text-gray-400">
                We offer competitive rates for high-quality lawn care services, with transparent pricing and no hidden fees.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground shadow-sm">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg
                  className="h-6 w-6 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Licensed & Insured</h3>
              <p className="text-gray-500 dark:text-gray-400">
                All our service providers are thoroughly vetted, licensed, and insured for your peace of mind.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground shadow-sm">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <svg
                  className="h-6 w-6 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Quick Booking</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Schedule a service in minutes through our simple booking system, with flexible appointment times.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Our Mission</h3>
              <p className="text-gray-600">
                At MowApp, we're dedicated to simplifying lawn care services by connecting homeowners with trusted, professional service providers. We believe everyone deserves a beautiful yard without the hassle of finding reliable help or maintaining equipment.
              </p>
              <p className="text-gray-600">
                Our platform makes it easy to book quality lawn care services with transparent pricing, verified professionals, and convenient scheduling. We're committed to customer satisfaction and ensuring your outdoor spaces look their best year-round.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full h-[250px] rounded-lg overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-lawn-700 opacity-90 flex items-center justify-center">
                  <div className="text-white text-center px-4">
                    <span className="text-4xl font-bold">🌱</span>
                    <h3 className="text-xl font-semibold mt-2">Experts in Lawn Care</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
