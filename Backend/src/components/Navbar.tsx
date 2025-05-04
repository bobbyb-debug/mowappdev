// src/components/Navbar.tsx

import { Link } from "react-router-dom"; // Import Link for routing
import { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component.

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    // Clear session data or cookies here
    setIsLoggedIn(false); // Log out by changing state
  };

  return (
    <nav className="bg-background text-foreground p-4">
      <div className="container flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tight">
          <Link to="/" className="hover:text-primary transition-colors">
            MowApp 🌿
          </Link>
        </div>
        <div className="space-x-4">
          {isLoggedIn ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Button onClick={() => alert("Google Login coming soon!")}>
              Google Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
