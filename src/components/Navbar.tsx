import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import { useIsMobile } from "@/hooks/use-mobile";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-12 w-auto"
                src="/lovable-uploads/513dcf5a-b256-4137-a428-3656375e1aa4.png"
                alt="Glamour's Beauty Salon"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-secondary transition-colors">
              Home
            </Link>
            <Link to="/meet-the-owner" className="text-gray-700 hover:text-secondary transition-colors">
              Meet the Owner
            </Link>
            <LanguageSwitcher />
            <Button variant="default" className="bg-secondary text-white hover:bg-secondary-light">
              Book Now
            </Button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && isMobile && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-secondary transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/meet-the-owner"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-secondary transition-colors"
              onClick={toggleMenu}
            >
              Meet the Owner
            </Link>
            <div className="px-3 py-2">
              <LanguageSwitcher />
            </div>
            <div className="px-3 py-2">
              <Button variant="default" className="w-full bg-secondary text-white hover:bg-secondary-light">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};