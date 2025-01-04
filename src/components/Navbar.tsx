import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShoppingCart, Clock, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm">
      {/* Top Info Bar */}
      <div className="w-full bg-gradient-to-r from-secondary/5 to-secondary/10 text-primary-foreground py-2">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-secondary" />
            <span className="text-gray-600">Open everyday 10am - 7pm</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <MapPin className="h-4 w-4 text-secondary" />
            <span className="text-gray-600">275 Adams St, Newark NJ 07105</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-secondary" />
            <span className="text-gray-600">(973) 344-5199</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-b bg-white/80 backdrop-blur-md shadow-sm">
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
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-secondary transition-colors duration-200 font-medium tracking-wide"
            >
              HOME
            </Link>
            <Link
              to="/meet-the-owner"
              className="text-gray-600 hover:text-secondary transition-colors duration-200 font-medium tracking-wide"
            >
              ABOUT US
            </Link>
            <Link
              to="/services"
              className="text-gray-600 hover:text-secondary transition-colors duration-200 font-medium tracking-wide"
            >
              SERVICES
            </Link>
            <Link
              to="/team"
              className="text-gray-600 hover:text-secondary transition-colors duration-200 font-medium tracking-wide"
            >
              OUR TEAM
            </Link>
            <Link
              to="/store"
              className="text-gray-600 hover:text-secondary transition-colors duration-200 font-medium tracking-wide"
            >
              PRODUCTS
            </Link>
          </nav>

          {/* Right side items */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link to="/store">
              <Button variant="ghost" size="icon" className="relative hover:bg-secondary/5">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                <span className="sr-only">Shopping cart</span>
                <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-xs font-medium">
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