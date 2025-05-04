import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t bg-background text-muted-foreground animate-in fade-in duration-700 relative">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand + Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl text-primary">MowApp</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting homeowners with professional lawn care services.
              Quality work, simplified booking, beautiful yards.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="space-y-4">
            <h3 className="text-sm font-medium">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-sm hover:text-primary transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#booking" className="text-sm hover:text-primary transition-colors">
                  Book Now
                </a>
              </li>
              <li>
                <a href="#about" className="text-sm hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Contact Us</h3>
            <address className="not-italic space-y-2 text-sm text-muted-foreground">
              <p>1234 Lawn Avenue</p>
              <p>Greenville, GA 30303</p>
              <p>Email: info@mowapp.com</p>
              <p>Phone: (555) 123-4567</p>
            </address>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MowApp 🌿. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a href="https://github.com/bobbyb-debug/mowapp-fix-it-now" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary">
              GitHub
            </a>
            <a href="#privacy" className="text-sm hover:text-primary">
              Privacy Policy
            </a>
            <a href="#terms" className="text-sm hover:text-primary">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:scale-110 transition-all"
          title="Back to Top"
        >
          ⬆️
        </button>
      )}
    </footer>
  );
};

export default Footer;
