import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShoppingCart, Clock, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Info Bar */}
      <div className="w-full bg-gradient-to-r from-secondary/5 via-secondary/10 to-secondary/5 backdrop-blur-sm text-primary-foreground py-2">
        <div className="container flex justify-between items-center text-xs uppercase tracking-wider">
          <div className="flex items-center gap-3">
            <Clock className="h-3.5 w-3.5 text-secondary" />
            <span className="text-gray-700 font-medium">Open everyday 10am - 7pm</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <MapPin className="h-3.5 w-3.5 text-secondary" />
            <span className="text-gray-700 font-medium">275 Adams St, Newark NJ 07105</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-3.5 w-3.5 text-secondary" />
            <span className="text-gray-700 font-medium">(973) 344-5199</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-gradient-to-b from-white/95 to-white/80 backdrop-blur-md border-b border-secondary/10 transition-all duration-300">
        <div className="container flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/513dcf5a-b256-4137-a428-3656375e1aa4.png"
              alt="Glamour's Beauty Salon"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <Link
              to="/"
              className="text-gray-700 hover:text-secondary transition-all duration-300 font-medium tracking-widest text-sm relative group"
            >
              HOME
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/meet-the-owner"
              className="text-gray-700 hover:text-secondary transition-all duration-300 font-medium tracking-widest text-sm relative group"
            >
              ABOUT US
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/services"
              className="text-gray-700 hover:text-secondary transition-all duration-300 font-medium tracking-widest text-sm relative group"
            >
              SERVICES
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/team"
              className="text-gray-700 hover:text-secondary transition-all duration-300 font-medium tracking-widest text-sm relative group"
            >
              OUR TEAM
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link
              to="/store"
              className="text-gray-700 hover:text-secondary transition-all duration-300 font-medium tracking-widest text-sm relative group"
            >
              PRODUCTS
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
          </nav>

          {/* Right side items */}
          <div className="flex items-center gap-6">
            <LanguageSwitcher />
            <Link to="/store">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-secondary/5 transition-colors duration-300"
              >
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                <span className="sr-only">Shopping cart</span>
                <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-xs font-medium border border-secondary/20">
                  0
                </div>
              </Button>
            </Link>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};