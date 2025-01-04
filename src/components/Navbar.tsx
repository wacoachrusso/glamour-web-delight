import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShoppingCart, Clock, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Info Bar */}
      <div className="w-full bg-primary-foreground text-secondary-foreground py-2">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Open everyday 10am - 7pm</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>275 Adams St, Newark NJ 07105</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>(973) 344-5199</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-b bg-white">
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
              className="text-primary-foreground hover:text-accent transition-colors font-medium"
            >
              HOME
            </Link>
            <Link
              to="/meet-the-owner"
              className="text-primary-foreground hover:text-accent transition-colors font-medium"
            >
              ABOUT US
            </Link>
            <Link
              to="/services"
              className="text-primary-foreground hover:text-accent transition-colors font-medium"
            >
              SERVICES
            </Link>
            <Link
              to="/team"
              className="text-primary-foreground hover:text-accent transition-colors font-medium"
            >
              OUR TEAM
            </Link>
            <Link
              to="/store"
              className="text-primary-foreground hover:text-accent transition-colors font-medium"
            >
              PRODUCTS
            </Link>
          </nav>

          {/* Right side items */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link to="/store">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Shopping cart</span>
                <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-xs font-medium">
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