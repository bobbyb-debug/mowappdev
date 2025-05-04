
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden hero-pattern">
      <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Professional Lawn Care
                <span className="text-primary"> Made Simple</span>
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Quality lawn services at your fingertips. Book in minutes and enjoy a perfectly maintained yard.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="font-semibold" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
                Book a Service
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-semibold"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Services
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="font-semibold"
                asChild
              >
                <Link to="/dashboard">Business Login</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
              {/* Placeholder for hero image - green lawn with mowing equipment */}
              <div className="absolute inset-0 bg-lawn-600 opacity-90 flex items-center justify-center">
                <div className="text-white text-center px-4">
                  <span className="text-5xl font-bold">🌿</span>
                  <h3 className="text-xl font-semibold mt-4">Professional Lawn Services</h3>
                  <p className="mt-2">Expert care for your outdoor spaces</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
